import { z } from "zod";
import { illustrativeCaseStudySchema, type IllustrativeCaseStudy } from "./schemas";

/**
 * Illustrative scenarios — worked examples of method, not client engagements.
 *
 * ⚠ NONE OF THESE IS A REAL CLIENT. They must always be presented as
 * illustrative, and the page that renders them carries a standing notice
 * saying so. The type system enforces the distinction: these are
 * `IllustrativeCaseStudy`, real engagements are `CaseStudy`, and the two cannot
 * be rendered through the same path without a compile error.
 *
 * This is the honest form of what a new practice can publish. It shows how
 * Seiran thinks — which is the actual question a prospective client has —
 * without claiming a track record that does not exist yet. The moment a real
 * engagement is cleared for publication (brief §7), it goes in `caseStudies`
 * and these move below it or come down.
 *
 * Two rules held while writing them:
 *
 * 1. **No named or identifiable organisations.** Sector and rough size only.
 * 2. **No numeric outcomes.** Even labelled illustrative, an invented
 *    "revenue up 40%" is the part a reader remembers as a claim. Outcomes here
 *    describe what changes structurally, which is both truer to the work and
 *    not mistakable for a result.
 */
export const illustrativeCaseStudies: ReadonlyArray<IllustrativeCaseStudy> = z
  .array(illustrativeCaseStudySchema)
  .parse([
    {
      slug: "founder-dependency-wholesale",
      title: "When every decision still routes through the owner",
      sector: "Wholesale distribution · around 60 staff",
      illustrative: true,
      context:
        "A wholesale distributor that had grown from a single depot to three in six years. The owner still approved every purchase order, every price exception and every hire.",
      challenge:
        "Growth had stalled without an obvious cause. Depot managers escalated routine decisions, and the owner was working evenings to clear a queue that regenerated daily.",
      diagnosis:
        "The constraint was not capacity but authority. No decision rights had ever been written down, so managers escalated everything rather than risk being wrong. The problem presented as workload; it was a governance gap.",
      intervention:
        "Decision rights defined and documented by role, with thresholds above which an exception genuinely needs the owner. Standard operating procedures written for the three processes that generated most escalations. A weekly management meeting replaced ad-hoc approval requests.",
      outcome:
        "Routine purchasing, pricing within band and first-line hiring move to depot managers. The owner's queue reduces to genuine exceptions, and the business can open a fourth depot without adding to it.",
      learning:
        "Delegation fails without decision rights. Telling managers to 'take more ownership' does nothing while the rules for being wrong are unwritten.",
    },
    {
      slug: "outgrown-operating-model-hospitality",
      title: "A structure built for a business that no longer exists",
      sector: "Food and hospitality · multi-site",
      illustrative: true,
      context:
        "A restaurant group that opened its fourth site while still running the management structure designed for its first.",
      challenge:
        "Quality and cost control varied site to site. Head office had grown by adding people to existing roles rather than by redesigning them, and accountability for outcomes was genuinely unclear.",
      diagnosis:
        "The operating model, not the team. Roles had accumulated responsibilities rather than being defined against what a four-site group needs, so several functions had two owners and one had none.",
      intervention:
        "Operating model redesigned around what the group actually does now. Roles, responsibilities and accountability restated. A short set of operational standards agreed with site managers rather than issued to them.",
      outcome:
        "Each function has one accountable owner. Site managers work to standards they helped set, and head office reviews exceptions rather than approving routine decisions.",
      learning:
        "Organisations rarely redesign structure; they add to it. The question is not who is underperforming but whether the structure still matches the business.",
    },
    {
      slug: "performance-visibility-agribusiness",
      title: "Finding out about problems too late to act on them",
      sector: "Agribusiness · owner-managed",
      illustrative: true,
      context:
        "An agribusiness with strong operational knowledge and monthly accounts that arrived several weeks after month end.",
      challenge:
        "The owner learned about margin problems long after the decisions that caused them, and had no way to tell a seasonal dip from a structural one.",
      diagnosis:
        "Not a reporting problem but a measurement one. The business tracked what its accounting system produced rather than what its decisions depended on, so nothing reported early enough to act on.",
      intervention:
        "A short set of leading indicators defined against the decisions they inform, with weekly reporting for the few that move fast. Management reporting rebuilt so it can be read in one page.",
      outcome:
        "Margin movement is visible while it is still cheap to correct, and seasonal variation can be distinguished from a real change.",
      learning:
        "Most businesses do not need more measures. They need the few that report while there is still time to do something.",
    },
  ]);

/**
 * Real engagements, published with client permission. Empty by policy until a
 * client agrees — brief §7.
 */
export const caseStudies: ReadonlyArray<never> = [];
