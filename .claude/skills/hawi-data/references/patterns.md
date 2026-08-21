# Data patterns

## QueryClient defaults

Set these once in `src/lib/query-client.ts`. The library's defaults are tuned for dashboards
that need fresh data constantly; a content site does not.

```ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // content does not change minute to minute
      retry: (failureCount, error) =>
        error instanceof ApiError && error.status >= 400 && error.status < 500
          ? false                    // a 404 will still be a 404 on the third attempt
          : failureCount < 2,
      refetchOnWindowFocus: false,   // refetching an article on tab focus is pure waste
    },
    mutations: { retry: false },     // never silently resubmit a form
  },
});
```

Retrying a 4xx is the default worth changing first: client errors are deterministic, so retries
add latency to a failure that was already decided. Retrying a mutation is worse - an
auto-retried enquiry submission can create duplicate leads from one click.

## Error taxonomy

Users need different things from different failures, and a single "Something went wrong"
teaches them nothing:

| Cause | What the user sees | Recovery |
|---|---|---|
| Network / offline | "Cannot reach the server. Check your connection." | Retry button |
| 400 validation | Field-level messages on the fields concerned | Fix and resubmit |
| 404 | "This page does not exist." | Link back to the section |
| 429 | "Too many requests. Try again in a moment." | Retry after a delay |
| 5xx | "Something went wrong on our end." | Retry, and log it |
| Zod parse failure | Generic 5xx message to the user | Log loudly - this is a contract break |

A Zod parse failure means the backend changed shape. Never show the parse error to the user, and
never let it pass silently - it is the earliest possible warning that something upstream broke.

## Error boundaries

One at the route level so a failing page renders a message inside the site chrome instead of a
white screen, and one at the app root as the last resort. `useQuery`'s `isError` handles data
failures; boundaries catch render-time exceptions, which are the ones that blank the page.

## Optimistic updates

Almost never needed on this site. Use them only where the outcome is near-certain and the delay
is visible - a newsletter subscribe toggle, not an enquiry submission. When used, always restore
the previous value in `onError`, or a failed request leaves the UI asserting something false.

## Search params as state

Filters, categories, and pagination belong in the URL. TanStack Router validates them with the
same Zod schemas used everywhere else:

```ts
export const Route = createFileRoute("/insights/")({
  validateSearch: z.object({
    category: z.enum(["article", "research", "report", "guide"]).optional(),
    page: z.number().int().positive().default(1),
  }),
});
```

This gives typed, validated search params, and a filtered list that survives a refresh, works
with the back button, and can be linked to - which is what a reader does when they want to send
a colleague a specific set of articles.

## Dates

Store and transmit ISO 8601 UTC. Format at the point of display, in the user's locale, using
`Intl.DateTimeFormat` - no date library needed for a site that only formats published dates.

Never build a date from a bare `YYYY-MM-DD` string with `new Date()`: it parses as UTC midnight,
so a reader west of Greenwich sees the previous day. Parse explicitly or append a time.

## Loading states

Skeletons shaped like the real content for known layouts; a spinner only for indefinite work
inside a button. A skeleton that does not match what loads is worse than none - it promises a
layout, then the page rearranges.

Below roughly 300ms, show nothing. A flash of skeleton for one frame reads as a glitch, not as
progress.
