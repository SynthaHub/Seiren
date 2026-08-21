# Seiran design tokens

STATUS: FILLED — derived from the Seiran Partners identity spec **SPES-001** (sheets 01–04).

The identity spec is the authority. This file translates it to screen and records the
decisions the spec does not cover. Where they ever disagree, **SPES-001 wins** — and this file
is what needs correcting.

Mirrored in `src/styles/theme.css`, which is what the build reads. Change both together.

---

## 1. Subject

Full detail in [brand.md](brand.md).

- **What this is:** the website for Seiran Partners, a Nairobi-based strategy and business
  advisory firm serving owner-managed businesses and SMEs in Kenya.
- **Who reads it:** an owner-manager still carrying too much of their business. Pragmatic,
  time-poor, sceptical of consultants, likely on a mid-range Android phone.
- **The one job of the site:** move a visitor from *recognising their own situation* to
  *starting a conversation*.
- **The idea:** Seiran — a clear sky after a storm. Structural, never weather imagery.
- **Density:** comfortable. This is a reading site.

## 2. Palette

From SPES-001 · 01. Hex is authoritative (it is what print matches); OKLCH is given because
Tailwind v4 tokens are authored in it and because ramps interpolate correctly there.

| Token | Brand name | Hex | OKLCH | Role on screen |
|---|---|---|---|---|
| `--color-navy` | Seiran Navy | `#1B2A4A` | `oklch(0.290 0.062 264)` | primary ground, headings on light |
| `--color-navy-80` | Navy 80 | `#48556E` | `oklch(0.449 0.044 263)` | **muted body text on light** |
| `--color-navy-60` | Navy 60 | `#767F92` | `oklch(0.596 0.031 265)` | borders, large text — **not body text** |
| `--color-navy-20` | Navy 20 | `#D1D5DB` | `oklch(0.872 0.009 258)` | muted text *on navy*, hairlines on navy |
| `--color-charcoal` | Charcoal | `#3A3A3A` | `oklch(0.349 0.000 90)` | body text on light |
| `--color-gold` | Gold Leaf | `#B8965A` | `oklch(0.691 0.088 81)` | accent **on navy only** |
| `--color-gold-deep` | Gold Deep | `#7D6230` | `oklch(0.512 0.076 81)` | accent on white or parchment |
| `--color-parchment` | Parchment | `#EDEBE5` | `oklch(0.940 0.008 92)` | secondary light ground |
| `--color-rule` | Rule | `#D8D5CC` | `oklch(0.873 0.013 92)` | hairlines on light grounds |
| `--color-white` | White | `#FFFFFF` | `oklch(1 0 0)` | primary light ground |

### Semantic aliases

Components reference these, never the brand names directly. A component that says
`text-ink-muted` keeps working if the underlying brand value is ever revised.

| Semantic | Light theme | On navy |
|---|---|---|
| `--color-surface` | White | Navy |
| `--color-surface-sunken` | Parchment | Navy 80 |
| `--color-ink` | Charcoal | White |
| `--color-ink-strong` | Navy | White |
| `--color-ink-muted` | Navy 80 | Navy 20 |
| `--color-border` | Rule | Navy 80 |
| `--color-accent` | Gold Deep | Gold Leaf |
| `--color-accent-ink` | White | Navy |

### The gold rule — hard constraint

**Gold Leaf may only sit on Seiran Navy.** SPES-001 · 02 lists Gold Leaf on White as *not
permitted* at 2.78:1. Verified, and worse than the spec implies in one case it does not list:

- Gold Leaf on White — **2.78:1, fails**
- Gold Leaf on Parchment — **2.33:1, fails harder.** Parchment is a light ground; the spec's
  rule covers it, but because Parchment is a named brand surface it is worth stating outright.
- Gold Deep on White — 5.73:1, passes AA
- Gold Deep on Parchment — 4.81:1, passes AA

So: **gold on any light ground is Gold Deep. Gold Leaf is for navy grounds only.** This is the
single easiest brand rule to break by accident, because Gold Leaf is the prettier value and is
the one people reach for.

### Navy 60 is not a text colour

Not in the spec, and a genuine trap. **Navy 60 on White is 4.02:1 — it fails AA for body text**
(4.5:1 required). It is the obvious-looking choice for muted copy and it is wrong.

**Use Navy 80 for muted text on light** — 7.50:1, comfortably AAA. Navy 60 is for borders,
dividers, and large text only, where the 3:1 threshold applies.

### Verified pairings

| Pairing | Measured | Grade |
|---|---|---|
| Navy on White | 14.22:1 | AAA |
| Charcoal on White | 11.37:1 | AAA (spec says 10.6 — spec is conservative) |
| Navy on Parchment | 11.93:1 | AAA |
| Charcoal on Parchment | 9.54:1 | AAA |
| White on Navy | 14.22:1 | AAA |
| Parchment on Navy | 11.93:1 | AAA |
| Navy 20 on Navy | 9.65:1 | AAA |
| Navy 80 on White | 7.50:1 | AAA |
| Gold Deep on White | 5.73:1 | AA |
| Gold Deep on Parchment | 4.81:1 | AA |
| Gold Leaf on Navy | 5.11:1 | AA |

