import { MapPin, Mail, Phone } from "lucide-react";
import { Photo } from "@/components/common/Photo";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { faqs } from "@/content/faqs";
import { officeAddress, contactDetails } from "@/content/navigation";
import { contactContent } from "@/content/pages/contact";
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
  const { hero, nextSteps, panelHeading, whatHappensNextHeading, faqSection } =
    contactContent;
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
          href: `tel:${contactDetails.telephoneE164 ?? contactDetails.telephone}`,
        }
      : null,
  ].filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <EnquiryForm />

          <aside className="flex flex-col gap-8">
            {/* Grounds the firm in a real place beside the enquiry form. The
                slot was defined and rendered nowhere. */}
            <Photo slot="nairobiExterior" aspect="aspect-[4/3]" />

            <div className="bg-surface-sunken rounded-card p-6 md:p-7">
              <h2 className="text-label text-ink-muted font-semibold tracking-[0.1em] uppercase">
                {panelHeading}
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
                          className="text-body text-ink-strong hover:text-accent ease-out-soft transition-colors duration-200"
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
                {whatHappensNextHeading}
              </h2>
              <ol className="mt-5 flex flex-col gap-4">
                {nextSteps.map((step, index) => (
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
        <Eyebrow>{faqSection.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">{faqSection.heading}</h2>

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
