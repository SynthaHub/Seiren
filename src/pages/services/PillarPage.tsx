import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { servicePillars } from "@/content/services";
import type { ServicePillar } from "@/content/schemas";

export function PillarPage({ pillar }: { pillar: ServicePillar }) {
  const others = servicePillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      <PageHero
        eyebrow="Within the four pillars"
        title={pillar.title}
        lede={pillar.summary}
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">The full list</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">
          {pillar.services.length} services within {pillar.title}
        </h2>

        <ul className="border-border mt-12 grid border-t sm:grid-cols-2 sm:gap-x-12">
          {pillar.services.map((service) => (
            <li
              key={service}
              className="border-border text-body text-ink flex items-start gap-3 border-b py-4"
            >
              <span
                className="bg-accent rounded-pill mt-2.5 size-1.5 shrink-0"
                aria-hidden="true"
              />
              {service}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">The other three</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">Rarely addressed in isolation</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {others.map((other) => (
            <article
              key={other.slug}
              className="bg-surface border-border rounded-card border p-6"
            >
              <h3 className="text-h3 text-ink-strong font-serif font-semibold">
                {other.title}
              </h3>
              <p className="text-small text-ink-muted mt-3">{other.summary}</p>
              <Link
                to="/services/$pillar"
                params={{ pillar: other.slug }}
                className="text-small text-accent group mt-5 inline-flex items-center gap-1.5 hover:underline"
              >
                Explore
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        heading={`Discuss a ${pillar.title.toLowerCase()} challenge.`}
        body="Most engagements in this area begin with a diagnostic rather than a proposal, because the presenting problem is rarely the constraint."
      />
    </>
  );
}
