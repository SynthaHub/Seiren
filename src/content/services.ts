import type { ServicePillar } from "./schemas";

/**
 * The four advisory pillars.
 *
 * Rewritten on the client's review (September 2026). Two things changed, and
 * both matter more than they look:
 *
 * 1. **Every service now carries the plain-English question it answers.** The
 *    reader is an owner-manager, not a procurement team. "Business Operating
 *    Structure" is a line item they have to decode; "How should the business be
 *    organized and run?" is a question they have already asked themselves. The
 *    question is what makes a list of twenty-seven services persuasive rather
 *    than intimidating, and the schema requires it so a service cannot ship as
 *    jargon alone.
 *
 * 2. **The lists themselves were revised and extended** — Operations and
 *    Strategy each gained services the practice actually offers, and several
 *    names were plainer language for the same work.
 *
 * The sub-services are the persuasion. This reader trusts a named list of
 * concrete services more than any value proposition, so they are rendered in
 * full rather than teased. The count is derived, never written down — see
 * AboutSection, which computes it.
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
export const servicePillars: ReadonlyArray<ServicePillar> = [
    {
      slug: "strategy-and-growth",
      title: "Strategy & Growth",
      summary:
        "Deciding where the business is going — and what it needs to stop doing to get there.",
      services: [
        { name: "Strategic Planning", question: "Where are we going?" },
        { name: "Growth Strategy", question: "How can we grow?" },
        {
          name: "Market Research & Insights",
          question: "What is happening in our market?",
        },
        {
          name: "Competitor & Market Analysis",
          question: "Where do we stand against the competition?",
        },
        {
          name: "Business Model Design",
          question: "Does the way we operate and make money still work?",
        },
        {
          name: "Strategic Focus & Positioning",
          question: "What should we focus on and be known for?",
        },
        { name: "Market Expansion", question: "Where else can we grow?" },
        {
          name: "Strategy Execution",
          question: "How do we turn the strategy into action?",
        },
      ],
    },
    {
      slug: "operations-and-business-systems",
      title: "Operations & Business Systems",
      summary:
        "Building the systems and ways of working that help the business run well without the owner having to manage everything.",
      services: [
        {
          name: "Business Operations Review",
          question: "What’s not working in the way the business runs?",
        },
        {
          name: "Business Operating Structure",
          question: "How should the business be organized and run?",
        },
        {
          name: "Process Improvement",
          question: "How can we make the way we work simpler and better?",
        },
        {
          name: "Standard Operating Procedures (SOPs)",
          question: "How should important work be done consistently?",
        },
        {
          name: "Management Systems",
          question: "How will we keep track of the business and make better decisions?",
        },
        {
          name: "Business Systems & Technology",
          question: "Do we have the right systems to support how the business works?",
        },
        {
          name: "Operational Efficiency & Growth Readiness",
          question: "Can the business handle growth without everything becoming harder?",
        },
        {
          name: "Reducing Owner Dependency",
          question: "How do we stop everything depending on the owner?",
        },
      ],
    },
    {
      slug: "people-and-organization",
      title: "People & Organization",
      summary:
        "Getting the right structure, the right roles, and real accountability in place.",
      services: [
        {
          name: "Organization Structure",
          question: "Is the business structured in the right way for where it is going?",
        },
        {
          name: "Roles, Responsibilities & Accountability",
          question:
            "Who is responsible for what, and who is accountable for getting it done?",
        },
        {
          name: "Performance Management",
          question:
            "How do we set clear expectations, track performance and address gaps?",
        },
        {
          name: "Leadership & Team Development",
          question:
            "How do we build leaders and teams that can perform with greater independence?",
        },
        {
          name: "Workforce & Hiring Planning",
          question:
            "Who do we need, when do we need them, and what should they be responsible for?",
        },
        {
          name: "Founder & Leadership Transition",
          question:
            "How can the business continue to thrive as the founder’s role changes?",
        },
      ],
    },
    {
      slug: "business-performance",
      title: "Business Performance",
      summary: "Knowing what is actually happening, early enough to act on it.",
      services: [
        {
          name: "Business Performance Review",
          question: "What is really happening in the business?",
        },
        {
          name: "Performance Measures",
          question: "What should we measure to know if the business is doing well?",
        },
        {
          name: "Performance Reporting",
          question:
            "How do we track performance and know when something needs attention?",
        },
        { name: "Business Insights", question: "What do our business numbers tell us?" },
        {
          name: "Better Business Decisions",
          question: "How do we use the right information to make better decisions?",
        },
      ],
    },
];
