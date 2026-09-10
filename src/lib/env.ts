/**
 * Public build-time configuration.
 *
 * Everything here ships to the browser and is readable by anyone. No secret,
 * API key or token ever goes in a VITE_ variable.
 *
 * These are NOT validated at runtime, deliberately. Vite substitutes each
 * `import.meta.env.VITE_*` with a string literal at build time, so the values a
 * visitor receives are fixed the moment the bundle is produced — re-checking
 * them in the browser cannot discover anything a check on the build machine
 * would have missed, and it put Zod into the chunk that every route loads.
 *
 * The schema still exists and still runs: see src/content/validate.dev.ts,
 * which is loaded only on a dev server. A bad endpoint therefore fails loudly
 * on `vite dev`, which is where it can actually be fixed.
 */
export type Env = {
  /**
   * Where the enquiry form POSTs.
   *
   * OUTSTANDING: a static site has no server of its own, so this needs to point
   * at a serverless function, a form service, or Sazara's backend. Whatever it
   * is must validate again server-side — client validation is a convenience for
   * the user, never a security boundary.
   */
  VITE_ENQUIRY_ENDPOINT?: string | undefined;

  /**
   * Where the newsletter capture POSTs. Kept separate from the enquiry
   * endpoint on purpose: a subscriber is not a lead, and merging them would put
   * people who wanted an article into the business development process without
   * asking. Until this is set the field is disabled with a visible reason.
   */
  VITE_NEWSLETTER_ENDPOINT?: string | undefined;
};

export const env: Env = {
  VITE_ENQUIRY_ENDPOINT: import.meta.env.VITE_ENQUIRY_ENDPOINT,
  VITE_NEWSLETTER_ENDPOINT: import.meta.env.VITE_NEWSLETTER_ENDPOINT,
};
