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

/** Fixed by the brief: every case study follows this spine, or it is not published. */
export const caseStudySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  context: z.string().min(1),
  challenge: z.string().min(1),
  diagnosis: z.string().min(1),
  intervention: z.string().min(1),
  outcome: z.string().min(1),
  learning: z.string().min(1),
  publishedWithPermission: z.literal(true),
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
export type Insight = z.infer<typeof insightSchema>;
