# Anti-slop gates

Read before building any greenfield screen. These are the patterns that make generated UI
recognisable as generated. Each one has a legitimate use - the problem is that they appear by
default rather than by decision. The test for every item: *did I choose this for Seiran, or did
it arrive on its own?*

## Precedence — read this before acting on anything below

Seiran has a documented identity spec, **SPES-001**. Where it speaks, it wins, and the gates
below do not apply. The order of authority is:

1. **SPES-001** (colour, type, scale, type rules)
2. **[tokens.md](tokens.md)** (its translation to screen, plus what it does not cover)
3. These gates

Two places this matters concretely:

- **Inter is Seiran's specified brand sans.** Inter is over-used across the industry and would
  normally be worth avoiding on distinctiveness grounds. That reasoning does not apply here.
  Do not substitute it, do not "improve" it, do not raise it as a concern. The same holds for
  Source Serif 4.
- **Near-zero border radius (2px) is a brand decision**, not the broadsheet default warned
  about at gate 15. It comes from a print-derived institutional system.

Distinctiveness on this project has to come from **structure, page rhythm, and the signature
element** - not from palette or typeface, both of which are already settled.

## Brand rules that are easy to break by accident

**B1. Gold Leaf never sits on a light ground.** 2.78:1 on white, 2.33:1 on parchment - both
fail. On white or parchment, gold is **Gold Deep**. Gold Leaf is for navy grounds only. This is
the most likely brand violation on the whole site, because Gold Leaf is the prettier value and
the one that gets reached for.

**B2. Navy 60 is not a text colour.** 4.02:1 on white - it fails AA for body copy. It looks
exactly like the right choice for muted text and it is wrong. Muted text on light is **Navy
80** (7.50:1).

**B3. No all-caps except the Label style.** SPES-001 permits capitals only for Label and for
PARTNERS in the wordmark. No all-caps buttons, nav items, or section headings.

**B4. Never letterspace lowercase.** Tracking belongs to the uppercase Label style alone.

**B5. Navy is 60% of the site.** A white page with navy headings uses the brand's colours while
inverting its proportion. Large navy regions are the norm; white is the relief.

**B6. No drop shadows.** Elevation comes from the navy / white / parchment surface change.
Shadows are not in the identity and would read as a web convention grafted onto a print system.

## Structure

**1. The same page rhythm every time.** Hero, three feature cards, testimonial strip, CTA,
footer. Two different screens in Hawi should not share a skeleton with the colors swapped. Vary
what the page opens with, how many regions it has, and where the weight sits.

**2. Three of everything.** Three cards, three columns, three steps. Use the number the content
actually has. Four features do not get padded to six, and two do not get inflated to three.

**3. Numbered markers (01 / 02 / 03) on things that are not sequences.** Numbering is
information - it says "these happen in order". On an unordered feature list it is decoration
pretending to be structure.

**4. Everything is a card.** Cards imply separable, comparable objects. A form is not a set of
comparable objects. Sections that are simply *content* need a heading and space, not a border
and a shadow.

**5. Centered everything.** Center-aligned headings, body copy, and buttons stacked down the
middle read as a template. Left-aligned text has a consistent entry point for the eye and is
faster to read.

## Content

**6. Invented metrics.** Never write "+47% faster", "trusted by 50,000+ teams", or "10x" unless
the user supplied that number. Fabricated proof is the single most damaging thing to ship,
because it can reach a real customer. If a stat-led layout has no real stats, use a labelled
placeholder or change the layout.

**7. Fake testimonials, logos, and avatars.** Same rule. A grey placeholder block labelled
"customer logo" is honest; a made-up company name is not.

**8. Lorem ipsum in a delivered screen.** Write plausible real copy in the product's voice.
Placeholder text hides layout problems that only appear with real content lengths.

**9. Marketing voice inside an application.** "Effortlessly manage your workflow" belongs on a
landing page, not above a data table. In-app copy names what the thing does.

**10. Emoji as iconography.** Fine in a chat message, wrong in a product UI - they render
differently on every platform and cannot be colored or sized reliably. Use a real icon set.

## Type

**11. Italic headings, or an italic word inside an upright heading.** One of the most reliable
AI tells. Emphasis comes from weight or accent color.

**12. A gradient on the headline text.** Almost always the template answer.

**13. Only two sizes and one weight.** A type scale that never leaves 16px/24px produces a page
with no hierarchy. Real hierarchy needs contrast in size *and* weight.

**14. Body copy at 100% width.** Line length over ~75 characters is measurably harder to read.
Constrain prose with `max-w-prose` or an explicit measure.

## Color and surface

**15. Purple-to-blue gradients.** The single most overused AI accent. Also: the glassmorphic
frosted card over a blurred blob background.

**16. A gradient with no reason.** Gradients are direction - they should point somewhere or
indicate depth. A gradient on a button because buttons look nicer with gradients is noise.

**17. Shadows on everything.** Elevation is meaning: it says "this floats above that". If
every element is elevated, nothing is.

**18. Pure black text on pure white.** `#000` on `#fff` is harsh at real screen brightness. Use
the ink and surface tokens, which are deliberately off both ends.

**19. Dark mode as an inversion.** Dark mode is not light mode with the lightness flipped.
Shadows stop reading and must be replaced by borders or raised surfaces; saturated accents go
harsh and usually need lower chroma; pure white text vibrates on dark and needs pulling back.

## Chrome and decoration

**20. Hand-drawn fake browser bars, phone frames, or IDE windows** around a screenshot or code
block. The user's environment already supplies real chrome. Use a real screenshot in a
`<figure>`, or nothing.

**21. Decorative blurred blobs, floating orbs, and grid overlays** that carry no meaning.

**22. Motion scattered everywhere.** One orchestrated moment lands harder than eight elements
that each fade in on scroll. Extra animation is itself a strong AI tell.

## Craft

**23. Only the happy path.** Every screen that loads data needs four states designed:
**loading**, **empty**, **error**, and **populated**. Empty states are an invitation to act -
they say what this screen is for and give the one action that fills it. Errors say what went
wrong and how to fix it, in the interface's voice, without apologising.

**24. Optical misalignment.** Mathematically centered is not always visually centered - icons
next to text, and glyphs inside circular buttons, usually need a nudge.

**25. Interactive elements with no states.** Hover, active, focus-visible, disabled, and
loading are all part of the component, not polish added later.

**26. Fixed pixel heights on anything holding text.** Text reflows - at a different font size,
in a different language, with a longer real value. Use padding and let content size the box.
