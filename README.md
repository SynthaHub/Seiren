# Seiran Partners

Marketing site for Seiran Partners — strategy and business advisory for
owner-managed businesses in Kenya.

Static, prerendered, no server of its own. Nine route files produce twelve
prerendered pages — eight fixed, plus one per service pillar from `$pillar`.

(The build log reports "14 pages": its crawler visits `/services` and
`/services/` separately, and likewise for `/insights`. Twelve HTML files are
written.)

---

## Running it

Requires Node **20.19+ or 22.12+** (Vite 8's floor; no `engines` field is
declared, so nothing enforces it). The two Python scripts need Python 3 with
Pillow — the app itself does not.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. Content and env are validated here — see below. |
| `npm run build` | Production build, then writes `sitemap.xml` into the build output from what was actually prerendered. |
| `npm run preview` | Serve the built output. |
| `npm run typecheck` | `tsc --noEmit`. Not part of `build` — run it yourself. |
| `npm run validate-content` | Checks `content/*.json` against the Zod schemas in `src/content/schemas.ts`. Runs in CI on every push; not part of `build`. |
| `npm run format` | Prettier over `src/`. |
| `python scripts/brand.py` | Regenerate logo assets from `brand/`. |
| `python scripts/images.py` | Regenerate responsive photo variants. |

`npm run build` does **not** typecheck. CI should run both.

---

## Stack

Vite · React 19 · TypeScript · TanStack Router/Start (file-based routes,
prerendered) · Tailwind CSS v4 (CSS-first, no `tailwind.config.js`) · Zod ·
react-hook-form.

---

## Where things live

```
src/
  routes/            file-based routes. Each declares its own SEO metadata.
  pages/             page components, one folder per route
    <page>/sections/ page-local sections, used by exactly one page
  app/layout/        site shell — Header, Footer, SiteLayout, Wordmark
  components/
    common/          shared, composed of ui primitives (Section, Photo, PageHero…)
    ui/              primitives (Button, Field, Accordion, icons)
  content/           schemas + thin loaders over content/*.json. See below.
  lib/               cn, env, seo helpers
  styles/            globals.css (base + fonts) and theme.css (design tokens)
content/             CMS-editable copy and data — faqs/journey/services/
                     navigation.json, case-studies/*.json. Owner-facing.
public/admin/        Decap CMS — the /admin editing UI. See "Content editing".
brand/               logo masters from the client. Never referenced by the app.
public/brand/        derived web logo assets. Generated — do not hand-edit.
public/placeholders/ photography, in responsive variants. Generated.
scripts/             sitemap, brand assets, image resizing, content validation
.github/workflows/   CI: validate content → typecheck → build → deploy
.claude/skills/      the design system and conventions, in depth
```

**Copy lives in `src/content/`, not in components.** If you are editing words,
that is almost always where to go — but see "Content editing" below: most of
it is now sourced from `content/*.json`, editable without touching code.

---

## Content editing

The site owner edits copy at **`/admin`** (Decap CMS), without touching code,
git, or a terminal. Behind that form UI:

- Content lives in `content/*.json` and `content/case-studies/*.json`, not in
  `src/content/*.ts` anymore. `src/content/*.ts` now just imports that JSON,
  applies the type from `schemas.ts`, and re-exports it — same public shape
  as before, so no page or component changed.
- Saving in `/admin` commits to a draft on GitHub (`publish_mode:
  editorial_workflow` in `public/admin/config.yml`); the owner reviews and
  publishes from there.
- Publishing to `main` triggers `.github/workflows/deploy.yml`: it runs
  `npm run validate-content` (the Zod schemas in `schemas.ts`, checked
  against the actual JSON files — this is what stops a malformed edit, e.g. a
  real case study missing `publishedWithPermission`, from ever reaching
  the build), then `npm run typecheck`, then `npm run build`, then deploys
  `dist/client/` to HostAfrica over FTP. No manual zip/upload anymore.
- `src/content/placeholders.ts` is **not** CMS-editable — it's generated
  image config tied to `scripts/images.py`, not copy. Swapping a photo is
  still: run the script, update `alt`/`intrinsic`, PR as before.
