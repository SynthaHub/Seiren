import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { Photo } from "@/components/common/Photo";
import { LinkedInIcon } from "@/components/ui/icons";
import { contactDetails } from "@/content/navigation";

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
        lede="One named consultant leading the work, with a network of associates brought in where a specific engagement needs them."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14">
          <Photo
            slot="workspacePortrait"
            aspect="aspect-[4/5]"
            className="rounded-card"
          />

          <div>
            <Eyebrow align="start">Founder</Eyebrow>
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

            <a
              href={contactDetails.linkedInFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-ink hover:text-accent border-border rounded-control mt-8 inline-flex items-center gap-2 border px-4 py-2.5 transition-colors"
            >
              <LinkedInIcon className="text-accent size-4" />
              Eldaah Toi on LinkedIn
            </a>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow>Strategic associates &amp; specialists</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          Capability brought in where it is needed
        </h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-xl text-center">
          Seiran works with a network of associates across the disciplines below,
          alongside sector-specific expertise. Individual profiles are added as associates
          are formally engaged.
        </p>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {associateAreas.map((area) => (
            <li
              key={area}
              className="bg-surface border-border rounded-card text-body text-ink-strong border p-6 font-semibold"
            >
              {area}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        heading="Work directly with the person leading the engagement."
        body="No account layer, no rotating team. The consultant in the first conversation is the one doing the work."
      />
    </>
  );
}
