import { Link } from "@tanstack/react-router";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";

/**
 * A centred statement, and nothing else.
 *
 * The reference rings this section with a photo collage. Without photography
 * that became eight empty boxes framing the sentence, which drew the eye to the
 * gaps rather than the words. The statement is strong enough to carry the
 * section on its own, and this is where the site's argument actually starts.
 *
 * The two-tone treatment earns its place: the emphasised half carries the
 * observation, the muted half the consequence, so it can be read at two speeds.
 */
export function AboutSection() {
  return (
    <Section tone="white" width="default" className="py-20 md:py-24">
      <Eyebrow>Complexity is what growth feels like&hellip;</Eyebrow>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <h2 className="text-h2 md:text-h1 font-serif">
          <span className="text-ink-strong">
            Businesses grow. Complexity grows with them.
          </span>{" "}
          <span className="text-ink-muted">
            What worked at ten people quietly stops working at eighty, and the founder
            cannot keep carrying all of it.
          </span>
        </h2>

        <div className="mt-9 flex items-center justify-center gap-3">
          <Link to="/about" className={buttonVariants({ size: "lg" })}>
            More About Us
          </Link>
          <ArrowLink to="/about" label="More about Seiran Partners" />
        </div>
      </div>
    </Section>
  );
}
