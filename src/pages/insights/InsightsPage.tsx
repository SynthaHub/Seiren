import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";
import { NewsletterForm } from "@/pages/home/sections/NewsletterForm";
import { insightsContent } from "@/content/pages/insights";

/**
 * Nothing is published yet, so these are the first pieces rather than fake
 * posts — no invented dates, no bylines on articles that do not exist.
 *
 * The five questions are the brief's own editorial seed list, editable via
 * /admin. They are genuine long-tail searches with high intent and low
 * competition, and each is worth a page that answers it directly with the
 * question as the h1. That is the whole SEO strategy for a firm this size.
 */
export function InsightsPage() {
  const {
    hero,
    forthcoming,
    firstPublishedSection,
    notifyLinkLabel,
    notifySection,
    finalCta,
  } = insightsContent;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">{firstPublishedSection.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">{firstPublishedSection.heading}</h2>
        <p className="text-body text-ink-muted mt-5 max-w-xl">
          {firstPublishedSection.intro}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forthcoming.map((post) => (
            <article
              key={post.title}
              className="bg-surface border-border rounded-card flex flex-col border p-6"
            >
              <div className="flex flex-1 flex-col">
                <p className="flex flex-wrap gap-2">
                  <span className="bg-surface-sunken text-ink-muted text-label rounded-pill px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
                    {post.category}
                  </span>
                  <span className="text-accent border-accent/40 text-label rounded-pill border px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
                    Forthcoming
                  </span>
                </p>

                <h3 className="text-h3 text-ink-strong mt-4 font-semibold">
                  {post.title}
                </h3>
                <p className="text-small text-ink-muted mt-3 flex-1">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {/* The reason this page exists is that these five pieces are the whole
            SEO plan. Arriving from a headline link and finding nothing to do
            was the dead end; this is the only honest next step while nothing
            is published. */}
        <p className="mt-10">
          <a
            href="#notify"
            className="text-small text-accent ease-out-soft group inline-flex items-center gap-1.5 transition-colors duration-200 hover:underline"
          >
            {notifyLinkLabel}
            <ArrowRight
              className="ease-out-soft size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </p>
      </Section>

      <Section
        id="notify"
        tone="parchment"
        width="default"
        className="scroll-mt-24 py-20 md:py-24"
      >
        <div className="max-w-xl">
          <Eyebrow align="start">{notifySection.eyebrow}</Eyebrow>
          <h2 className="text-h1 mt-6 font-serif">{notifySection.heading}</h2>
          <p className="text-body text-ink-muted mt-5">{notifySection.body}</p>
          <NewsletterForm />
        </div>
      </Section>

      <Section tone="navy" width="default" className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h1 font-serif">{finalCta.heading}</h2>
          <p className="text-body text-ink-muted mt-5">{finalCta.body}</p>
          <div className="group mt-9 flex items-center justify-center gap-3">
            <Link to="/contact" className={buttonVariants({ size: "lg" })}>
              {finalCta.ctaLabel}
            </Link>
            <ArrowLink to="/contact" label="Start a conversation with Seiran" />
          </div>
        </div>
      </Section>
    </>
  );
}
