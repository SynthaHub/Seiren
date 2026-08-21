# Placeholder imagery

These are **stand-ins**, not final assets. Replace them with Seiran's own
photography before launch.

## Source and licence

Sourced from [Unsplash](https://unsplash.com). The Unsplash Licence permits free
commercial and non-commercial use without permission or attribution, and does
not require a credit line — attribution is appreciated but not required.

It does **not** permit compiling photos to build a competing service, and it
does not transfer any right to use an identifiable person's likeness for
endorsement. That second point is why none of these is used as a portrait of a
named individual.

Confirm the licence terms yourself before launch rather than taking this file's
word for it: <https://unsplash.com/license>

## The rule that matters

**No placeholder may be presented as a photograph of Eldaah Toi**, or of any
other real person named on the site. Putting a stranger's face beside a real
person's biography misrepresents them.

Accordingly:

- the founder slot uses a **workspace interior**, not a portrait of a person;
- every placeholder renders with alt text stating that it is a placeholder;
- `usingPlaceholderImagery` in `src/content/placeholders.ts` drives that, and
  flips to `false` when real photography lands.

## Files

| File | Slot |
|---|---|
| `workspace-portrait.jpg` | Home hero, Team page — founder slot |
| `advisory-session.jpg` | Client session |
| `team-workshop.jpg` | Workshop |
| `working-documents.jpg` | Detail shot |
| `office-desk.jpg` | Reporting / performance |
| `nairobi-exterior.jpg` | Location |

## Replacing them

1. Put the real files in `public/` (or keep this folder and overwrite).
2. Update the paths in `src/content/placeholders.ts`.
3. Set `usingPlaceholderImagery = false`.

Nothing at the call sites changes.

## Before launch

Optimise whatever replaces these: WebP or AVIF, sized to the slot, and never a
4 MB original straight off a camera. One unoptimised photo undoes every other
performance decision on the site, and performance is a trust signal for this
audience — most of whom arrive on a mid-range Android over 4G.
