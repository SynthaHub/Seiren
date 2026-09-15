/**
 * Validates content/*.json against the Zod schemas in src/content/schemas.ts.
 *
 * This is the real enforcement gate for CMS-authored content. Unlike
 * src/content/validate.dev.ts (which only runs in the Vite dev server and is
 * stripped from production entirely — see that file for why), this script
 * runs in CI on every push, reading the JSON files directly with `fs` rather
 * than through the app's build. A push that fails here does not deploy.
 *
 * Run manually with `npm run validate-content`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  faqSchema,
  journeyStageSchema,
  servicePillarSchema,
  caseStudySchema,
  illustrativeCaseStudySchema,
} from "../src/content/schemas";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(scriptDir, "../content");

function readJson(file: string): unknown {
  return JSON.parse(readFileSync(file, "utf-8"));
}

let ok = true;

function check(label: string, schema: z.ZodTypeAny, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    ok = false;
    console.error(`[content] ${label} failed validation:`);
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
  }
}

check(
  "faqs.json",
  z.object({ faqs: z.array(faqSchema) }),
  readJson(path.join(contentDir, "faqs.json")),
);

check(
  "journey.json",
  z.object({ stages: z.array(journeyStageSchema) }),
  readJson(path.join(contentDir, "journey.json")),
);

check(
  "services.json",
  z.object({ pillars: z.array(servicePillarSchema) }),
  readJson(path.join(contentDir, "services.json")),
);

const caseStudiesDir = path.join(contentDir, "case-studies");
for (const file of readdirSync(caseStudiesDir)) {
  if (!file.endsWith(".json")) continue;
  const data = readJson(path.join(caseStudiesDir, file));
  const schema =
    typeof data === "object" &&
    data !== null &&
    "illustrative" in data &&
    data.illustrative === true
      ? illustrativeCaseStudySchema
      : caseStudySchema;
  check(`case-studies/${file}`, schema, data);
}

if (!ok) {
  console.error("\nContent validation failed — see issues above.");
  process.exit(1);
}

console.log("Content validation passed.");
