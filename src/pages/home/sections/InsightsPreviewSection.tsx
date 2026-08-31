import { Link } from "@tanstack/react-router";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Photo } from "@/components/common/Photo";
import { buttonVariants } from "@/components/ui/Button";

/**
 * The writing band, on BizFusionX's blog construction: one featured piece with
 * a large image on the left, three compact rows on the right.
 *
 * Better than three equal cards for two reasons. It creates a hierarchy — one
 * thing is worth reading first — and the compact rows hold a headline at full
 * length, which matters here because every one of these is a question and
 * questions do not truncate gracefully.
 *
 * Nothing is published yet, so there are no dates and no bylines on articles
 * that do not exist. The reference's date pill becomes "Forthcoming"; the
 * author pill is real, since Eldaah is the one writing them. Both keep the
 * reference's shape and position.
 */

const featured = {
  title: "How do owner-managed businesses prepare for growth?",
  excerpt:
    "The work that has to happen before headcount, before new premises, and before the next market — and why most of it is structural rather than commercial.",
  category: "Guide",
} as const;

const rest = [
  {
    title: "When has a business outgrown its operating model?",
    category: "Article",
    slot: "officeDesk" as const,
  },
  {
    title: "How can founders reduce dependency on themselves?",
    category: "Founder perspective",
    slot: "advisorySession" as const,
  },
  {
    title: "What systems should an SME build before scaling?",
    category: "Guide",
    slot: "workingDocuments" as const,
  },
];

function Meta({ category }: { category: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2">
      <span className="bg-surface-sunken text-ink-muted rounded-pill px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
        {category}
      </span>
      <span className="text-ink-muted border-border rounded-pill border px-3 py-1 text-[0.7rem] font-medium">
        Forthcoming
      </span>
      <span className="bg-accent text-accent-ink rounded-pill px-3 py-1 text-[0.7rem] font-medium">
        Eldaah Toi
      </span>
    </p>
  );
}

export function InsightsPreviewSection() {
  return (
    <Section tone="parchment" width="wide" className="py-20 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow align="start">Questions owners actually ask</Eyebrow>
          <h2 className="text-h1 mt-6 font-serif">
            Insights for owner-managed businesses
          </h2>
        </div>
        <Link to="/insights" className={buttonVariants({ variant: "outline" })}>
          Everything planned
        </Link>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* The one place on the site an image moves. It is already clipped by
            the card, so the only thing a 1.03 scale does is close the gap
            between pointing at the card and the card acknowledging it — there
            is no crop change worth noticing. Slower than the interface
            transitions on purpose: an image that snaps looks like a glitch. */}
        <article className="bg-surface border-border hover:border-accent/50 rounded-card ease-out-soft group overflow-hidden border transition-[transform,border-color] duration-200 hover:-translate-y-0.5">
          <Photo
            slot="teamWorkshop"
            aspect="aspect-[16/9]"
            className="ease-out-soft rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="p-6 md:p-7">
            <Meta category={featured.category} />
            <h3 className="text-h2 text-ink-strong mt-4 font-serif">
              <Link
                to="/insights"
                className="hover:text-accent ease-out-soft transition-colors duration-200"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="text-small text-ink-muted mt-3">{featured.excerpt}</p>
          </div>
        </article>

        <ul className="flex flex-col gap-5">
          {rest.map((post) => (
            <li
              key={post.title}
              className="bg-surface border-border hover:border-accent/50 rounded-card ease-out-soft flex flex-1 gap-5 border p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5"
            >
              <Photo
                slot={post.slot}
                aspect="aspect-square"
                className="w-28 shrink-0 sm:w-32"
              />
              <div className="min-w-0 self-center">
                <Meta category={post.category} />
                <h3 className="text-h3 text-ink-strong mt-3 font-semibold">
                  <Link
                    to="/insights"
                    className="hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
