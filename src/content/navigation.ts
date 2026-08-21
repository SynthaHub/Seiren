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
 * OUTSTANDING — brief §9. Seiran has not supplied these yet, and inventing them
 * would be worse than showing nothing. Each renders only once filled in.
 */
export const contactDetails = {
  email: null as string | null,
  telephone: null as string | null,
  whatsapp: null as string | null,
  linkedInCompany: null as string | null,
  linkedInFounder: "https://www.linkedin.com/in/eldaah-toi-pmp-63355bb0",
} as const;

export const officeAddress = {
  name: "Nairobi Garage",
  street: "Delta Corner Annex, Ring Rd Westlands Ln",
  locality: "Westlands, Nairobi",
  country: "Kenya",
} as const;
