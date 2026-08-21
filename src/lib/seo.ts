/**
 * Metadata builders for every route.
 *
 * Centralised so no route can ship without a title, description, or canonical —
 * a page missing them is a page that cannot compete for a search it should win,
 * and the Insights hub is Seiran's long-term inbound channel.
 *
 * See .claude/skills/hawi-structure/references/seo.md.
 */

export const site = {
  name: "Seiran Partners",
  /** OUTSTANDING (SPES brief §9): final domain not yet confirmed by Seiran. */
  url: "https://seiranpartners.co.ke",
  description:
    "Seiran Partners helps owner-managed businesses in Kenya turn complexity into clarity, stronger execution and sustainable growth.",
  locale: "en_KE",
  /** Nairobi Garage, Delta Corner Annex — confirmed in the brief. */
  address: {
    street: "Delta Corner Annex, Ring Rd Westlands Ln",
    locality: "Nairobi",
    country: "KE",
  },
} as const;

export type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used to build the canonical URL. */
  path: string;
  /** Absolute or root-relative path to a 1200x630 image. */
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  /** Set on confirmation routes that should not be indexed. */
  noIndex?: boolean;
};

type MetaTag =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string };

/**
 * Returns a whole `head` fragment, not just meta, so the canonical link cannot
 * be forgotten at a call site.
 *
 * Canonical matters more here than usual: the prerenderer emits both `/services`
 * and `/services/`, so without it two URLs serve one page and split its ranking.
 */
export function seo(input: SeoInput): { meta: MetaTag[]; links: LinkTag[] } {
  return {
    meta: seoMeta(input),
    links: [{ rel: "canonical", href: canonicalUrl(input.path) }],
  };
}

type LinkTag = { rel: string; href: string };

export function seoMeta(input: SeoInput): MetaTag[] {
  const { title, description, image, type = "website", publishedAt, noIndex } = input;
  const canonical = canonicalUrl(input.path);
  const imageUrl = image ? absolute(image) : undefined;

  const tags: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
  ];

  if (imageUrl) {
    tags.push(
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // summary_large_image only renders if an image is actually present;
      // claiming it without one produces a broken-looking card.
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: imageUrl },
    );
  } else {
    tags.push({ name: "twitter:card", content: "summary" });
  }

  tags.push(
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  );

  if (publishedAt) {
    tags.push({ property: "article:published_time", content: publishedAt });
  }

  return tags;
}

export function canonicalUrl(path: string) {
  return absolute(path);
}

function absolute(path: string) {
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
}

/**
 * Organization + LocalBusiness, emitted once at the root.
 *
 * Seiran has a real, named Nairobi address, which most consultancies never put
 * into structured data. It is what makes a firm eligible for the local pack on
 * searches like "business advisory Nairobi".
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "Africa" },
    ],
    founder: {
      "@type": "Person",
      name: "Eldaah Toi",
      jobTitle: "Founder & Managing Consultant",
      sameAs: "https://www.linkedin.com/in/eldaah-toi-pmp-63355bb0",
    },
    knowsAbout: [
      "Strategy and growth",
      "Operations and business systems",
      "People and organization",
      "Business performance",
    ],
  };
}

/** FAQPage markup. The brief's eleven questions are genuine search queries. */
export function faqJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
