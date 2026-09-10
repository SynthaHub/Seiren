import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { footerNav, contactDetails, officeAddress } from "@/content/navigation";
import { SocialLinks } from "@/components/common/SocialLinks";
import { NewsletterForm } from "@/pages/home/sections/NewsletterForm";
import { Wordmark } from "./Wordmark";

/**
 * Navy footer on BizFusionX's construction: brand and newsletter across the
 * top, link columns beneath, a rule, then copyright and socials.
 *
 * The newsletter moved here from its own section on Home. It is a footer
 * concern — a standing offer, not a call to action — and giving it a full band
 * above the real CTA was asking twice, which devalues the first ask.
 *
 * Navy rather than the reference's light ground: with a light-led page above
 * it, this is what keeps SPES-001's navy-dominant proportion within reach.
 *
 * The reference's fourth column is an Instagram grid. Seiran now has four live
 * channels, but a grid of embedded tiles depends on the feeds staying active —
 * the closing line carries the marks instead, which cannot go stale.
 *
 * The gold rule on top is structural, not decoration. Ten of the twelve pages
 * end on a navy CtaBand, and a navy footer directly beneath it meant the
 * closing call to action dissolved into the footer chrome — the one block every
 * page is built to finish on had no edge at all. Toning the CTA light would
 * have fixed the seam at the cost of the navy proportion SPES-001 · 01 fixes at
 * 60%, so the seam is drawn instead. Gold Leaf is legal here because the footer
 * is navy, and holding a structural edge is exactly what the 12% accent
 * allocation is for.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy bg-surface text-ink border-accent border-t-2">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="border-border grid gap-10 border-b pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Wordmark />
            <p className="text-small text-ink-muted mt-5 max-w-sm">
              Strategy and business advisory for owner-managed businesses in Kenya.
              Turning complexity into clarity, stronger execution and sustainable growth.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-serif font-semibold">
              Occasional writing, worth reading
            </h2>
            <p className="text-small text-ink-muted mt-2">
              Stay ahead of the challenges that come with growth. Get practical insights
              on building a stronger, more enduring business.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-label text-ink font-semibold tracking-[0.1em] uppercase">
                {group.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-small text-ink-muted hover:text-accent ease-out-soft transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-label text-ink font-semibold tracking-[0.1em] uppercase">
              Contact
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-accent mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <address className="text-small text-ink-muted not-italic">
                  {officeAddress.name}
                  <br />
                  {officeAddress.street}
                  <br />
                  {officeAddress.locality}
                </address>
              </li>

              {contactDetails.email && (
                <li className="flex items-start gap-3">
                  <Mail
                    className="text-accent mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="text-small text-ink-muted hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {contactDetails.email}
                  </a>
                </li>
              )}

              {contactDetails.telephone && (
                <li className="flex items-start gap-3">
                  <Phone
                    className="text-accent mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${contactDetails.telephoneE164 ?? contactDetails.telephone}`}
                    className="text-small text-ink-muted hover:text-accent ease-out-soft transition-colors duration-200"
                  >
                    {contactDetails.telephone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-border flex flex-col gap-4 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-muted">
            &copy; {year} Seiran Partners. All rights reserved.
          </p>

          {/* Privacy Policy, Terms and Cookie notice are outstanding (brief §9).
              They belong on this line, and the enquiry form should not go live
              without the privacy policy. */}
          <SocialLinks size={9} />
        </div>
      </div>
    </footer>
  );
}