- Case studies are a Decap "folder" collection (`content/case-studies/`, one
  JSON file per entry). A file with `illustrative: false` is treated as a
  real client engagement and **cannot build** without
  `publishedWithPermission: true` — see `caseStudySchema` in `schemas.ts`.

The owner logs in with **just an email and a password** (or Google/Microsoft)
— never a GitHub account. That's handled by
[DecapBridge](https://decapbridge.com), a hosted service built specifically
as a non-technical-editor-friendly replacement for Decap's Git Gateway
backend (Netlify Identity, the service Git Gateway traditionally relies on,
is deprecated). One-time setup (create a DecapBridge site pointed at this
repo, copy its generated backend config into `public/admin/config.yml`, add
FTP secrets, invite the owner's email from DecapBridge's dashboard) is in the
"Before launch" table below.

---

## Six things that will bite you

These are not style preferences. Each one has already caused a real bug here.

### 1. In the base layer, use the runtime role variables, not `--color-*`

Tailwind's theme variables (`--color-ink-strong`, `--color-accent`) are declared
**once** on `:root`, so their `var()` is substituted there and the result is
inherited. A `--color-*` reference inside `.on-navy` still resolves to the
`:root` colour.

```css
h2 { color: var(--color-ink-strong); }  /* navy text on a navy band */
h2 { color: var(--ink-strong); }        /* correct — re-resolves per surface */
```

This is why headings were once invisible on every navy band site-wide, and why
the focus ring failed contrast there. Utilities are fine — `@theme inline`
compiles them to the runtime variable already. Hand-written CSS is not.

### 2. `.on-navy` re-themes everything inside it

A navy band sets the class once and every token underneath flips — ink, border,
accent, danger, success. Components never need a navy variant.

Consequences worth remembering: inside `.on-navy`, `bg-surface` **is** navy, so
a card painted with it vanishes — use `bg-surface-sunken` for a raised panel.
And Gold Leaf is legal *only* here; on light grounds the accent token hands you
Gold Deep instead, which is deliberate (Gold Leaf fails contrast on white).

### 3. Navy is meant to be ~60% of the page

SPES-001 fixes the proportion. Home currently alternates
`parchment → navy → parchment → navy → white → navy → white → footer`, which is
50% including the footer. **Never place two navy bands adjacent** — they merge
into one mass and whatever sits between them stops reading as a distinct block.
The gold rule on top of the footer exists for exactly that reason.

### 4. `alt` and `note` are different fields, on purpose

In `src/content/placeholders.ts`, `alt` is user-facing (screen readers, search
engines) and describes **that file**; `note` is art direction for the
photographer and is never rendered. They used to be one field, which put review
notes into the alt attribute of every image — and went stale the moment files
moved between slots. **Re-check `alt` whenever you swap an image.**

### 5. The reversed logo artwork has an opaque navy ground

Not white-on-transparent. It is used *with* that ground because the navy is
`#1B2A4A`, byte-identical to `--seiran-navy`, so it composites invisibly on any
`.on-navy` band. **If the navy token ever changes, re-export those files** or a
seam appears. See `brand/README.md`.

### 6. Content is validated in development only

`src/content/*.ts` export plain typed data. Zod runs against them in
`src/content/validate.dev.ts`, loaded by a dynamic import in `src/router.tsx`
guarded on `import.meta.env.DEV` — so it is removed from production entirely.
TypeScript enforces the shape; Zod enforces the runtime rules a type cannot
express (`min(1)`, `endsWith("?")`, the literal that stops a case study being
published without permission). **A malformed entry fails on dev start, not in
CI** — so run the dev server before shipping content changes.

---

## Images

Photography ships at two widths per slot, sized to how each is actually
rendered, with `srcset` and `sizes`. The Insights thumbnails display at 112–128
CSS pixels; serving them 1600px files cost ~600 KB to paint three postage
stamps. Sizing to use took the image payload from 2010 KB to 638 KB.

To replace a photograph:

```bash
python scripts/images.py path/to/new.jpg heroAdvisory
```

Then update `intrinsic` and `alt` for that slot in `placeholders.ts`. The
`widths` there must match what the script wrote, and `sizes` must match the
column the image actually occupies — get it wrong and the browser over-fetches.

Fonts are declared face-by-face in `globals.css` for `latin` and `latin-ext`
only. Fontsource's `index.css` pulls seven subsets per family; the site serves
`en-KE` and needs two.

---

## Before launch

Everything here is blocked on the client, not on code. Each is marked
`OUTSTANDING` at its definition.

| Item | Where | Note |
|---|---|---|
| **Telephone number** | `content/navigation.json` | Supplied as `0180357040`. Kenya has no 018x mobile range — 07xx, or 010x/011x/015x. Almost certainly a transcription slip. Shipped exactly as given rather than guessed at. |
| **Enquiry endpoint** | `.env.example` | `VITE_ENQUIRY_ENDPOINT`. The form has nowhere to POST until this is set. Must validate server-side too. |
| **Newsletter endpoint** | `.env.example` | `VITE_NEWSLETTER_ENDPOINT`. While unset, a launch-state notice is **visible to every visitor**. Setting the variable removes it. |
| **Privacy policy** | `pages/contact/EnquiryForm.tsx` | The enquiry form should not go live collecting personal data without one. |
| **Final domain** | `lib/seo.ts`, `public/admin/config.yml` | `seiranpartners.co.ke` is a placeholder. Canonical URLs, every sitemap entry, and the CMS's `site_url` are built from it. |
| **FAQ answers** | `content/faqs.json` | Drafts, editable at `/admin`. Eleven questions, all emitted as FAQPage structured data, so they reach search results — get sign-off before publishing an edit. |
| **`--text-hero`** | `styles/theme.css` | A proposed extension to SPES-001 that every page hero depends on. Measurements and a one-line revert are documented at the token. |
| **`--seiran-green`** | `styles/theme.css` | `#2F4B3C`, found in the logo artwork. SPES-001 documents no green. Recorded, unused, needs sign-off. |
| **Photography** | `content/placeholders.ts` | Stand-ins. Every `note` is written as the brief for the real shoot. |
| **Facebook URL** | `content/navigation.json` | A `/share/` redirect rather than a canonical page URL. |
| **DecapBridge setup** | `public/admin/config.yml` | Create a site at decapbridge.com pointed at `SynthaHub/Seiren`, generate a GitHub token scoped to Contents (and Pull Requests, since `publish_mode: editorial_workflow`) read/write, paste DecapBridge's generated `backend.identity_url` (includes your site ID) in place of the placeholder. |
| **HostAfrica FTP secrets** | GitHub repo → Settings → Secrets → Actions | `HOSTAFRICA_FTP_HOST`, `HOSTAFRICA_FTP_USERNAME`, `HOSTAFRICA_FTP_PASSWORD`, `HOSTAFRICA_FTP_TARGET_DIR` must be set or `.github/workflows/deploy.yml` fails at the deploy step. Protocol is plain `ftp` — HostAfrica's FTPS timed out in testing. |
| **Invite the owner** | DecapBridge → Manage collaborators | Only step that needs the owner's involvement: they get an emailed invite, set a password (or use Google/Microsoft). No GitHub account, no git, no code. |

### Two standing rules

**No placeholder may be presented as a photograph of Eldaah Toi.** The founder
slot on `/team` uses a workspace interior, never a face. Alt text must never
name a real person unless the photograph is genuinely of them.

**No case study may be published without a real engagement and the client's
permission.** The three on `/case-studies` are illustrative and labelled as such
in three places; the page deliberately emits no `CaseStudy` structured data,
because that would put the claim into search results.

---

## Deeper reference

`.claude/skills/` holds the full design system — `hawi-design` (tokens, colour,
type, and the measured contrast for every pairing), `hawi-structure` (where
files go, what may import what, SEO), `hawi-components` and `hawi-data`. Read
`hawi-design/references/tokens.md` before choosing any colour or size. It is the
source of truth; this README is the map.
