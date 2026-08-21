import { Section } from "@/components/common/Section";
import { NewsletterForm } from "./NewsletterForm";

/**
 * The closing capture.
 *
 * The reference floats a scattered photo cluster above this. Without
 * photography that was five empty tiles immediately before the one action on
 * the page, so it is gone; the section closes on the sentence and the field.
 */
export function CtaSection() {
  return (
    <Section tone="white" width="default" className="py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-h1 font-serif">Build a business that outlasts you.</h2>

        <p className="text-body text-ink-muted mt-5">
          Occasional writing on growth, operating models and founder transition. No more
          than once a month, and nothing you did not ask for.
        </p>

        <NewsletterForm />
      </div>
    </Section>
  );
}
