import { z } from "zod";

/**
 * Content is validated at module load, so a malformed entry fails the build
 * rather than rendering as `undefined` on a live page.
 */

export const servicePillarSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  services: z.array(z.string().min(1)).min(1),
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

export type ServicePillar = z.infer<typeof servicePillarSchema>;
export type JourneyStage = z.infer<typeof journeyStageSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type IllustrativeCaseStudy = z.infer<typeof illustrativeCaseStudySchema>;
export type Insight = z.infer<typeof insightSchema>;
