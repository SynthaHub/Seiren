import type { ServicePillar } from "./schemas";
import data from "../../content/services.json";

/**
 * The four advisory pillars.
 *
 * Every service carries the plain-English question it answers — see the
 * schema, which requires it so a service cannot ship as jargon alone. The
 * count is derived, never written down — see AboutSection, which computes it.
 *
 * Editable by the site owner via /admin (content/services.json). Shape is
 * checked at build time by `npm run validate-content`.
 */
export const servicePillars: ReadonlyArray<ServicePillar> = data.pillars;
