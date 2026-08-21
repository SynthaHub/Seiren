import { Link } from "@tanstack/react-router";
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
        eyebrow="Thinking worth reading&hellip;"
        title="Thinking on growth, systems and founder transition"
        lede="Articles, research, guides and founder perspectives on the problems owner-managed businesses hit as they scale."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow>Coming first</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          The questions owners ask most often
        </h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-xl text-center">
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
      </Section>

      <Section tone="parchment" width="default" className="py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Stay in touch</Eyebrow>
          <h2 className="text-h1 mt-6 font-serif">Get these when they land.</h2>
          <p className="text-body text-ink-muted mt-5">
            No more than once a month, and nothing you did not ask for.
          </p>
          <NewsletterForm />
        </div>
      </Section>

      <Section tone="navy" width="default" className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h1 font-serif">Is one of these a live question for you?</h2>
          <p className="text-body text-ink-muted mt-5">
            Then it is worth a conversation rather than a wait for the article.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
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
