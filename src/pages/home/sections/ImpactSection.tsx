import { Section } from "@/components/common/Section";
import { servicePillars } from "@/content/services";
import { journeyStages } from "@/content/journey";

/**
 * The reference's "Our Impact in Numbers" band — 10,000+ / 95% / 100%.
 *
 * Seiran is a new practice with no results to count, so those figures would be
 * invented, and invented proof from a firm whose product is honest diagnosis is
 * self-defeating as well as dishonest.
 *
 * The band keeps its structure and its job — a dark strip of hard facts — using
 * numbers that are true and derived from the content itself, so they cannot
 * drift from the site: four pillars, twenty-eight named services, seven stages.
 * The last figure is deliberately not a number.
 */
export function ImpactSection() {
  const serviceCount = servicePillars.reduce((n, p) => n + p.services.length, 0);

  const figures = [
    {
      value: String(servicePillars.length),
      label: "Advisory pillars, worked as one system",
    },
    { value: String(serviceCount), label: "Named services across the four pillars" },
    {
      value: String(journeyStages.length),
      label: "Stages from first conversation to transformation",
    },
  ];

  return (
    <Section tone="navy" width="wide" className="py-14 md:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <h2 className="text-h2 font-serif">What Seiran brings</h2>

        <dl className="grid gap-8 sm:grid-cols-3">
          {figures.map((f) => (
            <div
              key={f.label}
              className="border-border border-t pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6"
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="text-accent block font-serif text-[2.75rem] leading-none font-semibold tabular-nums">
                  {f.value}
                </span>
                <span className="text-small text-ink-muted mt-3 block">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