### Proportion in use — a layout instruction, not a swatch note

**Navy 60% · White 25% · Gold Leaf 12% · Charcoal 3%.**

This is the most structurally consequential line in the identity spec, and it is easy to read as
decoration. Navy at 60% means **the site is navy-dominant** — large full-bleed navy regions are
the norm and white is the relief, not the other way round. A white site with navy headings
inverts the identity while technically using its colours.

Gold Leaf at 12% is generous for an accent, and it is only permitted on navy — which is
consistent: gold lives inside the navy regions, where it has room to be that present.

Charcoal at 3% is a body-text colour on the white 25%. It is not a surface.

## 3. Type

From SPES-001 · 03. Both faces are SIL Open Font Licence — **self-host them**, do not link a
font CDN. Self-hosting is permitted by the licence, removes a third-party request from the
critical path, and keeps the site working behind restrictive corporate networks.

| Token | Family | Weights | Used for |
|---|---|---|---|
| `--font-serif` | Source Serif 4 | Regular 400, Semibold 600 | display, wordmark, pull quotes |
| `--font-sans` | Inter | Regular 400, Medium 500, Semibold 600 | body, headings, tables, interface |

Medium 500 is licensed for **Heading 3 only** — that is a spec rule, not a preference.

**Fallback stacks**, per SPES-001 · 03:

```css
--font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
--font-sans: "Inter", Calibri, "Helvetica Neue", system-ui, sans-serif;
```

**Note on Inter:** [anti-slop.md](anti-slop.md) flags Inter as an over-used default face. That
warning does not apply here and must not be acted on — Inter is the client's specified brand
sans. The brand system outranks the general guidance.

### Scale — print pt converted to screen px

SPES-001 · 04 specifies one scale for print and screen. Print points do not map 1:1 to CSS
pixels, so the **ratios** are preserved against a 17px screen body, which is the right reading
size for long-form on a phone.

| Style | Print | Ratio | Screen | Line height | Weight |
|---|---|---|---|---|---|
| Display | 32 pt | 3.05× | 52 px | 1.2 | Source Serif 4 600 |
| Heading 1 | 22 pt | 2.10× | 36 px | 1.2 | Source Serif 4 600 |
| Heading 2 | 14 pt | 1.33× | 23 px | 1.2 | Inter 600 |
| Heading 3 | 11.5 pt | 1.10× | 19 px | 1.2 | Inter 500 |
| Body | 10.5 pt | 1.00× | 17 px | 1.5 | Inter 400 |
| Small | 9.5 pt | 0.90× | 15 px | 1.5 | Inter 400 |
| Label | 8 pt | 0.76× | **14 px** | 1.4 | Inter 600, tracked, uppercase |
| Quote | 15 pt | 1.43× | 24 px | 1.4 | Source Serif 4 400 italic |

**Label is floored at 14px, breaking its own ratio.** The strict conversion gives 13px, and
SPES-001 · 04 sets a hard minimum of 14px on screen. The spec resolves its own tension here;
the floor wins.

### Hero step — a proposed extension to SPES-001, pending sign-off

Display at 52px was built first and holds up fine in a document. In a full-width web hero it
reads quiet, and that is what made the first Home hero feel weak. One screen-only step is
therefore added **above** Display:

| Token | Value | Leading |
|---|---|---|
| `--text-hero` | `clamp(2.25rem, 1.15rem + 4.7vw, 4.25rem)` — 36px → 68px | 1.1 |

It starts at the spec's own H1 (36px) on a 320px phone, so nothing shrinks below a size
SPES-001 already sanctions; it only grows on wider screens, where the spec's document scale has
nothing to say. Leading tightens to 1.1 because 1.2 is visibly loose at 68px.

**This is an extension, not a reinterpretation — Seiran should approve it.** It is deliberately
one token used by page `h1`s only, so reverting is a single deletion plus putting heroes back
to `text-h1 md:text-display`.

### Type rules from the spec — all binding

- Line height 1.5 body, 1.2 headings.
- Measure 60–75 characters. Never wider.
- Two weights per family. Medium for Heading 3 only.
- **Capitals only for the Label style and for PARTNERS in the wordmark.** No all-caps headings,
  no all-caps buttons, no all-caps nav.
- **Never letterspace lowercase.** Tracking belongs to the Label style, which is uppercase.
- Tabular numerals in tables and invoices; proportional in running text.
- Never below 14px on screen.
- **Space above a heading always exceeds space below it.** Headings belong to the content that
  follows them; equal spacing makes a heading float between two blocks and read as belonging to
  neither.

## 4. Rhythm

Base unit 4px (Tailwind scale). The heading-space rule above is encoded as token pairs so it
cannot be got wrong by eye:

