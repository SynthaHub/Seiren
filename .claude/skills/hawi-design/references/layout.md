# Layout, page structure, and spacing rhythm

How pages on the Seiran site are put together. Read before building a new page or restructuring
an existing one.

## Spacing rhythm

Tailwind's 4px scale is the base unit. Use a small set of values consistently - inconsistent
spacing is what makes a site feel unresolved even when nothing is obviously wrong.

| Purpose | Value | Class |
|---|---|---|
| Inside a control | 8-12px | `px-3 py-2` |
| Between related items (label + field) | 8px | `gap-2` |
| Between form fields | 16-20px | `gap-4` / `gap-5` |
| Inside a card | 20-24px | `p-5` / `p-6` |
| Between blocks within a section | 32-48px | `gap-8` / `gap-12` |
| Between page sections | 64-96px | `py-16 md:py-24` |
| Page gutter, mobile -> desktop | 16px -> 32px | `px-4 md:px-8` |

**Prefer `gap` over margins.** Margins collapse, leak across component boundaries, and make a
child responsible for its position in a parent it knows nothing about. `gap` keeps spacing owned
by the container doing the arranging, so a section can be reordered without carrying stray outer
margin with it.

Section padding is decided once in the shared `Section` component, not re-improvised per page.
Six pages each setting their own padding is six pages that no longer line up vertically.

## Measure

| Content | Max width | Class |
|---|---|---|
| Long-form prose (insights, story) | 65-75ch | `max-w-2xl` / `prose` |
| Standard section content | ~1024px | `max-w-5xl` |
| Wide grids, full-bleed imagery | ~1280px | `max-w-7xl` |

Body copy at full viewport width is measurably harder to read - past about 75 characters the eye
loses the line return. This is the single most common failure on consultancy sites, where a
paragraph of positioning copy gets stretched across a 1600px monitor.

## The site shell

```
+---------------------------------------------------------+
| Skip link (visible on focus)                            |
+---------------------------------------------------------+
| Header: wordmark · nav · Start a Conversation           |  sticky
+---------------------------------------------------------+
| <main id="main">                                        |
|   section                                               |
|   section                                               |
|   ...                                                   |
|   closing CTA section                                   |
+---------------------------------------------------------+
| Footer: nav · contact · location · legal · social       |
+---------------------------------------------------------+
```

- **The header is sticky and stays quiet.** It condenses on scroll rather than announcing
  itself. The primary CTA lives in it on every page, because a visitor decides to make contact
  from wherever they happen to be, not only at the bottom of Contact.
- Below `md`, nav collapses to a drawer. The CTA stays visible in the bar - it does not get
  buried inside the menu.
- **One `<main id="main">` per page**, one `<h1>`, headings descending without skips.
- **Every page ends with a CTA section**, and it varies by page: Services closes on discussing a
  specific challenge, Insights closes on the next article or the newsletter, About closes on
  starting a conversation. The same CTA block copy-pasted eight times is the clearest tell that
  a site was assembled rather than written.

## The clearing - how every page is built

The site's signature, decided and binding. Full rationale in [tokens.md](tokens.md) §5.

**Every page opens in full navy and clears downward to white.** Navy → parchment → white,
built from section backgrounds only. No scroll animation, no JavaScript, identical behaviour
with reduced motion set.

Mechanically that means each page is a stack of sections where the navy ones carry
`class="on-navy"`:

```tsx
<Section className="on-navy">      {/* storm - hero */}
<Section className="on-navy">      {/* still navy */}
<Section className="bg-surface-sunken">  {/* parchment - transitional */}
<Section>                          {/* white - cleared */}
<Section>                          {/* white - the action */}
```

`.on-navy` re-resolves every semantic token inside it, so components need no navy variant. It
is also the only place Gold Leaf is legal - see gate B1.

**Gold gets quieter as the page lightens.** Gold Leaf does its work in the navy regions
(labels, hairlines, pull quotes) where the 12% allocation has room. In the cleared white
region, gold appears once, as Gold Deep, on the primary action.

**The curve varies per page** - this is what stops the device becoming the template that
anti-slop gate 1 warns about. The clearing is tonal; the sectional rhythm underneath it still
differs by page, and so does how fast the page clears. The per-page curve is specified in
[tokens.md](tokens.md) §5 - follow it rather than applying an even gradient everywhere.

Two that matter most:

- **Contact clears fast.** Nobody fills eleven fields on a dark ground. The form is in white.
- **Case Studies never clears.** It stays navy throughout, because nothing has been cleared for
  publication yet. The page being unresolved is the honest state, and it says more about the
  firm's discipline than sample content would.

Underneath the gradient, each page still gets a structure driven by its own job:

| Page | Its job | A structure that fits |
|---|---|---|
| Home | Recognition, then orientation | Thesis hero → the problem stated in the reader's words → four pillars → the journey in brief → CTA |
| About | Meaning and credibility | The name and what it means → purpose/vision/mission → brand story as narrative prose → philosophy |
| Services | Depth and navigation | Four pillars as substantial sections, each with real sub-services - not four equal teaser cards |
| Approach | Sequence | The seven stages, where order genuinely carries meaning - this is the one page where numbering is honest |
| Team | Trust in a person | Founder profile with real weight, then the associate network as capability breadth |
| Insights | Findability | Filterable list, category-led, built to hold a hundred articles as well as three |
| Case Studies | Restraint | A single honest empty state explaining the publication policy |
| Contact | Conversion | Form first and above the fold, FAQs beneath to answer objections at the moment of hesitation |

**The Approach page is the exception that proves the numbering rule.** Understand → Diagnose →
Clarify → Design → Execute → Strengthen → Transform is a genuine sequence, so numbered markers
there carry real information. That is exactly why they must not appear anywhere else on the
site: their meaning comes from being used only where order matters.

## The hero

The hero is a thesis, not a slot to fill. Seiran's own material hands one over: *a clear sky
after a storm*, and *complexity into clarity*. That is a visual and structural idea, not just a
tagline - it can be expressed in how the page opens, resolves, or clears.

Avoid the category default: a centered headline, a one-line subhead, two buttons, and a stock
photo of a handshake or a glass tower. Every consulting template opens that way, which is
precisely why it communicates nothing about this firm.

Do not invent statistics for a stats bar. Seiran is new; fabricated numbers would be both
dishonest and, for an advisory firm, self-defeating.

## Sections

Each section does one job and is named for it. Vary the internal layout between adjacent
sections - alternating full-width, two-column, and constrained-prose blocks creates rhythm.
Eight consecutive centered-text sections read as one long undifferentiated scroll.

Not everything is a card. Cards imply separable, comparable objects - right for four service
pillars, wrong for a brand story, which is prose and should look like prose.

## Forms

- One column. Multi-column forms cause the eye to skip fields.
- Label above the field, always visible. A placeholder is not a label.
- Group the long enquiry form into fieldsets with legends so it reads as three short forms.
- The submit button says what it does: **Start a Conversation**.
- Errors sit under their field, wired with `aria-describedby`.

## Responsive

Breakpoints are Tailwind defaults: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.

Design mobile-first - base styles for narrow, complexity added at `md:` and up. Verify at 320,
375, 768, and 1280 before calling a page done. Assume a mid-range Android on 4G is the typical
visitor, not a desktop on office wifi.
