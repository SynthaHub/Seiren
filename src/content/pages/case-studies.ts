import type { CaseStudiesPageContent } from "../schemas";
import data from "../../../content/pages/case-studies.json";

/**
 * Case studies page copy (chrome only — the scenarios themselves are
 * `src/content/case-studies.ts`). Editable via /admin.
 */
export const caseStudiesPageContent: CaseStudiesPageContent = data;
