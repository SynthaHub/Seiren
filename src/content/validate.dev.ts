import { z } from "zod";
import {
  servicePillarSchema,
  journeyStageSchema,
  illustrativeCaseStudySchema,
  caseStudySchema,
  faqSchema,
} from "./schemas";
import { servicePillars } from "./services";
import { journeyStages } from "./journey";
import { illustrativeCaseStudies, caseStudies } from "./case-studies";
import { faqs } from "./faqs";

/**
 * Runtime validation of the content files — DEVELOPMENT ONLY.
 *
 * This module is loaded by a dynamic import guarded on `import.meta.env.DEV`
 * (see src/router.tsx). Vite replaces that flag with a literal `false` in a
 * production build, Rollup drops the branch, and the whole module — along with
 * Zod and every content schema — never reaches a visitor.
 *
 * WHY IT IS SEPARATE. The content files used to call `.parse()` themselves,
 * which meant they imported the schema module, which meant Zod was reachable
 * from the chunk every route loads. /about and /team were shipping a validation
 * library to re-check data that is a hard-coded literal in the same bundle.
 * TypeScript already enforces the SHAPE of that data at compile time; what Zod
 * adds is the runtime rules a type cannot express — `min(1)` on a string,
 * `endsWith("?")` on a service question, the `z.literal(true)` that stops a
 * case study being published without permission. Those are worth checking, but
 * they are worth checking once on a developer's machine, not on every visit.
 *
 * A failure here throws on dev-server start, which is loud and immediate —
 * exactly the moment a malformed entry should be caught.
 */
function check(label: string, schema: z.ZodTypeAny, data: unknown) {
  const result = z.array(schema).safeParse(data);
  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(`[content] ${label} failed validation`, result.error.issues);
    throw new Error(
      `Content validation failed for ${label} — see the issues logged above.`,
    );
  }
}

check("servicePillars", servicePillarSchema, servicePillars);
check("journeyStages", journeyStageSchema, journeyStages);
check("illustrativeCaseStudies", illustrativeCaseStudySchema, illustrativeCaseStudies);
check("caseStudies", caseStudySchema, caseStudies);
check("faqs", faqSchema, faqs);

/**
 * Environment variables, for the same reason and by the same route.
 *
 * Vite substitutes each `import.meta.env.VITE_*` with a string literal at build
 * time, so what a visitor receives is fixed when the bundle is produced. This
 * check therefore belongs on the build machine, not in the browser — and
 * keeping it here is what lets src/lib/env.ts stay free of Zod, which matters
 * because env is imported by components on every page.
 */
const envSchema = z.object({
  VITE_ENQUIRY_ENDPOINT: z.url().optional(),
  VITE_NEWSLETTER_ENDPOINT: z.url().optional(),
});

const envResult = envSchema.safeParse(import.meta.env);
if (!envResult.success) {
  // eslint-disable-next-line no-console
  console.error("[env] invalid configuration", envResult.error.issues);
  throw new Error("Environment validation failed — see the issues logged above.");
}
