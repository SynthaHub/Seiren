import { Check } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { Photo } from "@/components/common/Photo";
import { LinkedInIcon } from "@/components/ui/icons";
import { contactDetails } from "@/content/navigation";
import { teamContent } from "@/content/pages/team";

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
 * ticked differentiators. It answers "what am I actually getting" in three
 * lines, which a biography does not. Three rather than four since the client's
 * review: two of the original ticks made the same point about who runs the
 * engagement, so they were merged.
 *
 * The four advisory pillars named in "associates" are kept as CMS copy rather
 * than derived from `servicePillars` because these are titles in a sentence
 * about capability, not links to the service pages.
 */
export function TeamPage() {
  const { hero, founder, differentiators, associates, cta } = teamContent;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />

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
            <Eyebrow align="start">{founder.eyebrowLabel}</Eyebrow>
            <h2 className="text-h1 text-ink-strong mt-6 font-serif">{founder.name}</h2>
            <p className="text-label text-accent mt-3 font-semibold tracking-[0.1em] uppercase">
              {founder.title}
            </p>

            <div className="text-body text-ink-muted border-border mt-7 flex flex-col gap-5 border-t pt-7">
              <p>{founder.bioParagraph1}</p>
              <p>{founder.bioParagraph2}</p>
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
              className="text-small text-ink hover:text-accent hover:border-accent/50 border-border rounded-control ease-out-soft mt-9 inline-flex items-center gap-2 border px-4 py-2.5 transition-[color,border-color,transform] duration-200 active:translate-y-px active:duration-75"
            >
              <LinkedInIcon className="text-accent size-4" />
              {founder.linkedInLabel}
            </a>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-24">
        <Eyebrow>{associates.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">{associates.heading}</h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-2xl text-center">
          {associates.intro}
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {associates.areas.map((area) => (
            <li
              key={area}
              className="bg-surface border-border rounded-card text-body text-ink-strong border px-6 py-5 font-semibold"
            >
              {area}
            </li>
          ))}
        </ul>

        <p className="text-body text-ink-muted mx-auto mt-10 max-w-2xl text-center">
          {associates.closing}
        </p>
      </Section>

      <CtaBand heading={cta.heading} body={cta.body} />
    </>
  );
}
