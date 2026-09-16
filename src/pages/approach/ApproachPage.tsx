import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { journeyStages } from "@/content/journey";
import { approachContent } from "@/content/pages/approach";

/**
 * The only page on the site that carries numbers. The seven stages are a real
 * sequence and the order is information the reader needs; numbering appears
 * nowhere else precisely so it still means something here.
 *
 * Rebuilt on BizFusionX's stepped-process pattern — a connector line running
 * through numbered markers. Before, the stages were seven identical cards in a
 * grid, which showed them as a *set*. They are not a set; they are an order,
 * and the whole argument of the page is that each stage depends on the one
 * before it. The line is the argument made visible.
 *
 * The connector is drawn with a border on the list rather than an absolutely
 * positioned element, so it cannot drift out of alignment when a stage's
 * description wraps to a different number of lines.
 */
export function ApproachPage() {
  const { hero, stageByStage, quoteSection, cta } = approachContent;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />

      <Section tone="white" width="default" className="py-20 md:py-24">
        <Eyebrow align="start">{stageByStage.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">{stageByStage.heading}</h2>

        <ol className="mt-14">
          {journeyStages.map((stage, index) => {
            const last = index === journeyStages.length - 1;
            return (
              <li
                key={stage.name}
                className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-x-6 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-8 ${
                  last ? "" : "pb-10"
                }`}
              >
                {/* Marker column. The vertical rule is a left border on this
                    cell, so it always spans exactly the row's height. */}
                <div
                  className={`relative flex justify-center ${
                    last ? "" : "border-accent/25 border-l border-dashed"
                  }`}
                  aria-hidden="true"
                >
                  <span className="bg-accent text-accent-ink rounded-pill absolute top-0 grid size-11 place-items-center font-serif text-[0.95rem] font-semibold tabular-nums md:size-12">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="pb-2">
                  <h3 className="text-h3 text-ink-strong font-serif font-semibold">
                    {stage.name}
                  </h3>
                  <p className="text-body text-ink-muted mt-3 max-w-xl">
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="navy" width="default" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{quoteSection.eyebrow}</Eyebrow>
          <p className="text-quote mt-8 font-serif italic">{quoteSection.quote}</p>
          <p className="text-body text-ink-muted mt-6">{quoteSection.body}</p>
        </div>
      </Section>

      <CtaBand heading={cta.heading} body={cta.body} />
    </>
  );
}
