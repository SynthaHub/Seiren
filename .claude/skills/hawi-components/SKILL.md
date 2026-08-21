---
name: hawi-components
description: How to write a React component in Hawi - TypeScript prop typing, cva variants, the cn() helper, Tailwind class ordering, composition over configuration, and the accessibility floor every interactive element must clear. Use this skill BEFORE creating or editing ANY .tsx component, and whenever adding a prop, building a button/input/dialog/card/nav/table, handling hover-focus-disabled states, wiring a form control, or asking whether something should be one component or several. Also trigger on "component", "props", "variant", "reusable", "accessible", "a11y", "keyboard", or "screen reader".
---

# Component Conventions

React 19 + TypeScript 7 + Tailwind v4. Colors, type, and spacing come from `hawi-design` -
this skill covers how the component itself is built.

## Shape of a component

```tsx
import { cn } from "@/lib/cn";

type PullQuoteProps = {
  quote: string;
  attribution: string;
  className?: string;
};

export function PullQuote({ quote, attribution, className }: PullQuoteProps) {
  return (
    <figure className={cn("border-l-2 border-accent pl-6", className)}>
      <blockquote className="font-serif text-quote italic text-ink-strong">{quote}</blockquote>
      <figcaption className="mt-3 text-small text-ink-muted">{attribution}</figcaption>
    </figure>
  );
}
```

The rules embedded there, and why:

- **Named function export, not a default export.** Named exports rename consistently across the
  codebase, autocomplete correctly, and cannot be imported under three different spellings.
- **Props type declared above, named `<Component>Props`, exported when other files build on it.**
- **`className` is accepted and merged last**, so a parent can adjust spacing without the
  component growing a `marginTop` prop. This one convention prevents most prop bloat.
- **No `forwardRef`.** React 19 passes `ref` as an ordinary prop.
- **No `React.FC`.** It adds nothing and historically implied children that may not exist.

## `cn()` - always

```ts
// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

Tailwind classes do not have cascade priority - `"px-2 px-4"` resolves by stylesheet order, not
by which is written last, so a caller passing `px-4` to a component with `px-2` gets whichever
Tailwind happened to emit first. `twMerge` resolves conflicts by intent, keeping the last one.
Any component accepting `className` must run it through `cn`, or its API is a coin flip.

## Variants with cva

When a component has more than two visual variations, use `class-variance-authority` instead of
chained ternaries. Variants become part of the type signature, so a typo is a compile error
rather than a silently missing class.

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center rounded-control font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-accent/90",
        outline: "border border-border text-ink hover:bg-surface-sunken",
        ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
```

Note the base string carries focus and disabled styling. Putting those in the base rather than
in each variant means a new variant cannot ship without them.

## Composition over configuration

When a component starts growing props that toggle *structure* - `showHeader`, `hideFooter`,
`withIcon`, `isCompact` - it wants to be several components instead:

```tsx
// Configuration - every new use case adds a prop, and they multiply
<Card title="Strategy" showIcon icon={<X/>} footer={<Y/>} compact />

// Composition - new use cases need nothing new
<Card>
  <CardHeader><Icon /><CardTitle>Strategy</CardTitle></CardHeader>
  <CardBody>...</CardBody>
  <CardFooter><Y /></CardFooter>
</Card>
```

Boolean props that control layout are the reliable early warning. Two is fine; by the fourth,
the component has become a small framework only its author can use, and every change to it
risks four call sites.

Props are right for *values and behaviour* (`quote`, `onSelect`, `variant`). Children are right
for *content and arrangement*.

## Class ordering

Write classes in a consistent order so a long `className` can be scanned rather than parsed:

**layout → box → typography → visual → state**

```
flex items-center gap-3   p-4 w-full   text-sm font-medium   bg-surface rounded-card   hover:bg-surface-sunken focus-visible:ring-2
```

Install `prettier-plugin-tailwindcss` and stop thinking about it. Ordering is a formatting
problem, and formatting problems belong to tools.

When a class list passes roughly 12 utilities, that is usually a signal the element is doing too
much, not a signal to reach for `@apply`. Avoid `@apply` - it recreates the CSS-file indirection
Tailwind exists to remove, and hides specificity conflicts.

## Accessibility floor

Not a polish pass. These are cheap when built in and expensive to retrofit.

**Semantic elements first.** `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`,
`<footer>`. A `<div onClick>` is invisible to keyboard and screen-reader users and needs four
extra attributes to imitate what `<button>` gives free. If the thing navigates, it is a link -
users expect middle-click and "open in new tab" to work.

**Every input has a real `<label>`** connected by `htmlFor`/`id`. A placeholder is not a label.
An icon-only button needs `aria-label`.

**Keyboard reachable, in a sensible order.** Never `tabIndex` above 0. Test by tabbing through:
if focus jumps unpredictably or vanishes into an invisible element, it is broken.

**Visible focus.** `focus-visible:ring-2 ring-accent` with an offset. Never remove an outline
without replacing it.

**Images:** meaningful ones get descriptive `alt`; decorative ones get `alt=""` so screen
readers skip them rather than reading a filename.

**Announce what changes.** Async results, toasts, and form errors need `aria-live="polite"`, or
a sighted-only user is the only one who learns the request succeeded.

**Do not build a dialog, dropdown, combobox, or tooltip by hand.** Focus trapping, restore-on-
close, escape handling, scroll locking, and ARIA wiring are genuinely hard and easy to get
subtly wrong. Use Radix primitives (headless, unstyled) and style them with the tokens.

**Touch targets are at least 44x44px**, including on a marketing site opened on a phone.

## State handling

Every interactive component defines: **default, hover, active, focus-visible, disabled**, and
where relevant **loading**. A disabled button must communicate *why* nearby - a dead control
with no explanation is a dead end.

Local state lives in the component. Lift it only when a second component genuinely needs it.
Reaching for global state before that is how a two-page site acquires a store it does not need.

## Before finishing a component

- Tab to it, operate it with the keyboard alone, and tab away.
- Check it at 320px wide.
- Check it in both themes if the site has a dark mode.
- Pass a `className` from outside and confirm it wins.
- Read the props list: is any prop there for exactly one call site?

## Read next

- [references/patterns.md](references/patterns.md) - concrete implementations of the components
  this site needs, and the mistakes each one invites.
