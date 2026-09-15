import type { Faq } from "./schemas";
import data from "../../content/faqs.json";

/**
 * ⚠ THE ANSWERS ARE DRAFTS AND NEED SEIRAN'S SIGN-OFF.
 *
 * These also become FAQPage structured data, so a wrong answer here can
 * surface directly in Google results. Confirm before launch.
 *
 * Editable by the site owner via /admin (content/faqs.json). Shape is
 * checked at build time by `npm run validate-content`, not at runtime —
 * see src/content/validate.dev.ts for why Zod never ships to the browser.
 */
export const faqs: ReadonlyArray<Faq> = data.faqs;
