import { z } from "zod";
import { journeyStageSchema, type JourneyStage } from "./schemas";

/**
 * The Seiran Transformation Journey, from the content brief §5.
 *
 * This is the ONE place on the site where numbered markers are honest: the
 * stages are a real sequence and the order carries information. Numbering
 * anywhere else would be decoration borrowed from here, which is exactly what
 * would drain the meaning out of it.
 */
export const journeyStages: ReadonlyArray<JourneyStage> = z
  .array(journeyStageSchema)
  .parse([
    {
      name: "Understand",
      description:
        "Learn how the business actually works, not how the org chart says it does.",
    },
    {
      name: "Diagnose",
      description:
        "Identify what is genuinely holding growth back, and separate it from noise.",
    },
    {
      name: "Clarify",
      description:
        "Agree where the business is going and what it will stop doing to get there.",
    },
    {
      name: "Design",
      description:
        "Build the operating model, structure and systems the direction requires.",
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
  ]);
