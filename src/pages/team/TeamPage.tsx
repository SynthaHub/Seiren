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
 * ticked differentiators. It answers "what am I actually getting" in three
 * lines, which a biography does not. Three rather than four since the client's
 * review: two of the original ticks made the same point about who runs the
 * engagement, so they were merged.
 */

const differentiators = [
  "You work directly with the consultant leading your engagement",
  "The right specialist expertise is brought in where the work needs it",
  "We stay involved through execution, not just to the report",
] as const;

/**
 * The four advisory pillars, not a longer list of invented disciplines.
 *
 * This used to name six areas including "Marketing & Customer Experience" and
 * "Technology & Digital Transformation" — capability Seiran had not claimed
 * anywhere else on the site. The client's review replaced it with the pillars
 * the practice actually sells, extended by specialists where an engagement
 * needs them. Kept as a literal rather than derived from `servicePillars`
 * because these are titles in a sentence about capability, not links to the
 * service pages.
 */
const associateAreas = [
  "Strategy & Growth",
  "Operations & Business Systems",
  "People & Organization",
  "Business Performance",
] as const;

export function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Who does the work"
        title="A specialist practice, not a pyramid"
        lede="Every Seiran engagement has a named consultant accountable for the work. The consultant leads the engagement and draws on strategic associates and specialist expertise where the work calls for it."
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
            <Eyebrow align="start">The person leading it</Eyebrow>
            <h2 className="text-h1 text-ink-strong mt-6 font-serif">
              Eldaah Toi, PMP&reg;
            </h2>
            <p className="text-label text-accent mt-3 font-semibold tracking-[0.1em] uppercase">
              Founder &amp; Managing Consultant
            </p>

            <div className="text-body text-ink-muted border-border mt-7 flex flex-col gap-5 border-t pt-7">
              <p>
                Eldaah brings experience across telecommunications, project management
                and strategic management. He holds an MBA in Strategic Management from
                USIU-Africa and a Bachelor of Engineering in Electrical &amp; Electronic
                Engineering from the Technical University of Kenya, and is a PMP&reg;
                credential holder. He has also undertaken professional training in
                strategic consulting practice through the Strathmore University Research
                and Consultancy Centre.
              </p>
              <p>
                His experience includes strategic and business advisory work, alongside
                leadership of complex projects and initiatives. At Seiran, he helps
                owner-managed businesses make clearer decisions, strengthen how they
                operate, and build the structures and capabilities required for
                sustainable growth.
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
              className="text-small text-ink hover:text-accent hover:border-accent/50 border-border rounded-control ease-out-soft mt-9 inline-flex items-center gap-2 border px-4 py-2.5 transition-[color,border-color,transform] duration-200 active:translate-y-px active:duration-75"
            >
              <LinkedInIcon className="text-accent size-4" />
              Eldaah Toi on LinkedIn
            </a>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-24">
        <Eyebrow>The right expertise for the work</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          Strategic associates &amp; specialist expertise
        </h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-2xl text-center">
          Seiran&rsquo;s four advisory pillars define our core work. Strategic associates
          and specialist expertise extend that capability where an engagement requires
          additional knowledge or experience. Our growing associate and specialist network
          includes expertise across:
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {associateAreas.map((area) => (
            <li
              key={area}
              className="bg-surface border-border rounded-card text-body text-ink-strong border px-6 py-5 font-semibold"
            >
              {area}
            </li>
          ))}
        </ul>

        <p className="text-body text-ink-muted mx-auto mt-10 max-w-2xl text-center">
          Where a client&rsquo;s situation calls for expertise beyond our core advisory
          work, Seiran can bring the appropriate specialist capability into the
          engagement. The work remains led by a Seiran consultant, with the right
          expertise brought around the engagement where it adds value.
        </p>
      </Section>

      <CtaBand
        heading="Work with the person doing the work."
        body="You will not be passed from one person to another. The consultant leading your engagement stays close to the work from the first conversation through execution."
      />
    </>
  );
}
