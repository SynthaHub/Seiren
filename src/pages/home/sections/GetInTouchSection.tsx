import { MapPin, Mail, Phone } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { contactDetails, officeAddress } from "@/content/navigation";
import { homeContent } from "@/content/pages/home";
import { ShortEnquiryForm } from "./ShortEnquiryForm";

/**
 * Contact details left, a consultation card right, exactly as the reference
 * places them. The card is navy so it holds the same weight the reference gives
 * its green panel, and it is where Gold Leaf is legal.
 *
 * Email and telephone are outstanding (brief §9); each row renders only when it
 * has a value, so the block tightens rather than showing empty labels.
 */
export function GetInTouchSection() {
  const { getInTouch: content } = homeContent;

  return (
    <Section tone="white" width="wide" className="py-20 md:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow align="start">{content.eyebrow}</Eyebrow>

          <h2 className="text-h1 mt-6 font-serif">{content.heading}</h2>

          <p className="text-body text-ink-muted mt-6 max-w-lg">{content.body}</p>

          <ul className="mt-10 flex flex-col gap-6">
            <li className="flex items-start gap-4">
              <span className="bg-surface-sunken text-accent rounded-pill grid size-11 shrink-0 place-items-center">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="text-small text-ink-muted block">
                  {content.labelWhereWeAre}
                </span>
                <span className="text-body text-ink-strong">
                  {officeAddress.name}, {officeAddress.street}, {officeAddress.locality}
                </span>
              </span>
            </li>

            {contactDetails.email && (
              <li className="flex items-start gap-4">
                <span className="bg-surface-sunken text-accent rounded-pill grid size-11 shrink-0 place-items-center">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="text-small text-ink-muted block">
                    {content.labelEmailUs}
                  </span>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="text-body text-ink-strong hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {contactDetails.email}
                  </a>
                </span>
              </li>
            )}

            {contactDetails.telephone && (
              <li className="flex items-start gap-4">
                <span className="bg-surface-sunken text-accent rounded-pill grid size-11 shrink-0 place-items-center">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="text-small text-ink-muted block">
                    {content.labelPhone}
                  </span>
                  <a
                    href={`tel:${contactDetails.telephoneE164 ?? contactDetails.telephone}`}
                    className="text-body text-ink-strong hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {contactDetails.telephone}
                  </a>
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="on-navy bg-surface rounded-card p-6 md:p-8">
          <h3 className="text-h3 text-ink font-semibold">{content.cardHeading}</h3>
          <p className="text-small text-ink-muted mt-2">{content.cardSubcopy}</p>
          <ShortEnquiryForm />
        </div>
      </div>
    </Section>
  );
}
