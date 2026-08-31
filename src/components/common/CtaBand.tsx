import { Link } from "@tanstack/react-router";
import { Section } from "./Section";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";

/**
 * The closing band every page ends on.
 *
 * `heading` and `body` are required rather than defaulted on purpose. The same
 * CTA copy repeated across eight pages is the clearest signal a site was
 * assembled rather than written, so each page has to say why *this* page's
 * reader should get in touch.
 */
export function CtaBand({
  heading,
  body,
  action = "Start a Conversation",
  to = "/contact",
}: {
  heading: string;
  body: string;
  action?: string;
  to?: string;
}) {
  return (
    <Section tone="navy" width="default" className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-h1 font-serif">{heading}</h2>
        <p className="text-body text-ink-muted mt-5">{body}</p>
        {/* Grouped so the arrow answers a hover on the button. The two point at
            the same destination and read as one control, and an arrow square
            that sits inert while the thing beside it lights up is what makes a
            paired CTA look like two unrelated buttons. */}
        <div className="group mt-9 flex items-center justify-center gap-3">
          <Link to={to} className={buttonVariants({ size: "lg" })}>
            {action}
          </Link>
          <ArrowLink to={to} label={action} />
        </div>
      </div>
    </Section>
  );
}
