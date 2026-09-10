import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";
import { NewsletterForm } from "@/pages/home/sections/NewsletterForm";

/**
 * Nothing is published yet, so these are the first pieces rather than fake
 * posts — no invented dates, no bylines on articles that do not exist.
 *
 * The five questions are the brief's own editorial seed list. They are genuine
 * long-tail searches with high intent and low competition, and each is worth a
 * page that answers it directly with the question as the h1. That is the whole
 * SEO strategy for a firm this size.
 */

const forthcoming = [
  {
    title: "How do owner-managed businesses prepare for growth?",
    excerpt:
      "The work that has to happen before headcount, before new premises, and before the next market.",
    category: "Guide",
  },
  {
    title: "When has a business outgrown its operating model?",
    excerpt:
      "The signals that the way a business is run no longer matches the size it has reached.",
    category: "Article",
  },
  {
    title: "How can founders reduce dependency on themselves?",
    excerpt:
      "Why delegation fails without decision rights, and what has to be built before it holds.",
    category: "Founder perspective",
  },
  {
    title: "What systems should an SME build before scaling?",
    excerpt:
      "The small number of processes worth formalising early, and the many that can wait.",
    category: "Guide",
  },
  {
    title: "How can owners gain visibility of business performance?",
    excerpt:
      "The short set of measures that tell you something is wrong while it is still cheap to fix.",
    category: "Article",
  },
] as const;

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Writing for owner-managers"
        title="Practical thinking on growth, systems and the founder&rsquo;s role"
        lede="Articles, guides and practical perspectives on the challenges owner-managed businesses face as they grow."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow align="start">First to be published</Eyebrow>
        <h2 className="text-h1 mt-6 font-serif">The questions owners ask most often</h2>
        <p className="text-body text-ink-muted mt-5 max-w-xl">
          Nothing is published here yet. These are the pieces being written first.
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
            Tell me when these are published
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
        className="py-20 md:py-24 scroll-mt-24"
      >
        <div className="max-w-xl">
          <Eyebrow align="start">When they land</Eyebrow>
          <h2 className="text-h1 mt-6 font-serif">
            Get practical insights for growing your business.
          </h2>
          <p className="text-body text-ink-muted mt-5">
            Get occasional insights from Seiran on growth, leadership, systems and
            business performance. We send no more than one email a month.
          </p>
          <NewsletterForm />
        </div>
      </Section>

      <Section tone="navy" width="default" className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h1 font-serif">Is one of these a live question for you?</h2>
          <p className="text-body text-ink-muted mt-5">
            If one of these is a question you&rsquo;re facing now, you do not have to
            wait for the article. Let&rsquo;s talk.
          </p>
          <div className="group mt-9 flex items-center justify-center gap-3">
            <Link to="/contact" className={buttonVariants({ size: "lg" })}>
              Start a Conversation
            </Link>
            <ArrowLink to="/contact" label="Start a conversation with Seiran" />
          </div>
        </div>
      </Section>
    </>
  );
}