| Token | Value | Use |
|---|---|---|
| `--space-h1-above` / `--space-h1-below` | 64px / 24px | Display and H1 |
| `--space-h2-above` / `--space-h2-below` | 48px / 16px | H2 |
| `--space-h3-above` / `--space-h3-below` | 32px / 12px | H3 |
| `--radius-card` | 2px | near-square; the brand is institutional, not friendly-rounded |
| `--radius-control` | 2px | buttons, inputs |
| `--border-hairline` | 1px | Rule on light, Navy 80 on navy |

Shadows are not part of the identity. Elevation is carried by the navy/white/parchment surface
change, not by drop shadows — which is more consistent with a print-derived system and avoids
the shadow-on-everything failure in [anti-slop.md](anti-slop.md).

## 5. Signature — superseded on Home by the approved reference layout

> **Status, 2026-08-21.** An art-direction reference was approved after this was written.
> **Home now follows that layout**, which is light-led (parchment hero with photography) and
> alternates tone band by band rather than clearing top-to-bottom. Navy carries the utility
> bar, the figures band, the consultation card and the footer — that is what keeps SPES-001's
> navy-dominant proportion within reach.
>
> Radius moved with it: 2px → 14px cards, 10px controls, 18px media, on the same call.
>
> **Resolved.** The reference layout now runs across all eight pages. Every route opens with
> the shared `PageHero` (parchment, eyebrow, serif display, lede), alternates
> white / parchment bands, carries a navy pull-quote band where it has something worth
> emphasising, and closes on `CtaBand` with copy written for that page. The clearing described
> below is superseded site-wide and is kept here only as the record of what it replaced.
>
> **Photography is used sparingly on purpose.** An intermediate pass put a placeholder in
> every slot the reference fills with a photo — eighteen across the site — and the pages
> became about the missing images rather than the argument. There are now two, both the
> founder portrait (Home hero, Team). Sections that the reference builds around a collage are
> carried by type and structure instead. When real photography arrives, slots can be added
> back deliberately rather than by default.

**The clearing (as originally decided).** Every page opens in full Seiran Navy and clears
downward: navy → parchment → white. The reader physically moves from the storm to the clear sky
over the course of the scroll.

This is the site's one bold idea, and it is the only one. Everything else stays disciplined.

**Why it holds up:** it is the single structure where the brand's three fixed inputs all say
the same thing — the name means *a clear sky after a storm*; the core promise is *complexity
into clarity*; and SPES-001 sets a navy-dominant proportion that requires large navy regions
anyway. The structure is not applied to the brand, it falls out of it.

**It is static, not animated.** The gradient is built from section backgrounds, so it works
identically with `prefers-reduced-motion` set and needs no JavaScript.

**Where the gold goes.** Gold Leaf lives in the navy regions at the top of each page, where it
is legal and where the 12% allocation has room — section labels, hairlines, pull quotes, the
wordmark. By the time the page has cleared to white, gold is **Gold Deep** and appears once, on
the primary action. So the accent gets quieter as the page gets lighter, which is the same
gesture as the clearing itself.

**The variation that keeps it from becoming a template.** Anti-slop gate 1 warns against every
page sharing one rhythm. The clearing is tonal, not sectional — *the curve varies per page*:

| Page | Clearing curve | Why |
|---|---|---|
| Home | Even, full gradient | The complete argument in one scroll |
| About | Slow — navy holds two thirds | The story is the storm; clarity is the payoff |
| Services | Fast — clears by the second pillar | The four pillars need white for legibility |
| Approach | Stepped, once per stage | Seven discrete stages, seven steps of light |
| Team | Clears immediately | A person belongs in daylight, not in the storm |
| Insights | White throughout, navy masthead only | Reading surface; the gradient would fight the text |
| Case Studies | Navy throughout | It has nothing to show yet — the storm has not cleared |
| Contact | Clears fast, form in white | Never make someone fill a long form on a dark ground |

Case Studies staying entirely navy is the sharpest use of the device: the page is empty because
no engagement has been cleared for publication, and it looks it. The restraint is the message.

---

## Changelog

| Date | Change | Reason |
|---|---|---|
| 2026-08-21 | Initial fill from SPES-001 sheets 01–04 | Client identity spec supplied; supersedes proposed directions on colour and type |
| 2026-08-21 | Added Navy 80 as muted-text token; barred Navy 60 from body text | Measured 4.02:1 on white — fails AA. Not covered by the spec |
| 2026-08-21 | Extended the gold rule to cover Parchment explicitly | Gold Leaf on Parchment measures 2.33:1, worse than on white |
| 2026-08-21 | Added `--danger` and `--success` | SPES-001 defines no semantic states; the enquiry form needs an error colour. Derived to sit with navy and gold, measured on both grounds |
| 2026-08-21 | Added `--text-hero` (proposed extension) | 52px Display read weak in a built hero. Pending Seiran's sign-off |
| 2026-08-21 | Radius 2px → 14px card / 10px control / 18px media; added `--radius-pill` | Art-direction call to match the approved reference layout. SPES-001 does not specify radius, so this is direction, not deviation |
| 2026-08-21 | Home rebuilt to the approved reference layout | Supersedes the clearing on Home only — see the status note in §5 |
