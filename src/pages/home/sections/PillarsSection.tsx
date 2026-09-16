import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Settings2, Users, LineChart } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { servicePillars } from "@/content/services";
import { homeContent } from "@/content/pages/home";
import { cn } from "@/lib/cn";

/**
 * The services block, rebuilt on BizFusionX's dark-services pattern: a navy
 * band carrying four cards, with **one card filled in the accent**.
 *
 * Two problems this solves at once.
 *
 * The section was four identical bordered rectangles on parchment — the most
 * generic thing a services block can be, and it left the page with no navy
 * between the hero and the figures band. SPES-001 · 01 puts navy at 60% of the
 * palette, and a light-dominant page inverts the identity while technically
 * using its colours.
 *
 * It also gives Gold Leaf somewhere real to work. Gold is 12% of the palette,
 * which is generous for an accent, and it is only legal on navy — so a filled
 * gold card inside a navy band is exactly where that allocation was meant to
 * go. One card, not two: the point of a highlight is that it is singular.
 *
 * Strategy & Growth is the highlighted one because it is where most owners
 * think they are starting.
 */

const icons = [Compass, Settings2, Users, LineChart];

export function PillarsSection() {
  const { pillars: content } = homeContent;

  return (
    <Section tone="navy" width="wide" className="py-20 md:py-24">
      <div className="max-w-2xl">
        <Eyebrow align="start">{content.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">{content.heading}</h2>
        <p className="text-body text-ink-muted mt-5">{content.body}</p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {servicePillars.map((pillar, index) => {
          const Icon = icons[index] ?? Compass;
          const featured = index === 0;

          return (
            // `group` on the card rather than on the link, so the arrow answers
            // a hover anywhere on the card — the whole tile is what a reader
            // treats as the target, even though only the link is one.
            <article
              key={pillar.slug}
              className={cn(
                "group rounded-card ease-out-soft p-7 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 md:p-8",
                featured
                  ? "bg-accent text-accent-ink"
                  : "bg-surface-sunken border-border hover:border-accent/50 border",
              )}
            >
              <Icon
                className={featured ? "text-accent-ink size-7" : "text-accent size-7"}
                aria-hidden="true"
              />

              <h3
                className={`text-h3 mt-5 font-serif font-semibold ${
                  featured ? "text-accent-ink" : "text-ink"
                }`}
              >
                {pillar.title}
              </h3>

              <p
                className={`text-small mt-3 ${
                  featured ? "text-accent-ink" : "text-ink-muted"
                }`}
              >
                {pillar.summary}
              </p>

              <p
                className={`text-small mt-5 ${
                  featured ? "text-accent-ink" : "text-ink-muted"
                }`}
              >
                {pillar.services
                  .slice(0, 4)
                  .map((s) => s.name)
                  .join(" · ")}
                {pillar.services.length > 4 && ` · +${pillar.services.length - 4} more`}
              </p>

              <Link
                to="/services/$pillar"
                params={{ pillar: pillar.slug }}
                className={`text-small ease-out-soft mt-7 inline-flex items-center gap-2 font-medium transition-opacity duration-200 hover:opacity-80 ${
                  featured ? "text-accent-ink" : "text-accent"
                }`}
              >
                {content.cardCtaLabel}
                <ArrowRight
                  className="ease-out-soft size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
