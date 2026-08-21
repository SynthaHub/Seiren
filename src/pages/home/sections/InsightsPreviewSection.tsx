import { Link } from "@tanstack/react-router";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";

/**
 * Three-card row from the reference, with its two-pill meta line.
 *
 * The reference pairs a date pill with an author pill. Seiran has published
 * nothing, so a date would have to be invented — and an invented publication
 * date on an advisory firm's blog is a small lie that is trivially checkable.
 * The date pill therefore reads "Forthcoming"; the author pill is real, because
 * Eldaah is the one writing them.
 *
 * The pills keep the reference's exact shape and position, so the row reads the
 * same. Only the content is honest.
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
] as const;

export function InsightsPreviewSection() {
  return (
    <Section tone="parchment" width="wide" className="py-20 md:py-24">
      <Eyebrow>Our thinking</Eyebrow>
      <h2 className="text-h1 mt-6 text-center font-serif">
        Insights for owner-managed businesses
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {forthcoming.map((post) => (
          <article
            key={post.title}
            className="bg-surface border-border rounded-card flex flex-col border p-6"
          >
            <p className="text-label text-ink-muted text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
              {post.category}
            </p>

            <h3 className="text-h3 text-ink-strong mt-3 font-semibold">{post.title}</h3>

            {/* The reference's date + author pair, in the same position. */}
            <p className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-ink-muted border-border rounded-pill border px-3 py-1 text-[0.7rem] font-medium">
                Forthcoming
              </span>
              <span className="bg-accent text-accent-ink rounded-pill px-3 py-1 text-[0.7rem] font-medium">
                Eldaah Toi
              </span>
            </p>

            <p className="text-small text-ink-muted mt-4 flex-1">{post.excerpt}</p>

            <div className="mt-6 flex items-center gap-3">
              <Link to="/insights" className={buttonVariants({ size: "sm" })}>
                Learn more
              </Link>
              <ArrowLink
                to="/insights"
                label={`Insights — ${post.title}`}
                className="size-9"
              />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
