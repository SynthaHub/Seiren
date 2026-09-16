import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { servicePillars } from "@/content/services";
import { servicesPageContent } from "@/content/pages/services";
import type { ServicePillar } from "@/content/schemas";

export function PillarPage({ pillar }: { pillar: ServicePillar }) {
  const others = servicePillars.filter((p) => p.slug !== pillar.slug);
  const { pillarPage: content } = servicesPageContent;

  return (
    <>
      <PageHero
        eyebrow={content.heroEyebrow}
        title={pillar.title}
        lede={pillar.summary}
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">{content.fullListEyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">
          {content.fullListHeadingTemplate
            .replace("{n}", String(pillar.services.length))
            .replace("{title}", pillar.title)}
        </h2>

        <ul className="border-border mt-12 grid border-t sm:grid-cols-2 sm:gap-x-12">
          {pillar.services.map((service) => (
            <li
              key={service.name}
              className="border-border flex items-start gap-3 border-b py-4"
            >
              <span
                className="bg-accent rounded-pill mt-2.5 size-1.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                <span className="text-body text-ink block">{service.name}</span>
                {/* The question is the half an owner-manager recognises, so it
                    sits directly under the name rather than in a second column
                    that would collapse to nowhere on a phone. */}
                <span className="text-small text-ink-muted mt-1 block">
                  {service.question}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">{content.otherPillarsEyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">{content.otherPillarsHeading}</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {others.map((other) => (
            <article
              key={other.slug}
              className="bg-surface border-border hover:border-accent/50 rounded-card ease-out-soft group border p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5"
            >
              <h3 className="text-h3 text-ink-strong font-serif font-semibold">
                {other.title}
              </h3>
              <p className="text-small text-ink-muted mt-3">{other.summary}</p>
              <Link
                to="/services/$pillar"
                params={{ pillar: other.slug }}
                className="text-small text-accent mt-5 inline-flex items-center gap-1.5 hover:underline"
              >
                {content.exploreLabel}
                <ArrowRight
                  className="ease-out-soft size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        heading={content.ctaHeadingTemplate.replace(
          "{pillar}",
          pillar.title.toLowerCase(),
        )}
        body={content.ctaBody}
      />
    </>
  );
}
