---
name: hawi-structure
description: Where every file in the Seiran Partners site goes and what is allowed to import what - routes, pages, sections, content, components, and the SEO metadata every route must declare. Use this skill BEFORE creating any new file, folder, page, route, or section, and whenever deciding where code belongs, whether something is shared or page-local, how to name a file, or how to split a file that has grown. Also trigger on refactoring, moving files, "where should this go", "how should I organise this", adding a page, circular import errors, sitemap, or any question about the project's architecture.
---

# Project Structure

Vite 8 + React 19 + TypeScript 7 + Tailwind v4 + TanStack Router. This is a marketing and
thought-leadership site for **Seiran Partners** - eight top-level pages, an Insights hub that
grows over time, and one enquiry form that is the site's whole commercial purpose.

That shape drives everything below. This is not an application with a persistent shell and
dense data screens; it is a set of composed, mostly-static pages where **page weight, SEO, and
the path to the enquiry form** are the things worth optimising for.

## The tree

```
src/
├── main.tsx                 entry - mounts <App/>, nothing else
├── app/
│   ├── App.tsx              router + providers
│   ├── providers.tsx        QueryClient, error boundary
│   └── layout/              SiteLayout, Header, Footer, SkipLink, MobileNav
├── routes/                  TanStack Router file routes - THIN files only
│   ├── __root.tsx           SiteLayout, global meta defaults
│   ├── index.tsx            /
│   ├── about.tsx            /about
│   ├── services/
│   │   ├── index.tsx        /services
│   │   └── $pillar.tsx      /services/strategy-and-growth
│   ├── approach.tsx         /approach
│   ├── team.tsx             /team
│   ├── insights/
│   │   ├── index.tsx        /insights          (list + category filter)
│   │   └── $slug.tsx        /insights/:slug
│   ├── case-studies.tsx     /case-studies      (launches empty by design)
│   └── contact.tsx          /contact
├── pages/                   one folder per page; the sections it is built from
│   ├── home/
│   │   ├── HomePage.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ProblemSection.tsx
│   │       ├── ServicesOverviewSection.tsx
│   │       └── CtaSection.tsx
│   ├── about/
│   ├── services/
│   ├── approach/
│   ├── team/
│   ├── insights/
│   ├── case-studies/
│   └── contact/
│       ├── ContactPage.tsx
│       └── EnquiryForm.tsx
├── components/
│   ├── ui/                  primitives: Button, Input, Select, Accordion, Card
│   └── common/              composed, page-agnostic: Section, PageHeader, Prose,
│                            EmptyState, InsightCard, Seo
├── content/                 the site's actual content, versioned with the code
│   ├── insights/            MDX articles
│   ├── services.ts          the four pillars and their sub-services
│   ├── faqs.ts              the eleven FAQs from the brief
│   ├── team.ts              founder profile, associate network
│   └── schemas.ts           Zod schemas validating all of the above
├── hooks/
├── lib/
│   ├── cn.ts
│   ├── env.ts
│   ├── seo.ts               canonical URL, OG defaults, JSON-LD builders
│   └── format.ts
├── styles/
│   ├── globals.css
│   └── theme.css            the @theme token block
└── types/
```

## Routes are thin, pages are composed, sections are page-local

Three layers with one job each. Collapsing them is what turns a marketing site into a single
900-line `Home.tsx` that nobody wants to touch.

**Route file** - declares the URL, its search-param schema, its metadata, and renders one page
component. No layout, no content, no business logic.

```tsx
// routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/about/AboutPage";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: seo({
      title: "Who We Are | Seiran Partners",
      description:
        "Seiran helps owner-managed businesses in Kenya move from complexity to clarity.",
    }),
  }),
});
```

**Page component** - orders the sections and passes them content. It should read like the page
outline in the brief, which means anyone can check the page against the brief without reading
any implementation:

```tsx
export function AboutPage() {
  return (
    <>
      <MeaningSection />
      <PurposeVisionMissionSection />
      <BrandStorySection />
      <PhilosophySection />
      <CtaSection />
    </>
  );
}
```

