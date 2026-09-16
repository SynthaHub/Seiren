import { z } from "zod";

/**
 * Content is validated at module load, so a malformed entry fails the build
 * rather than rendering as `undefined` on a live page.
 */

/**
 * A named service, paired with the question an owner-manager would actually
 * ask to describe it.
 *
 * The question is required, not optional. It is the whole point of the client's
 * September 2026 revision: "Business Operating Structure" means nothing to a
 * reader who has never bought consulting, while "How should the business be
 * organized and run?" is recognisably their own problem. Making it optional
 * would let a service ship as jargon alone, which is the state this replaced.
 */
export const serviceSchema = z.object({
  name: z.string().min(1),
  question: z.string().min(1).endsWith("?"),
});

export const servicePillarSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  services: z.array(serviceSchema).min(1),
});

export const journeyStageSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

/**
 * The six-part spine fixed by the brief. Shared by both kinds of case study.
 */
const caseStudyBody = {
  slug: z.string().min(1),
  title: z.string().min(1),
  sector: z.string().min(1),
  context: z.string().min(1),
  challenge: z.string().min(1),
  diagnosis: z.string().min(1),
  intervention: z.string().min(1),
  outcome: z.string().min(1),
  learning: z.string().min(1),
};

/**
 * A real engagement. Cannot be constructed without `publishedWithPermission`,
 * which the brief requires (§7) — the type is the enforcement.
 */
export const caseStudySchema = z.object({
  ...caseStudyBody,
  illustrative: z.literal(false),
  publishedWithPermission: z.literal(true),
});

/**
 * An illustrative scenario — a worked example of method, not a client.
 *
 * Kept as a separate type on purpose. The two can never be rendered by the same
 * code path by accident, and nothing typed as illustrative can be presented as
 * a real engagement without a compile error.
 *
 * Outcomes here are deliberately structural rather than numeric. Even labelled,
 * an invented "revenue up 40%" is the part a reader remembers as a claim.
 */
export const illustrativeCaseStudySchema = z.object({
  ...caseStudyBody,
  illustrative: z.literal(true),
});

export const insightSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.iso.datetime(),
  category: z.enum(["article", "research", "report", "guide", "founder-perspective"]),
  readingMinutes: z.number().int().positive(),
  author: z.string().min(1),
  image: z.string().optional(),
});

/**
 * Page-level "chrome" copy — hero, section intros, CTA labels — for pages
 * that used to hold this as hardcoded JSX. Deliberately narrow: computed
 * values (figures derived from other content), form microcopy, and anything
 * structurally tied to a schema's field names stay in code — see the plan
 * that introduced this for the reasoning per exclusion.
 */
const str = z.string().min(1);

const pageHeroSchema = z.object({
  eyebrow: str,
  title: str,
  lede: str,
});

export const homePageContentSchema = z.object({
  hero: z.object({
    eyebrow: str,
    headingAccent: str,
    headingLine1: str,
    headingLine2: str,
    body: str,
    primaryCtaLabel: str,
    primaryCtaHref: str,
    secondaryCtaLabel: str,
    secondaryCtaHref: str,
    statNumber: str,
    statLabel: str,
    statTitle: str,
    statCaption: str,
  }),
  about: z.object({
    eyebrow: str,
    heading: str,
    body: str,
    differentiators: z.array(str).length(3),
    ctaLabel: str,
    figureLabels: z.object({
      pillars: str,
      services: str,
      stages: str,
      leadConsultant: str,
    }),
  }),
  capabilityTicker: z.object({
    words: z.array(str).min(1),
    srHeading: str,
  }),
  pillars: z.object({
    eyebrow: str,
    heading: str,
    body: str,
    cardCtaLabel: str,
  }),
  process: z.object({
    eyebrow: str,
    heading: str,
    body: str,
    ctaLabel: str,
  }),
  getInTouch: z.object({
    eyebrow: str,
    heading: str,
    body: str,
    labelWhereWeAre: str,
    labelEmailUs: str,
    labelPhone: str,
    cardHeading: str,
    cardSubcopy: str,
  }),
  insightsPreview: z.object({
    eyebrow: str,
    heading: str,
    ctaLabel: str,
    featured: z.object({ title: str, excerpt: str, category: str }),
    posts: z.array(z.object({ title: str, category: str })).length(3),
    forthcomingLabel: str,
    authorName: str,
  }),
});

