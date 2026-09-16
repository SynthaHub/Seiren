import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Eyebrow } from "@/components/common/Eyebrow";
import { HeroPattern } from "@/components/common/HeroPattern";
import { buttonVariants } from "@/components/ui/Button";
import { placeholders, placeholderSrc, placeholderSrcSet } from "@/content/placeholders";
import { homeContent } from "@/content/pages/home";

/**
 * Full-bleed hero: copy left, image bleeding off the right edge, contour ground
 * spanning the whole band.
 *
 * Two moves taken from BizFusionX, which is the closest reference to Seiran's
 * situation — business advisory, navy plus a single warm accent:
 *
 * 1. **One word of the headline in the accent.** "Clear" carries the brand
 *    metaphor, so highlighting it says something rather than just adding colour.
 *    Gold Deep, because this is a light ground — Gold Leaf would fail contrast
 *    here and the token layer will not hand it over.
 *
 * 2. **A real secondary action instead of the decorative arrow square.** The
 *    reference pairs "Let's Discuss" with "How we Work". The square arrow that
 *    used to sit here pointed at the same URL as the button beside it, which
 *    gave keyboard users a duplicate tab stop for no gain. This sends people to
 *    the seven-stage journey instead — the question a hesitant reader actually
 *    has.
 *
 * This section does not use `Section`: it has to break out of the shared
 * container to bleed, and forcing that through a prop would make the shared
 * component worse for every other caller.
 */
export function HeroSection() {
  const hero = placeholders.heroAdvisory;
  const { hero: content } = homeContent;

  return (
    <section className="bg-surface-sunken relative isolate overflow-hidden">
      <HeroPattern className="pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-[0.13]" />

      {/* Right half-bleed. Below lg it becomes a normal block under the copy —
          a 47% bleed on a phone is just a cropped sliver. */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[47%] lg:block">
        {/* A flat 47vw, NOT the slot's own `sizes`. This element is `hidden`
            below lg, but `sizes` is evaluated by the preload scanner before any
            of that is known — a media-query sizes string would resolve to 100vw
            on a phone and eager-fetch the 1400px file for an image the phone
            never displays. The mobile copy below carries its own value. */}
        <img
          src={placeholderSrc(hero)}
          srcSet={placeholderSrcSet(hero)}
          sizes="47vw"
          alt={hero.alt}
          width={hero.intrinsic.w}
          height={hero.intrinsic.h}
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--surface-sunken) 0%, color-mix(in oklch, var(--surface-sunken) 55%, transparent) 28%, transparent 62%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="lg:max-w-[54%]">
          <Eyebrow align="start">{content.eyebrow}</Eyebrow>

          <h1 className="text-hero mt-7">
            <span className="text-accent">{content.headingAccent}</span>{" "}
            {content.headingLine1}
            <br />
            {content.headingLine2}
          </h1>

          <p className="text-body text-ink-muted mt-7 max-w-md">{content.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link to={content.primaryCtaHref} className={buttonVariants({ size: "lg" })}>
              {content.primaryCtaLabel}
            </Link>

            <Link
              to={content.secondaryCtaHref}
              className="text-body text-ink-strong hover:text-accent ease-out-soft group inline-flex items-center gap-2.5 transition-colors duration-200"
            >
              <PlayCircle className="text-accent size-6 shrink-0" aria-hidden="true" />
              {content.secondaryCtaLabel}
              <ArrowRight
                className="ease-out-soft size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="bg-surface border-border rounded-card mt-14 flex max-w-md items-center gap-5 border p-5">
            <div className="border-accent/30 flex flex-col items-center border-r pr-5">
              <span className="text-accent font-serif text-[1.9rem] leading-none font-semibold tabular-nums">
                {content.statNumber}
              </span>
              <span className="text-ink-muted mt-1 text-[0.68rem] tracking-wide">
                {content.statLabel}
              </span>
            </div>
            <div>
              <p className="text-small text-ink-strong font-semibold">
                {content.statTitle}
              </p>
              <p className="text-small text-ink-muted mt-1">{content.statCaption}</p>
            </div>
          </div>
        </div>

        <img
          src={placeholderSrc(hero)}
          srcSet={placeholderSrcSet(hero)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width={hero.intrinsic.w}
          height={hero.intrinsic.h}
          className="rounded-media mt-12 aspect-[4/3] w-full object-cover lg:hidden"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
