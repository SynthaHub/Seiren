import type { HomePageContent } from "../schemas";
import data from "../../../content/pages/home.json";

/**
 * Home page section chrome — hero, intros, CTA labels. Editable by the site
 * owner via /admin. Shape checked at build time by `npm run validate-content`
 * — see src/content/validate.dev.ts for why Zod never ships to the browser.
 */
export const homeContent: HomePageContent = data;
