# SEO and rendering

The Insights hub is Seiran's long-term inbound channel. Everything here exists to make sure
content that deserves to rank can.

## The rendering problem - read this first

A plain Vite React SPA ships an empty `<div id="root">` and builds the page in JavaScript. For
an application behind a login that is entirely fine. For a public marketing and content site it
is a real handicap:

- Google renders JavaScript, but on a deferred second pass, so indexing is slower and less
  reliable than for server-rendered HTML.
- **LinkedIn, WhatsApp, and X do not run JavaScript at all.** They read the raw HTML for OG
  tags. LinkedIn is the primary distribution channel for this audience - so on a pure SPA,
  every shared article shows the same generic title and no image, regardless of what the route
  sets at runtime.
- AI crawlers and search summarisers largely read raw HTML too, and that traffic is growing.
- First paint waits for the JS bundle, which matters on Kenyan mobile networks.

**The fix is prerendering, and it is a build-time change, not an architecture rewrite.** Add
`vite-react-ssg` or `vike` and the same React components emit static HTML per route at build
time. Same code, same components, same routing model - each page just ships real HTML with real
meta tags, then hydrates. For a site of eight pages plus articles this is the right answer, and
it is far cheaper to add now than to retrofit after launch.

If prerendering is not adopted, everything else on this page still applies, but expect weaker
indexing and broken link previews on social - and say so plainly rather than shipping quietly.

## Per-route metadata

Every route declares these. A missing description means Google writes its own from page text,
usually badly.

| Tag | Rule |
|---|---|
| `<title>` | 50-60 chars. Unique per page. Specific first, brand last: `Operations & Business Systems | Seiran Partners` |
| `meta description` | 140-160 chars. Written for a human deciding whether to click, not stuffed with keywords |
| `canonical` | Absolute URL. Prevents duplicate-content splits from query params |
| `og:title` / `og:description` / `og:image` | Image 1200x630. Without it, LinkedIn shows a bare grey box |
| `og:type` | `website`, or `article` on insights |
| `twitter:card` | `summary_large_image` |
| `robots` | `index, follow` - except on any thank-you or confirmation route |

Centralise the defaults in `src/lib/seo.ts` so no route can forget one, and let routes override.

## Structured data (JSON-LD)

Seiran has an advantage most consultancies do not use: a real, named Nairobi address.

- **Organization** + **LocalBusiness** at the root - legal name, logo, `address` (Nairobi
  Garage, Delta Corner Annex, Ring Rd Westlands Ln), `areaServed` Kenya, `sameAs` linking the
  LinkedIn company page. This is what puts a firm in the local pack.
- **ProfessionalService** on each of the four service pillar pages.
- **Article** on each insight - `headline`, `datePublished`, `author`, `image`.
- **FAQPage** on the Contact page, built from `content/faqs.ts`. The eleven FAQs in the brief
  are unusually well suited to this: they are real questions people type, and FAQ markup can
  surface them directly in results.
- **BreadcrumbList** on nested routes.

Generate these from the same typed content that renders the page, never as a hand-maintained
second copy - a hand-copied duplicate drifts, and structured data that contradicts the visible
page is worse than none.

## Headings

One `<h1>` per page, and it says what the page is about in the words a reader would use.
Headings descend without skipping levels. Never pick a heading level for its size - that is
what the type scale is for. Screen readers and crawlers both navigate by heading structure, so
this is one of the few places accessibility and SEO are the same work.

## URLs

Kebab-case, descriptive, permanent: `/services/people-and-organization`, not `/services/3`.
Decide once, before launch. A changed URL forfeits every link and every ranking pointing at the
old one, and 301s only recover part of it.

## Sitemap and robots

`sitemap.xml` generated at build from the route tree so it cannot fall behind. `robots.txt`
allowing everything except any confirmation routes, and pointing at the sitemap. Submit to
Google Search Console at launch - it is the only place you find out that indexing is failing.

## Performance, because it is ranking

- Hero image `loading="eager"` with explicit dimensions; everything below the fold `lazy`.
- Every image sized and served as WebP/AVIF. One unoptimised photo undoes every other decision.
- Self-host fonts with `font-display: swap` and preload the display face. Third-party font CDNs
  add a DNS lookup and a connection on the critical path.
- Explicit `width`/`height` or aspect-ratio boxes on all media, so the page does not reflow as
  images land.
- Route-level code splitting; the Insights article bundle should not load on the homepage.

Target Core Web Vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms - measured on a mid-range
Android on 4G, not on a desktop over office wifi. That is the device most Kenyan visitors will
use.

## Content

The five seed questions in the brief - how owner-managed businesses prepare for growth, when a
business has outgrown its operating model, reducing founder dependency, what systems to build
before scaling, gaining visibility of performance - are genuine long-tail search queries with
low competition and high intent. Each is worth a page targeting that question directly, with
the question as the `h1` and a direct answer in the first paragraph.

That is the whole SEO strategy for a firm this size: answer the questions your clients actually
type, better than anyone else has. Keyword density is not a factor and has not been for years.
