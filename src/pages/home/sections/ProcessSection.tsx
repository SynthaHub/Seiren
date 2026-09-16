import { Link } from "@tanstack/react-router";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { buttonVariants } from "@/components/ui/Button";
import { journeyStages } from "@/content/journey";
import { homeContent } from "@/content/pages/home";

/**
 * The working-process band, on BizFusionX's horizontal timeline: step pills on
 * a dashed rule, with the detail beneath each marker.
 *
 * Seven stages will not sit across a row legibly, so Home shows the first four
 * — the ones a reader is deciding about before they enquire — and the link
 * carries the rest. The Approach page runs all seven vertically, where a long
 * sequence belongs.
 *
 * This is the second of the only two places on the site that carry numbers, and
 * for the same reason: the stages are an order, not a set, and the connector is
 * that argument made visible. Numbering appears nowhere else so that it still
 * means something in both.
 *
 * The dashed rule is drawn behind the row and stops at the last visible marker,
 * rather than running to the container edge and implying a fifth step.
 */
export function ProcessSection() {
  const shown = journeyStages.slice(0, 4);
  const { process: content } = homeContent;

  return (
    <Section tone="white" width="wide" className="py-20 md:py-24">
      <div className="max-w-2xl">
        <Eyebrow align="start">{content.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">{content.heading}</h2>
        <p className="text-body text-ink-muted mt-5">{content.body}</p>
      </div>

      <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connector, behind the markers. Inset on both sides so it spans
            between the first and last marker rather than past them. */}
        <div
          className="border-accent/30 absolute top-6 right-[12.5%] left-[12.5%] hidden border-t border-dashed lg:block"
          aria-hidden="true"
        />

        {shown.map((stage, index) => (
          <li key={stage.name} className="relative">
            <div className="flex items-center gap-3 lg:justify-center">
              <span className="bg-accent text-accent-ink rounded-pill relative z-10 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.1em] uppercase tabular-nums">
                Step {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 lg:text-center">
              <h3 className="text-h3 text-ink-strong font-serif font-semibold">
                {stage.name}
              </h3>
              <p className="text-small text-ink-muted mt-2 lg:mx-auto lg:max-w-[26ch]">
                {stage.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <Link to="/approach" className={buttonVariants({ variant: "outline" })}>
          {content.ctaLabel}
        </Link>
      </div>
    </Section>
  );
}
