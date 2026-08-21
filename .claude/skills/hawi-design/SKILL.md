---
name: hawi-design
description: The visual design system for Hawi - tokens, typography, spacing, color, layout, and the anti-generic rules that keep this app from looking AI-generated. Use this skill BEFORE writing or changing ANY user-facing UI: a new screen, a layout, a color, a font size, a spacing value, a border radius, or any Tailwind class that affects appearance. Also trigger whenever the user says design, UI, UX, look, feel, theme, style, polish, redesign, "make it nicer", "it looks off", or asks for a new page or screen. Never choose colors, fonts, or spacing from memory - references/tokens.md is the only source of truth.
---

# Hawi Design System

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4. Tailwind v4 is CSS-first, so the design
system lives in CSS as a `@theme` block, not in a `tailwind.config.js`.

## The one rule

**Every color, font, radius, shadow, and non-trivial spacing value in this app comes from a
named token.** No arbitrary values in components. Not `bg-[#1e293b]`, not `text-[15px]`, not
`p-[13px]`. If you need a value that has no token, add the token to the theme first, then use
it. This is what separates a designed product from a collection of screens - and it is the
thing that decays fastest when an agent writes UI, because inventing one hex code in one
component is always locally easier than editing the theme.

Utilities that fall out of a token (`bg-surface`, `text-ink-muted`, `rounded-card`,
`font-serif`, `text-h2`) are always allowed. Tailwind's own spacing scale (`p-4`, `gap-6`) is
allowed because it *is* a token scale. Raw bracket values are not.

## Step 0 - the system is already defined

Seiran supplied a documented identity spec, **SPES-001**, covering colour, typefaces, type
scale, and typographic rules. It is the authority on all four.

Read [references/tokens.md](references/tokens.md) before touching any UI. It translates
SPES-001 to screen, records the measured contrast for every pairing, and documents two
constraints the spec does not state that will otherwise be broken by accident:

- **Gold Leaf sits on navy only** - it fails contrast on white *and* on parchment.
- **Navy 60 is not a text colour** - 4.02:1 on white, fails AA. Muted text is Navy 80.

Treat all of it as law. Do not improvise values mid-render, and do not "improve" the specified
typefaces - see the precedence note at the top of
[references/anti-slop.md](references/anti-slop.md).

**What is still open is structure**, not colour or type. SPES-001 says nothing about page
rhythm or the signature element, and the site's distinctiveness now has to come from there.
The 60% navy proportion is the binding constraint on any structural proposal.

The derivation process below is retained for reference, and for any future token that SPES-001
does not cover.

## Token derivation (run once, when the brief arrives)

Do this as a design lead would, not as a form to fill in. The output is a filled `tokens.md`
plus `src/styles/theme.css`.

**1. Pin the subject.** Read [references/brand.md](references/brand.md) first - Seiran's name,
story, audience, and voice are already documented there, and every distinctive decision comes
from that material rather than from the consulting-website category. Then name the single job of
the page being designed. A site read by a time-poor Kenyan owner-manager on a mid-range Android
does not get the same density, contrast, or personality as a deck for a boardroom.

**2. Palette - 5 to 7 named values in OKLCH.** OKLCH because its lightness is perceptually
uniform, so a ramp built by stepping L actually looks evenly stepped, and hue stays stable as
you lighten. Name by role, never by hue: `--color-surface`, `--color-surface-raised`,
`--color-ink`, `--color-ink-muted`, `--color-accent`, `--color-border`, plus semantic
`--color-danger` / `--color-success` / `--color-warning`. Role names survive a rebrand;
`--color-blue-500` does not.

**3. Type - two faces, one scale.** A display face used with restraint, and a body face that
disappears. Set an explicit scale with intentional jumps; a scale where every step is 1.125x
reads as mush. Give the display face real weight and tracking decisions. Typography is where
personality lives - a screen can be entirely neutral in color and still feel authored if the
type is set well.

