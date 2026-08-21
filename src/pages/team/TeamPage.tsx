import { Check } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { Photo } from "@/components/common/Photo";
import { LinkedInIcon } from "@/components/ui/icons";
import { contactDetails } from "@/content/navigation";

/**
 * The founder profile, with two details borrowed from BizFusionX.
 *
 * **The offset frame.** The reference sets its hero photo against a hatched
 * border shifted behind it. Here that becomes a single gold rule offset down
 * and left — it gives the image craft without a decorative texture the brand
 * does not own, and it stops the photo reading as a bare rectangle dropped in
 * the column.
 *
 * **The checklist.** The reference pairs its About copy with a short list of
 * ticked differentiators. For a one-consultant practice that is the most useful
 * thing on the page: it answers "what am I actually getting" in four lines,
 * which a biography does not.
 */

const differentiators = [
  "The consultant in the first conversation runs the engagement",
  "No account layer and no rotating team",
  "Specialists brought in only where an engagement needs them",
  "Work continues through execution, not to the report",
] as const;

const associateAreas = [
  "Strategy",
  "Operations & Transformation",
  "People & Organization",
  "Finance & Business Performance",
  "Marketing & Customer Experience",
  "Technology & Digital Transformation",
] as const;

export function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="A specialist practice, not a pyramid"
        lede="One named consultant leads the work, with a network of associates brought in where a specific engagement needs them."
      />

      <Section tone="white" width="wide" className="py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          {/* Offset gold rule sitting behind the image. */}
          <div className="relative">
            <div
              className="border-accent/45 rounded-media absolute -bottom-4 -left-4 h-full w-full border"
              aria-hidden="true"
            />
            <Photo slot="workspacePortrait" aspect="aspect-[4/5]" className="relative" />
          </div>

          <div>
            <Eyebrow align="start">Who you will be working with&hellip;</Eyebrow>
            <h2 className="text-h1 text-ink-strong mt-6 font-serif">Eldaah Toi, PMP</h2>
            <p className="text-label text-accent mt-3 font-semibold tracking-[0.1em] uppercase">
              Founder &amp; Managing Consultant
            </p>

            <div className="text-body text-ink-muted border-border mt-7 flex flex-col gap-5 border-t pt-7">
              <p>
                Experience across telecommunications, project management, business
                analytics, strategic management and strategic consulting.
              </p>
              <p>
                Leads Seiran&rsquo;s advisory work, translating complex organisational
                challenges into practical strategies, stronger systems and sustainable
                growth.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {differentiators.map((item) => (
                <li key={item} className="text-small text-ink flex items-start gap-2.5">
                  <span
                    className="bg-accent text-accent-ink rounded-pill mt-0.5 grid size-5 shrink-0 place-items-center"
                    aria-hidden="true"
                  >
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={contactDetails.linkedInFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-ink hover:text-accent border-border rounded-control mt-9 inline-flex items-center gap-2 border px-4 py-2.5 transition-colors"
            >
              <LinkedInIcon className="text-accent size-4" />
              Eldaah Toi on LinkedIn
            </a>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-24">
        <Eyebrow>Capability where it is needed&hellip;</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">Strategic associates</h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-xl text-center">
          Seiran works with a network of associates across the disciplines below,
          alongside sector-specific expertise. Individual profiles are added as associates
          are formally engaged.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {associateAreas.map((area) => (
            <li
              key={area}
              className="bg-surface border-border rounded-card text-body text-ink-strong border px-6 py-5 font-semibold"
            >
              {area}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        heading="Work with the person doing the work."
        body="No account layer and no rotating team. The consultant in the first conversation is the one who runs the engagement."
      />
    </>
  );
}
