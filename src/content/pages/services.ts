import type { ServicesPageContent } from "../schemas";
import data from "../../../content/pages/services.json";

/**
 * Services + pillar-detail page copy (chrome only — pillar data itself is
 * `src/content/services.ts`). Editable via /admin.
 */
export const servicesPageContent: ServicesPageContent = data;
