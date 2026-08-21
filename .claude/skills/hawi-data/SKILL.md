---
name: hawi-data
description: How data enters and leaves Hawi - Zod v4 schemas, the typed API client, TanStack Query, react-hook-form, submission and error handling, and the content model for Insights and Case Studies. Use this skill BEFORE writing ANY form, fetch call, API request, validation rule, query, mutation, or content type, and whenever handling loading/error/empty states, form submission, field validation, or data coming from outside the app. Also trigger on "form", "validation", "submit", "fetch", "API", "schema", "zod", "query", "CMS", "content", or "enquiry".
---

# Data, Forms, and Content

Zod 4 + TanStack Query 5 + react-hook-form 7. TypeScript types describe what you *believe*;
Zod schemas verify what actually arrived. Everything crossing the app boundary gets parsed.

## The boundary rule

Any value from outside the app - an API response, a URL search param, `localStorage`, an
environment variable, a CMS payload - is `unknown` until parsed. Typing a fetch response as
`Promise<Patient>` is a claim TypeScript cannot check, so the first time the backend renames a
field, the app renders `undefined` somewhere far from the cause and you debug the symptom.

```ts
// Wrong - a claim, not a check
const data = (await res.json()) as Insight[];

// Right - the shape is verified, and the error names the field
const data = insightListSchema.parse(await res.json());
```

Define the schema first, then derive the type from it. One definition, no drift:

```ts
export const insightSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  publishedAt: z.iso.datetime(),
  category: z.enum(["article", "research", "report", "guide", "case-study"]),
});

export type Insight = z.infer<typeof insightSchema>;
```

Zod 4 note: top-level string formats moved out of `.string()` - use `z.email()`, `z.url()`,
`z.uuid()`, `z.iso.datetime()` rather than the deprecated `z.string().email()` chain.

## The API client

One configured wrapper in `src/lib/api-client.ts`. Not `fetch` scattered across components -
that spreads base URLs, headers, and error handling into places that should not know about
them.

```ts
import { env } from "./env";

export class ApiError extends Error {
  constructor(readonly status: number, readonly url: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  schema: z.ZodType<T>,
  init?: RequestInit,
): Promise<T> {
  const url = `${env.VITE_API_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    throw new ApiError(res.status, url, `${init?.method ?? "GET"} ${path} failed (${res.status})`);
  }
  return schema.parse(await res.json());
}
```

`fetch` only rejects on network failure - a 404 or 500 resolves normally with `ok: false`. Code
that forgets this treats an error page as data. Checking `res.ok` in one place means no call
site can forget.

## Queries

Query options live in the feature's `api/` folder as factories, so a route loader and a
component can prefetch and read the same query without the key drifting between them.

```ts
export const insightsQuery = () =>
  queryOptions({
    queryKey: ["insights"],
    queryFn: () => apiFetch("/insights", z.array(insightSchema)),
  });

export const insightQuery = (slug: string) =>
  queryOptions({
    queryKey: ["insights", slug],
    queryFn: () => apiFetch(`/insights/${slug}`, insightSchema),
  });
