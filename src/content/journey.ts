import type { JourneyStage } from "./schemas";
import data from "../../content/journey.json";

/**
 * The Seiran Transformation Journey, from the content brief §5.
 *
 * This is the ONE place on the site where numbered markers are honest: the
 * stages are a real sequence and the order carries information. Numbering
 * anywhere else would be decoration borrowed from here, which is exactly what
 * would drain the meaning out of it.
 *
 * Editable by the site owner via /admin (content/journey.json) — the CMS
 * list widget preserves order. Shape is checked at build time by
 * `npm run validate-content`.
 */
export const journeyStages: ReadonlyArray<JourneyStage> = data.stages;
