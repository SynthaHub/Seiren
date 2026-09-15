import type { CaseStudy, IllustrativeCaseStudy } from "./schemas";

/**
 * Case studies live one-JSON-file-per-entry under content/case-studies/, as a
 * Decap "folder" collection — the natural repeating-item UX, and where the
 * owner adds new entries from /admin.
 *
 * ⚠ Two rules enforced by the schema, not just the editor's judgement:
 *
 * 1. A REAL engagement (`illustrative: false`) cannot validate without
 *    `publishedWithPermission: true` — see caseStudySchema. This is the
 *    build-time gate (`npm run validate-content`); the CMS checkbox is a
 *    prompt, the schema is the enforcement.
 * 2. Illustrative scenarios must name no real organisation and no numeric
 *    outcome. That is an editorial rule, not a machine-checkable one — the
 *    hint text in the CMS config repeats it at the point of entry.
 */
const modules = import.meta.glob<{
  default: (IllustrativeCaseStudy | CaseStudy) & { illustrative: boolean };
}>("../../content/case-studies/*.json", { eager: true });

const all = Object.values(modules).map((mod) => mod.default);

export const illustrativeCaseStudies: ReadonlyArray<IllustrativeCaseStudy> = all.filter(
  (entry): entry is IllustrativeCaseStudy => entry.illustrative === true,
);

/**
 * Real engagements, published with client permission. Empty until a client
 * agrees — brief §7 — and enforced by the schema, not just by this being
 * empty in code as it used to be.
 */
export const caseStudies: ReadonlyArray<CaseStudy> = all.filter(
  (entry): entry is CaseStudy => entry.illustrative === false,
);
