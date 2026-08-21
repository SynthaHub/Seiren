import { z } from "zod";

/**
 * Validated once at startup, so a missing variable fails immediately with a
 * clear message instead of surfacing as `undefined` inside a fetch URL an hour
 * later.
 *
 * Everything here ships to the browser and is readable by anyone. No secret,
 * API key or token ever goes in a VITE_ variable.
 */
const schema = z.object({
  /**
   * Where the enquiry form POSTs.
   *
   * OUTSTANDING: a static site has no server of its own, so this needs to point
   * at a serverless function, a form service, or Sazara's backend. Whatever it
   * is must validate again server-side — client validation is a convenience for
   * the user, never a security boundary.
   */
  VITE_ENQUIRY_ENDPOINT: z.url().optional(),

  /**
   * Where the newsletter capture POSTs. Kept separate from the enquiry
   * endpoint on purpose: a subscriber is not a lead, and merging them would put
   * people who wanted an article into the business development process without
   * asking. Until this is set the field is disabled with a visible reason.
   */
  VITE_NEWSLETTER_ENDPOINT: z.url().optional(),
});

export const env = schema.parse(import.meta.env);
