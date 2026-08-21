# Component patterns

Concrete guidance for the components this site actually needs, and the specific way each one
tends to go wrong.

## Section wrapper

Marketing pages are a stack of sections. Give them one wrapper so vertical rhythm and gutters
are decided once rather than re-improvised on every page.

```tsx
type SectionProps = React.ComponentProps<"section"> & {
  width?: "narrow" | "default" | "wide";
};

export function Section({ width = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "px-4 py-16 md:px-8 md:py-24",
        {
          narrow: "mx-auto max-w-2xl",
          default: "mx-auto max-w-5xl",
          wide: "mx-auto max-w-7xl",
        }[width],
        className,
      )}
      {...props}
    />
  );
}
```

The failure mode without this: every page sets its own padding, and after six pages the
sections no longer line up vertically between routes. Nobody notices consciously; the site just
feels loose.

## Links, internal and external

Internal navigation uses the router's `<Link>` so it does not reload the page. External links
need `rel="noopener noreferrer"` - without `noopener`, the opened page gets a reference to this
window via `window.opener` and can redirect it.

Never write "click here". Link text is read out of context by screen readers and scanned out of
context by everyone else, so it must describe its destination on its own.

## Accordion (FAQs)

Use Radix Accordion. The hand-rolled version - a `useState` boolean and a conditional render -
misses that the trigger needs `aria-expanded`, that the panel must be associated with it, and
that collapsed content should not be reachable by tab.

Content that matters for SEO should be in the DOM even when visually collapsed, not conditionally
rendered away.

## Form field

One component that owns label, control, description, and error, so no field can ship without a
label and no error can ship unassociated.

```tsx
type FieldProps = {
  label: string;
  name: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
};

export function Field({ label, name, error, description, required, children }: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const descId = `${id}-desc`;
  const describedBy = [description && descId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-danger" aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {description && <p id={descId} className="text-sm text-ink-muted">{description}</p>}
      {children({ id, "aria-describedby": describedBy, "aria-invalid": Boolean(error) })}
      {error && <p id={errorId} className="text-sm text-danger">{error}</p>}
    </div>
  );
}
```

The `sr-only` "(required)" matters: a red asterisk is a visual convention that conveys nothing
to a screen reader.

## Card that is entirely clickable

Common on insight and service listings, and commonly built wrong. Wrapping the whole card in an
`<a>` swallows any nested links and makes the screen-reader announcement enormous.

Use a stretched pseudo-element on the real link instead - the heading link stays the accessible
name, the whole card stays clickable:

```tsx
<article className="group relative rounded-card border border-border p-6">
  <h3 className="font-sans text-h3">
    <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
      {title}
    </a>
  </h3>
  <p className="mt-2 text-ink-muted">{excerpt}</p>
</article>
```

Put the focus ring on the `<article>` via `group-focus-within:` so keyboard users see the whole
card highlighted rather than a ring around the heading only.

## Icons

One icon set, imported individually (`lucide-react`). Never import the whole set. Icons that
sit beside text get `aria-hidden="true"` - the text already says it, and a duplicate
announcement is noise. Icon-only controls get `aria-label`.

Size icons in `em` so they scale with their text rather than drifting out of alignment when the
type scale changes.

## Images

Always `width` and `height` (or an aspect-ratio box). Without intrinsic dimensions the browser
cannot reserve space, so the page reflows as images arrive - visible jank, and a bad Cumulative
Layout Shift score.

`loading="lazy"` below the fold, eager above it. The hero image is the largest paint on most
marketing pages; lazy-loading it makes the site measurably slower to feel ready.

Serve modern formats (WebP/AVIF) with sensible dimensions. An unoptimised 4MB photo undoes
every other performance decision.

## Prose / long-form content

Insight articles and long copy need a constrained measure and a styled prose scope. Use
`@tailwindcss/typography` with the token colors overridden, rather than styling every `<p>`,
`<h2>`, and `<ul>` by hand at each call site.

Line length ~65-75 characters. Longer, and the eye loses the line return.

## Skip link

First focusable element on the page, visually hidden until focused, jumping to `#main`. Without
it, a keyboard user tabs through the entire navigation on every single page before reaching
content.

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
  Skip to content
</a>
```