```

**Query keys are hierarchical and include every input the result depends on.** `["insights",
slug]` not `["insight"]` - a key missing an input means two different results share a cache
entry and one silently overwrites the other.

**Server data belongs in TanStack Query, never mirrored into `useState`.** Copying query data
into state creates a second copy that goes stale, and re-introduces the synchronisation problem
the library exists to solve.

Use `useState` for UI state (an open menu, a selected tab) and URL search params for anything
that should survive a refresh or be shareable - a filter, a page number, a search term. If a
user cannot send a colleague a link to what they are looking at, the state is in the wrong
place.

## Forms

`react-hook-form` with a Zod resolver. RHF keeps inputs uncontrolled, so typing in one field
does not re-render the whole form - which matters on a form as long as the Seiran enquiry.

```tsx
const form = useForm<EnquiryValues>({
  resolver: zodResolver(enquirySchema),
  mode: "onBlur",       // validate when a field is left, not on every keystroke
  reValidateMode: "onChange",  // once it has errored, correct in real time
});
```

`onBlur` first is deliberate: validating on every keystroke shows "invalid email" while someone
is still typing the second character, which reads as the form arguing with the user.

### Validation messages

Written for the person filling the form, in the interface's voice: what is wrong and how to fix
it. Never the raw Zod default.

```ts
z.string().min(1, "Enter your name")                  // not "String must contain at least 1 character"
z.email("Enter an email we can reply to")             // not "Invalid email"
```

### The four submit states

Every form has them, and the third is the one that gets skipped:

1. **Idle** - submit enabled, says what it does ("Start a Conversation", not "Submit").
2. **Submitting** - button shows a spinner and is disabled *while the request is in flight
   only*. Never disable submit as a validation gate; a permanently dead button with no
   explanation is the most common form dead end.
3. **Error** - the message says whether to retry or what to change, and **the entered values
   are still there**. A form that clears itself on failure loses ten fields of the user's work
   and usually loses the lead with them.
4. **Success** - a confirmation that says what happens next and when, not just "Thanks". For an
   enquiry form this is the highest-value copy on the site: it is the moment a stranger becomes
   a lead, and silence there reads as a broken form.

Move focus to the success or error message with `aria-live="polite"`, or a screen-reader user
gets no indication that anything happened.

## The enquiry form specifically

Eleven fields is a long form for a first contact, and every field costs completions. Reduce
friction where the field is not needed to route the enquiry:

- **Required:** name, email, organisation, business challenge. That is enough to reply.
- **Optional but useful:** role, telephone, location, sector, organisation size, area of
  support, preferred contact method.
- Mark optional fields explicitly rather than marking required ones - on a form this long,
  "(optional)" is the label that reduces anxiety.
- Group into two or three fieldsets with legends (About you · About your organisation · How we
  can help) so it reads as three short forms rather than one wall.
- The free-text challenge field is the one that matters most for qualification. Give it room
  and a prompt that invites specifics.

**Spam:** a honeypot field (hidden from sighted and screen-reader users via `aria-hidden` plus
off-screen positioning, rejected server-side if filled) plus a minimum time-to-submit stops
most bots without a CAPTCHA. A CAPTCHA on a lead form costs real conversions.

**Privacy:** this form collects name, email, phone, and organisation - personal data under
Kenya's Data Protection Act 2019. The form needs a visible link to the privacy policy stating
what is collected, why, and how long it is kept. The policy is on the outstanding-items list;
the form should not go live without it.

**Delivery:** a static site has no server, so the submission needs a real endpoint - a
serverless function, a form service, or Sazara's backend. Whichever it is, the endpoint must
validate again server-side. Client validation is a convenience for the user, never a security
boundary; anyone can POST directly.

## Content: Insights and Case Studies

The Insights hub is the site's long-term SEO asset, so how content is stored matters more than
it looks like it does at launch.

**Start with local MDX** in `src/content/insights/`, with frontmatter parsed by a Zod schema at
build time so a malformed post fails the build rather than the page. This needs no CMS, no
hosting cost, and no auth - correct for a site launching with a handful of articles.

**Move to a CMS when a non-developer needs to publish**, which for a thought-leadership hub is
usually within months. Keeping the content schema in Zod from day one means that migration
changes where content is fetched from, not how it is modelled.

Every insight needs: `slug`, `title`, `excerpt`, `publishedAt`, `category`, `readingTime`,
`author`, and an OG image. The excerpt and OG image are what get seen when a post is shared on
LinkedIn - which for this audience is the primary distribution channel, and the place a missing
image is most visible.

**Case studies launch empty on purpose.** The brief is explicit that none may be published
without client permission. Build the page with a real empty state that explains the policy -
that restraint is itself a credibility signal for an advisory firm - and never seed it with
sample content that could be mistaken for a real engagement.

The case study schema is fixed by the brief: `context`, `challenge`, `diagnosis`,
`intervention`, `outcome`, `learning`. Encode that in the schema so every published study has
the same spine.

## Read next

- [references/patterns.md](references/patterns.md) - error taxonomy, retry policy, optimistic
  updates, and the QueryClient defaults this project uses.
