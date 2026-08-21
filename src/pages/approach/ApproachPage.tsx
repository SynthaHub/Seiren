import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { journeyStages } from "@/content/journey";

/**
 * The one page on the site where numbered markers are honest: the seven stages
 * are a real sequence and the order carries information the reader needs.
 * Numbering appears nowhere else precisely so it still means something here.
 */
export function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="A report is not the finish line. Transformation is."
        lede="The Seiran Transformation Journey runs in seven stages. They are sequential because each depends on the last — you cannot design an operating model for a direction that has not been agreed."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow>The seven stages</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          From understanding a business to changing it
        </h2>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeyStages.map((stage, index) => (
            <li
              key={stage.name}
              className="border-border rounded-card bg-surface flex flex-col border p-6 md:p-7"
            >
              <span
                className="text-accent font-serif text-[2.25rem] leading-none font-semibold tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink-strong border-border mt-5 border-t pt-5 font-semibold">
                {stage.name}
              </h3>
              <p className="text-small text-ink-muted mt-3">{stage.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="navy" width="default" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why the later stages matter</Eyebrow>
          <p className="text-quote mt-8 font-serif italic">
            The later stages are where most consulting stops and most change fails.
          </p>
          <p className="text-body text-ink-muted mt-6">
            Seiran works through execution and capability-building alongside the team that
            has to live with the result. A change that depends on an outside adviser being
            in the room is not a change that has been made.
          </p>
        </div>
      </Section>

      <CtaBand
        heading="Find out which stage you are actually at."
        body="Most owners come in expecting stage four and turn out to need stage two. Establishing that is what the first conversation is for."
      />
    </>
  );
}
