import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Settings2, Users, LineChart } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { servicePillars } from "@/content/services";

/**
 * One row per pillar: the title and summary on the left, its full service list
 * on the right. Rows alternate ground so the page has rhythm without needing a
 * photograph in each one — an earlier pass put a placeholder beside every
 * pillar and the page became a column of empty boxes.
 *
 * The services are listed in full rather than teased. Twenty-eight named
 * services is the most persuasive thing here for a reader who has been sold
 * vague capability before.
 */
const icons = [Compass, Settings2, Users, LineChart];

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What the work covers"
        title="Four pillars, worked as one system"
        lede="Good strategy has to work in the real business. These areas are separated for navigation, but we look at them together."
      />

      {servicePillars.map((pillar, index) => {
        const Icon = icons[index] ?? Compass;
        return (
          <Section
            key={pillar.slug}
            tone={index % 2 === 1 ? "parchment" : "white"}
            width="wide"
            className="py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
              <div>
                <Icon className="text-accent size-8" aria-hidden="true" />

                <h2 className="text-h1 text-ink-strong mt-5 font-serif">
                  <Link
                    to="/services/$pillar"
                    params={{ pillar: pillar.slug }}
                    className="hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {pillar.title}
                  </Link>
                </h2>

                <p className="text-body text-ink-muted mt-5">{pillar.summary}</p>

                <Link
                  to="/services/$pillar"
                  params={{ pillar: pillar.slug }}
                  className="text-small text-accent group mt-6 inline-flex items-center gap-1.5 hover:underline"
                >
                  Explore {pillar.title}
                  <ArrowRight
                    className="ease-out-soft size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <ul className="border-border grid gap-2.5 border-t pt-8 sm:grid-cols-2 lg:border-t-0 lg:pt-2">
                {pillar.services.map((service) => (
                  <li
                    key={service.name}
                    className="text-small text-ink flex items-start gap-2.5"
                  >
                    <span
                      className="bg-accent rounded-pill mt-2 size-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}

      <Section tone="navy" width="default" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Rarely one pillar alone</Eyebrow>
          <p className="text-quote mt-8 font-serif italic">
            The presenting problem is rarely the constraint.
          </p>
          <p className="text-body text-ink-muted mt-6">
            An owner who asks for a growth strategy often needs an operating model first.
            Most engagements begin with a diagnostic for exactly that reason.
          </p>
        </div>
      </Section>

      <CtaBand
        heading="Not sure which pillar you need?"
        body="That is a normal place to start. Working it out is part of the first conversation rather than something to resolve beforehand."
      />
    </>
  );
}
