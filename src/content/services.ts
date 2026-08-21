import { z } from "zod";
import { servicePillarSchema, type ServicePillar } from "./schemas";

/**
 * The four advisory pillars, verbatim from the Seiran content brief §5.
 *
 * The sub-services are the persuasion. This reader trusts a named list of
 * twenty-eight concrete services more than any value proposition, so they are
 * rendered in full rather than teased.
 */
export const servicePillars: ReadonlyArray<ServicePillar> = z
  .array(servicePillarSchema)
  .parse([
    {
      slug: "strategy-and-growth",
      title: "Strategy & Growth",
      summary:
        "Deciding where the business is going, and what it will stop doing to get there.",
      services: [
        "Strategic planning",
        "Growth strategy",
        "Market intelligence & research",
        "Competitive analysis",
        "Business model development",
        "Strategic positioning & prioritization",
        "Market expansion",
      ],
    },
    {
      slug: "operations-and-business-systems",
      title: "Operations & Business Systems",
      summary:
        "Building the systems that let the business run without the owner in every decision.",
      services: [
        "Operational diagnostics",
        "Operating model development",
        "Process improvement",
        "Standard Operating Procedures",
        "Operational efficiency & readiness",
        "Founder-dependency reduction",
      ],
    },
    {
      slug: "people-and-organization",
      title: "People & Organization",
      summary:
        "Getting the right structure, the right roles, and real accountability in place.",
      services: [
        "Organization design & structure",
        "Roles, responsibilities & accountability",
        "Performance management",
        "Leadership & team development",
        "Workforce planning & hiring strategy",
        "Founder transition",
      ],
    },
    {
      slug: "business-performance",
      title: "Business Performance",
      summary: "Knowing what is actually happening, early enough to act on it.",
      services: [
        "Business diagnostics",
        "KPI development",
        "Performance measurement & management reporting",
        "Business analytics",
        "Decision support",
      ],
    },
  ]);
