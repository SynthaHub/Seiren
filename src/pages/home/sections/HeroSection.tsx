import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import { Eyebrow } from "@/components/common/Eyebrow";
import { HeroPattern } from "@/components/common/HeroPattern";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";
import { placeholders, usingPlaceholderImagery } from "@/content/placeholders";

/**
 * Full-bleed hero, built to the reference's construction rather than a card
 * layout.
 *
 * Three things make it read the way the reference does:
 *
 * 1. **The image bleeds off the right edge.** It is positioned against the
 *    section, not inside the max-width container, so it runs to the viewport
 *    edge and the full height of the band. No rounded frame — a boxed photo is
 *    what made the earlier version look like a component dropped onto a page.
 *
 * 2. **The pattern spans the whole band**, behind both the copy and the image,
 *    rather than sitting in the empty half. That is what makes it read as a
 *    ground rather than as decoration parked in the gap.
 *
 * 3. **The image dissolves into the ground on its left edge.** The reference
 *    uses a cut-out subject with no background; without cut-out photography the
 *    honest equivalent is a gradient wash from the parchment ground across the
 *    image's inner edge, so there is no hard vertical seam down the middle of
 *    the hero.
 *
 * This section deliberately does not use `Section` — it needs to break out of
 * the shared container to bleed, and forcing that through a `bare` prop would
 * make the shared component worse for every other caller.
 */
export function HeroSection() {
  const hero = placeholders.heroAdvisory;

  return (
    <section className="bg-surface-sunken relative isolate overflow-hidden">
      <HeroPattern className="pointer-events-none absolute inset-0 -z-20 h-full w-full opacity-[0.13]" />

      {/* Right half-bleed. Hidden below lg, where it becomes a normal block
          under the copy — a half-bleed on a phone is just a cropped sliver. */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[47%] lg:block">
        <img
          src={hero.src}
          alt={usingPlaceholderImagery ? `Placeholder image — ${hero.note}` : hero.note}
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="sync"
        />
        {/* Dissolves the inner edge into the ground so there is no seam. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-surface-sunken) 0%, color-mix(in oklch, var(--color-surface-sunken) 55%, transparent) 28%, transparent 62%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="lg:max-w-[54%]">
          <Eyebrow align="start">Turning complexity into clarity&hellip;</Eyebrow>

          <h1 className="text-hero mt-7">
            Clear Thinking,
            <br />
            Lasting Growth
          </h1>

          <p className="text-body text-ink-muted mt-7 max-w-md">
            Seiran partners with owner-managed businesses to build clarity, strengthen
            leadership, and design the systems that let a founder stop carrying
            everything.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <Link to="/contact" className={buttonVariants({ size: "lg" })}>
              Start a Conversation
            </Link>
            <ArrowLink to="/contact" label="Start a conversation with Seiran" />
          </div>

          <div className="bg-surface border-border rounded-card mt-14 flex max-w-md items-center gap-5 border p-5">
            <Compass className="text-accent size-7 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-small text-ink-strong font-semibold">
                The seven-stage transformation journey
              </p>
              <Link
                to="/approach"
                className="text-small text-accent group mt-1.5 inline-flex items-center gap-1.5 hover:underline"
              >
                See how an engagement runs
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Below lg the image sits in the flow, full width of the container. */}
        <img
          src={hero.src}
          alt=""
          aria-hidden="true"
          className="rounded-media mt-12 aspect-[4/3] w-full object-cover lg:hidden"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