**4. Rhythm.** One base unit (Tailwind's 4px scale), one radius family, one shadow family, one
border weight. Then pick a density - comfortable or compact - and hold it. Dense data tools and
marketing pages are not the same product and should not share a density.

**5. Signature.** The one element this app is remembered by. Spend boldness in exactly one
place and keep everything around it disciplined. A design with three bold ideas has none.

Then review the plan against the brief before writing code: if a part of it is what you would
produce for *any* app in this category rather than for Hawi specifically, revise it and say
what changed. Only then write `theme.css`.

**Calibration - the current AI-default looks. Avoid unless the brief asks for one:** cream
(#F4F1EA) with a high-contrast serif and a terracotta accent; near-black with a single acid
green or vermilion accent; broadsheet layout with hairline rules and zero radius. All three are
legitimate answers to *some* brief, but they show up regardless of subject, which is what makes
them defaults rather than choices.

## Where the system lives

```
src/styles/globals.css   @import "tailwindcss", base resets, font faces
src/styles/theme.css     the @theme block - tokens themselves
```

Tailwind v4 shape:

```css
/* globals.css */
@import "tailwindcss";
@import "./theme.css";

@custom-variant dark (&:where(.dark, .dark *));
```

`theme.css` already exists and is written. Read it rather than reinventing it - it holds the
full SPES-001 translation with the reasoning in comments.

Two mechanics worth knowing before editing it:

**Every key in `@theme` generates utilities automatically.** `--color-surface` gives you
`bg-surface`, `text-surface`, `border-surface`; `--text-h2` gives `text-h2` with its line
height attached. Name it once, use it everywhere, and it appears in editor autocomplete.

**Theme switching uses `@theme inline`.** The semantic roles are plain custom properties that
`@theme inline` points at, so the generated utilities resolve at runtime rather than baking in
a value. That is what lets one class do the right thing on both grounds:

```html
<section class="on-navy bg-surface text-ink">
  <!-- surface is now navy, ink is white, accent is Gold Leaf -->
</section>
```

`.on-navy` is how the 60% navy proportion gets built. A navy region sets it once, and every
component inside picks up the correct ink, border, and accent - including the Gold Leaf accent
that is *only* legal on navy. Components never hard-code a navy variant.

## Quality floor - non-negotiable, never announced

Build these in from the first render. Retrofitting them costs far more than doing them once.

- **Responsive at 320 / 375 / 768 / 1280.** No horizontal scroll. Use `overflow-x: clip` at the
  root, never `hidden` - `hidden` silently breaks `position: sticky` on ancestors.
- **Grid tracks holding images or long text use `minmax(0, 1fr)`, never bare `1fr`.** A bare
  `1fr` track has an automatic minimum of its content, so one long word blows out the layout.
- **Visible keyboard focus on every interactive element** via `focus-visible:` using the accent
  token. Never `outline-none` without a replacement ring.
- **`prefers-reduced-motion` respected** for any transform or opacity animation over ~200ms.
- **Contrast:** body text >= 4.5:1, large text and UI borders >= 3:1, measured against the
  surface it actually sits on - including dark mode, which is where it usually fails.
- **Never a two-line clickable label.** Buttons, nav links, and CTAs that wrap to two lines read
  as broken on mobile.
- **Headings are roman.** An italicised word inside an upright heading is one of the most
  reliable AI tells. Carry emphasis with weight or accent color instead.

## Before handing back any UI

Score the output 1-5 on six axes and revise anything under 3:

| Axis | Question |
|---|---|
| Philosophy | Does this express a point of view, or is it the neutral default? |
| Hierarchy | Can a first-time user tell in one second what matters most? |
| Execution | Spacing, alignment, optical balance - is it tight? |
| Specificity | Would this design work equally well for a different product? (bad if yes) |
| Restraint | Is there exactly one bold idea, not three? |
| Variety | Does this screen have a different rhythm from the last one, or the same hero-grid-CTA? |

Do this scoring in reasoning, not in the output. Do not print the scores into the user's code
or chat unless they ask.

## Read next

- [references/brand.md](references/brand.md) - Seiran's name, story, audience, voice, and what
  to take from the supplied inspiration. Read this before designing anything.
- [references/tokens.md](references/tokens.md) - the tokens themselves. Source of truth.
- [references/anti-slop.md](references/anti-slop.md) - the specific patterns that make UI look
  generated, and what to do instead. Read before building any page.
- [references/layout.md](references/layout.md) - site shell, per-page rhythm, measure, and the
  spacing scale this site uses.
