import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { servicePillars } from "@/content/services";

/**
 * The services row. Restyled to the reference's card language — white cards on
 * a parchment ground, generous radius, a rule between the summary and the list.
 *
 * The sub-services stay listed in full rather than teased. Twenty-eight named
 * services is the most persuasive thing on the page for a reader who has been
 * sold vague capability before, and it costs nothing but height.
 */
export function PillarsSection() {
  return (
    <Section tone="parchment" width="wide" className="py-20 md:py-24">
      <Eyebrow>Advisory services</Eyebrow>
      <h2 className="text-h1 mt-6 text-center font-serif">
        Four pillars, worked as one system
      </h2>
      <p className="text-body text-ink-muted mx-auto mt-5 max-w-xl text-center">
        Strategy that ignores operations does not survive contact with the business. These
        are separated for navigation, not because they are addressed separately.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {servicePillars.map((pillar) => (
          <article
            key={pillar.slug}
            className="bg-surface border-border rounded-card flex flex-col border p-6 md:p-8"
          >
            <h3 className="text-h3 text-ink-strong font-serif font-semibold">
              <Link
                to="/services/$pillar"
                params={{ pillar: pillar.slug }}
                className="hover:text-accent transition-colors"
              >
                {pillar.title}
              </Link>
            </h3>

            <p className="text-small text-ink-muted mt-3">{pillar.summary}</p>

            <ul className="border-border mt-6 flex flex-1 flex-col gap-2.5 border-t pt-6">
              {pillar.services.map((service) => (
                <li
                  key={service}
                  className="text-small text-ink flex items-start gap-2.5"
                >
                  <span
                    className="bg-accent rounded-pill mt-2 size-1.5 shrink-0"
                    aria-hidden="true"
                  />
                  {service}
                </li>
              ))}
            </ul>

            <Link
              to="/services/$pillar"
              params={{ pillar: pillar.slug }}
              className="text-small text-accent group mt-7 inline-flex items-center gap-1.5 hover:underline"
            >
              Explore {pillar.title}
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