**Section component** - one region of one page, owning its own layout and copy. Lives in that
page's `sections/` folder and stays there until a second page genuinely needs it.

## Import rules

```
routes  ->  pages  ->  components/common, components/ui, content, hooks, lib
```

**1. A page never imports another page's sections.** If Home and Services both need a services
grid, it moves to `components/common` and takes its content as props. Reaching across pages is
how a change to Home silently breaks Services.

**2. `components/`, `hooks/`, and `lib/` never import from `pages/` or `content/`.** If a
component needs to know what a service pillar is, it takes it as a prop. This one rule prevents
almost every circular import.

**3. Content is data, not markup.** The four service pillars, the eleven FAQs, the seven journey
stages, and the team profiles live in `content/` as typed data, validated by Zod. They are
rendered by components that do not know what they contain. When Seiran rewords a pillar, that
is a one-line content edit, not a hunt through JSX.

**4. Use the `@/` alias for anything outside the current folder.** Relative paths for siblings
(`./HeroSection`) are fine; `../../../lib/cn` is not.

## Every route declares its SEO metadata

This is not optional on this site, and it is not a launch-week task. The Insights hub is
Seiran's long-term inbound channel, and a page with no title or description is a page that
cannot compete for a search it should win.

Every route declares `title`, `description`, and `canonical`. Insight articles additionally
declare `og:image`, `article:published_time`, and Article JSON-LD. The site declares
Organization and LocalBusiness JSON-LD once, at the root - Seiran has a physical Nairobi
address, which is exactly what LocalBusiness structured data is for and a real advantage for
"business advisory Nairobi" style searches.

See [references/seo.md](references/seo.md) before adding any route.

## When something is shared

**Page-local until a second page needs it**, then promote to `components/common` and strip the
page-specific parts out. Premature sharing costs more than duplication, because a section
pulled toward two pages grows a prop for each and stops being editable safely.

When promoting, the component must lose its content. `HomeServicesGrid` becomes `ServicesGrid`
taking `pillars` as a prop. If it cannot be separated from its copy, it was not shared.

## Naming

| Kind | Convention | Example |
|---|---|---|
| Component file | PascalCase, matches the export | `HeroSection.tsx` |
| Section | `<Purpose>Section` | `ProblemSection.tsx` |
| Page | `<Name>Page` | `AboutPage.tsx` |
| Hook | camelCase, `use` prefix | `useMediaQuery.ts` |
| Other module | kebab-case | `api-client.ts`, `seo.ts` |
| Content module | kebab-case, plural | `services.ts`, `faqs.ts` |
| Type | PascalCase, no `I` prefix | `ServicePillar` |
| Boolean | `is` / `has` / `can` | `isSubmitting` |
| Handler prop / impl | `on*` / `handle*` | `onSubmit` / `handleSubmit` |

Route paths are kebab-case and permanent. `/case-studies`, `/services/strategy-and-growth`.
A URL that changes after launch costs the accumulated search ranking of every link to it, so
decide the slug once and treat it as an API.

## Adding a page

1. `src/pages/<name>/<Name>Page.tsx` plus a `sections/` folder.
2. Build each section against `hawi-design` tokens - never invent values.
3. Thin route file in `src/routes/` with full SEO metadata.
4. Add it to the header nav, the footer nav, and the sitemap.
5. Check it at 320, 375, 768, 1280; tab through it; confirm one `h1`.

## One export per file

A component file exports one component and optionally its props type. No nested barrel
`index.ts` files - they defeat tree-shaking, hide where symbols live, and create import cycles
that are miserable to trace.

## Read next

- [references/conventions.md](references/conventions.md) - TypeScript rules, tsconfig, env vars,
  React 19 specifics, import order.
- [references/seo.md](references/seo.md) - metadata, structured data, sitemap, and the
  rendering problem a client-side SPA has on a content site. Read before building any route.