export const aboutPageContentSchema = z.object({
  hero: z.object({ eyebrow: str, title: str }),
  nameOrigin: z.object({
    eyebrow: str,
    heading: str,
    paragraphs: z.array(str).length(4),
  }),
  foundationsSection: z.object({ eyebrow: str, heading: str }),
  foundations: z.array(z.object({ heading: str, body: str })).length(3),
  whoWeWorkWith: z.object({
    eyebrow: str,
    heading: str,
    body: str,
    experienceLabel: str,
  }),
  sectors: z.array(str).min(1),
  cta: z.object({ heading: str, body: str }),
});

export const approachPageContentSchema = z.object({
  hero: pageHeroSchema,
  stageByStage: z.object({ eyebrow: str, heading: str }),
  quoteSection: z.object({ eyebrow: str, quote: str, body: str }),
  cta: z.object({ heading: str, body: str }),
});

export const teamPageContentSchema = z.object({
  hero: pageHeroSchema,
  founder: z.object({
    eyebrowLabel: str,
    name: str,
    title: str,
    bioParagraph1: str,
    bioParagraph2: str,
    linkedInLabel: str,
  }),
  differentiators: z.array(str).length(3),
  associates: z.object({
    eyebrow: str,
    heading: str,
    intro: str,
    areas: z.array(str).min(1),
    closing: str,
  }),
  cta: z.object({ heading: str, body: str }),
});

export const contactPageContentSchema = z.object({
  hero: pageHeroSchema,
  nextSteps: z.array(str).length(4),
  panelHeading: str,
  whatHappensNextHeading: str,
  faqSection: z.object({ eyebrow: str, heading: str }),
});

export const servicesPageContentSchema = z.object({
  hero: pageHeroSchema,
  exploreLabel: str,
  quoteSection: z.object({ eyebrow: str, quote: str, body: str }),
  cta: z.object({ heading: str, body: str }),
  pillarPage: z.object({
    heroEyebrow: str,
    fullListEyebrow: str,
    fullListHeadingTemplate: str,
    otherPillarsEyebrow: str,
    otherPillarsHeading: str,
    exploreLabel: str,
    ctaHeadingTemplate: str,
    ctaBody: str,
  }),
});

export const caseStudiesPageContentSchema = z.object({
  hero: pageHeroSchema,
  noticeBanner: z.object({
    boldLead: str,
    bodyIntro: str,
    permissionNote: str,
  }),
  methodSection: z.object({ eyebrow: str, heading: str, intro: str }),
  confidentialitySection: z.object({ eyebrow: str, quote: str, body: str }),
  cta: z.object({ heading: str, body: str }),
});

export const insightsPageContentSchema = z.object({
  hero: pageHeroSchema,
  forthcoming: z.array(z.object({ title: str, excerpt: str, category: str })).min(1),
  firstPublishedSection: z.object({ eyebrow: str, heading: str, intro: str }),
  notifyLinkLabel: str,
  notifySection: z.object({ eyebrow: str, heading: str, body: str }),
  finalCta: z.object({ heading: str, body: str, ctaLabel: str }),
});

export type HomePageContent = z.infer<typeof homePageContentSchema>;
export type AboutPageContent = z.infer<typeof aboutPageContentSchema>;
export type ApproachPageContent = z.infer<typeof approachPageContentSchema>;
export type TeamPageContent = z.infer<typeof teamPageContentSchema>;
export type ContactPageContent = z.infer<typeof contactPageContentSchema>;
export type ServicesPageContent = z.infer<typeof servicesPageContentSchema>;
export type CaseStudiesPageContent = z.infer<typeof caseStudiesPageContentSchema>;
export type InsightsPageContent = z.infer<typeof insightsPageContentSchema>;

export type Service = z.infer<typeof serviceSchema>;
export type ServicePillar = z.infer<typeof servicePillarSchema>;
export type JourneyStage = z.infer<typeof journeyStageSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type IllustrativeCaseStudy = z.infer<typeof illustrativeCaseStudySchema>;
export type Insight = z.infer<typeof insightSchema>;
