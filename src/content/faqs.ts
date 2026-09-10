import type { Faq } from "./schemas";

/**
 * The eleven questions are fixed by the content brief §8.
 *
 * ⚠ THE ANSWERS BELOW ARE DRAFTS AND NEED SEIRAN'S SIGN-OFF.
 *
 * The brief specifies the questions but not the answers, and several of them
 * ask Seiran to commit to a policy — geography, remote working, whether one-off
 * consulting is offered. Each draft is grounded in something the brief actually
 * states (Kenya now and Africa long-term; Nairobi base; faith-based
 * organisations named as a served segment; "a report is not the finish line").
 * Where the brief is silent, the answer is written to be true and non-committal
 * rather than invented.
 *
 * These also become FAQPage structured data, so a wrong answer here can surface
 * directly in Google results. Confirm before launch.
 */
/**
 * Plain typed data. No Zod at runtime — see src/content/validate.dev.ts.
 *
 * This content is a literal in the bundle and cannot differ at runtime from
 * what it was at build time, so validating it in every visitor's browser buys
 * nothing. It also cost real bytes: the schema module was reachable from the
 * chunk that every route loads, so /about and /team shipped Zod for content
 * they only read. The type annotation below is what keeps the shape honest at
 * compile time; the runtime rules Zod adds are checked on every dev start.
 */
export const faqs: ReadonlyArray<Faq> = [
  {
    question: "Who does Seiran work with?",
    answer:
      "Owner-managed businesses and SMEs where the owner is still closely involved, and where growth or complexity has created a need for stronger structures and capability. Seiran also works with selected mission-driven and institutional organisations facing the same challenges.",
  },
  {
    question: "What types of businesses does Seiran support?",
    answer:
      "Seiran is defined by situation rather than sector. Current focus areas include retail, wholesale, food and hospitality, professional and business services, agribusiness, and private schools and education.",
  },
  {
    question: "Does Seiran work with faith-based organizations?",
    answer:
      "Yes. Churches, church-affiliated organisations, selected non-profits and other mission-driven organisations face the same strategic, operational and organisational questions as owner-managed businesses, and are a deliberate part of the practice.",
  },
  {
    question: "Does Seiran only work with businesses in Nairobi?",
    answer:
      "No. Seiran is based at Nairobi Garage, Spring Valley on General Mathenge Drive, and works with organisations across Kenya, with the intention of serving the wider African market over time.",
  },
  {
    question: "Does Seiran work remotely?",
    answer:
      "Yes, where the work allows it. Diagnostic and execution stages usually benefit from time on site with the team, so most engagements combine both.",
  },
  {
    question: "What kind of problems does Seiran help organizations address?",
    answer:
      "Growth that has outpaced the way the business is run: founder dependency, unclear structure and accountability, processes that no longer scale, and a lack of visibility over performance.",
  },
  {
    question: "Does Seiran only provide strategy?",
    answer:
      "No. Strategy is one of four pillars alongside operations and business systems, people and organisation, and business performance. Good strategy has to work in the real business, so the four are looked at together.",
  },
  {
    question: "How does an engagement begin?",
    answer:
      "With a conversation about your situation. If there is a fit, that is usually followed by a discovery and diagnostic stage before any structured engagement is proposed.",
  },
  {
    question: "Does Seiran work with management teams?",
    answer:
      "Yes. Work that only involves the owner tends not to hold. Building capability inside the team is what allows a change to survive without an adviser in the room.",
  },
  {
    question: "Does Seiran provide one-off consulting?",
    answer:
      "Focused pieces of work such as a diagnostic or a specific review are possible. But a report is not the finish line — the later stages, where change is executed and capability is built, are where most value is created.",
  },
  {
    question: "Does Seiran work outside Kenya?",
    answer:
      "Kenya is the primary market today. Seiran's longer-term intention is to serve owner-managed businesses across Africa, and enquiries from outside Kenya are welcome.",
  },
];
