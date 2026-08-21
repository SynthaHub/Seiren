import { MapPin, Mail, Phone } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { faqs } from "@/content/faqs";
import { officeAddress, contactDetails } from "@/content/navigation";
import { EnquiryForm } from "./EnquiryForm";

/**
 * Form first, FAQs beneath. The eleven questions answer objections at exactly
 * the moment someone hesitates over the form, which is why they belong on this
 * page rather than on their own.
 *
 * The form sits on white. Nobody should be asked to fill eleven fields on a
 * dark ground.
 */
export function ContactPage() {
  const details = [
    {
      icon: MapPin,
      label: "Where we are",
      value: `${officeAddress.name}, ${officeAddress.street}, ${officeAddress.locality}`,
      href: null,
    },
    contactDetails.email
      ? {
          icon: Mail,
          label: "Email us",
          value: contactDetails.email,
          href: `mailto:${contactDetails.email}`,
        }
      : null,
    contactDetails.telephone
      ? {
          icon: Phone,
          label: "Phone",
          value: contactDetails.telephone,
          href: `tel:${contactDetails.telephone}`,
        }
      : null,
  ].filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <>
      <PageHero
        eyebrow="Start a conversation&hellip;"
        title="Tell us what you are dealing with"
        lede="The first conversation is a discussion of your situation, not a pitch. If Seiran is not the right fit for what you are facing, we will say so."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <EnquiryForm />

          <aside className="flex flex-col gap-8">
            <div className="bg-surface-sunken rounded-card p-6 md:p-7">
              <h2 className="text-label text-ink-muted font-semibold tracking-[0.1em] uppercase">
                Contact
              </h2>
              <ul className="mt-5 flex flex-col gap-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="bg-surface text-accent rounded-pill grid size-10 shrink-0 place-items-center">
                      <d.icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-small text-ink-muted block">{d.label}</span>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="text-body text-ink-strong hover:text-accent"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-body text-ink-strong">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border rounded-card border p-6 md:p-7">
              <h2 className="text-label text-ink-muted font-semibold tracking-[0.1em] uppercase">
                What happens next
              </h2>
              <ol className="mt-5 flex flex-col gap-4">
                {[
                  "Eldaah reads your enquiry personally.",
                  "A reply within two working days.",
                  "An initial conversation about your situation.",
                  "If there is a fit, a discovery and diagnostic stage.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span
                      className="text-accent text-label font-semibold tabular-nums"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-small text-ink-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="parchment" width="default" className="py-20 md:py-28">
        <Eyebrow>Common questions</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">Before you write</h2>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              question={faq.question}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}
