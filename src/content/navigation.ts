/**
 * Site navigation. Route paths are kebab-case and permanent — a URL that
 * changes after launch forfeits the accumulated ranking of every link to it.
 */

export type NavItem = {
  label: string;
  to: string;
};

export const primaryNav: ReadonlyArray<NavItem> = [
  { label: "Who We Are", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Approach", to: "/approach" },
  { label: "Team", to: "/team" },
  { label: "Insights", to: "/insights" },
  { label: "Case Studies", to: "/case-studies" },
];

export const footerNav: ReadonlyArray<{
  heading: string;
  items: ReadonlyArray<NavItem>;
}> = [
  {
    heading: "Advisory",
    items: [
      { label: "Strategy & Growth", to: "/services/strategy-and-growth" },
      {
        label: "Operations & Business Systems",
        to: "/services/operations-and-business-systems",
      },
      { label: "People & Organization", to: "/services/people-and-organization" },
      { label: "Business Performance", to: "/services/business-performance" },
    ],
  },
  {
    heading: "Firm",
    items: [
      { label: "Who We Are", to: "/about" },
      { label: "Our Approach", to: "/approach" },
      { label: "Team", to: "/team" },
    ],
  },
  {
    heading: "Thinking",
    items: [
      { label: "Insights", to: "/insights" },
      { label: "Case Studies", to: "/case-studies" },
    ],
  },
];

/**
 * Contact points. Each renders only once it has a value, so an outstanding
 * item tightens the layout rather than showing an empty label.
 *
 * Social URLs are stored CANONICAL — no share tokens, no campaign parameters.
 * The links supplied by the client carried `utm_source=qr`, Instagram's `stkn`
 * and TikTok's `_t`/`_r`, which are tied to the sharing session rather than to
 * the profile. Shipping those would put a personal share token in public HTML
 * on every page and would rot as soon as the token expired.
 *
 * ⚠ `telephone` is exactly as supplied and needs confirming before launch —
 * see the note on the constant itself.
 */
export const contactDetails = {
  email: null as string | null,

  /** OUTSTANDING VERIFICATION — supplied as "0180357040".
   *  Kenyan mobile numbers are ten digits on 07xx, or 010x/011x/015x. There is
   *  no 018x range in the current KE numbering plan, so this is very likely a
   *  transcription slip. Left exactly as supplied rather than "corrected" to a
   *  guess, because a wrong phone number on a lead-generation site is worse
   *  than none. Confirm, then set `telephoneE164` to match. */
  telephone: "0180357040" as string | null,
  /** International form used for the `tel:` href, so the number dials from
   *  outside Kenya. Derived from `telephone`; re-derive if that changes. */
  telephoneE164: "+254180357040" as string | null,

  whatsapp: null as string | null,

  linkedInCompany: "https://www.linkedin.com/company/seiran-partners/",
  linkedInFounder: "https://www.linkedin.com/in/eldaah-toi-pmp-63355bb0",
  instagram: "https://www.instagram.com/seiranpartners",
  tiktok: "https://www.tiktok.com/@seiran.partners",
  /** Supplied as a /share/ redirect rather than a canonical page URL. It
   *  resolves today, but a canonical `facebook.com/<page>` URL is more durable
   *  and is worth swapping in when available. */
  facebook: "https://www.facebook.com/share/1BkvTgN5U2/",
} as const;

export const officeAddress = {
  name: "Nairobi Garage",
  street: "Spring Valley, The Promenade, General Mathenge Drive",
  locality: "Nairobi",
  country: "Kenya",
} as const;
