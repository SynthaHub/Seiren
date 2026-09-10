import type { JourneyStage } from "./schemas";

/**
 * The Seiran Transformation Journey, from the content brief §5.
 *
 * This is the ONE place on the site where numbered markers are honest: the
 * stages are a real sequence and the order carries information. Numbering
 * anywhere else would be decoration borrowed from here, which is exactly what
 * would drain the meaning out of it.
 */
/**
 * Plain typed data. No Zod at runtime — see src/content/validate.dev.ts.
 *
 * This content is a literal in the bundle and cannot differ at runtime from
 * what it was at build time, so validating it in every visitor's browser buys
 * nothing. It also cost real bytes: the schema module was reachable from the
 * chunk that every route loads, so /about and /team shipped Zod for content
 * they only read. The type annotation below is what keeps the shape honest at
 * compile time; the runtime rules Zod adds are checked on every dev start.
 */
export const journeyStages: ReadonlyArray<JourneyStage> = [
    {
      name: "Understand",
      description:
        "Learn how the business actually works, not how the org chart says it does.",
    },
    {
      name: "Diagnose",
      description:
        "Identify what is really holding the business back, beyond the symptoms.",
    },
    {
      name: "Clarify",
      description:
        "Agree what needs to change, what matters most, and what success looks like.",
    },
    {
      name: "Design",
      description:
        "Develop the strategy, structure, systems and ways of working needed to move forward.",
    },
    {
      name: "Execute",
      description:
        "Put the work into practice alongside the team that has to live with it.",
    },
    {
      name: "Strengthen",
      description:
        "Build the internal capability so the change holds without us in the room.",
    },
    {
      name: "Transform",
      description: "The business runs differently — and keeps running differently.",
    },
];
