import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { footerNav, contactDetails, officeAddress } from "@/content/navigation";
import { Wordmark } from "./Wordmark";

/**
 * Four columns over a rule, following the approved reference.
 *
 * Navy rather than the reference's light grey: with a light-led page above it,
 * a navy footer is what keeps the identity's navy-dominant proportion
 * (SPES-001 · 01) within reach.
 *
 * The reference's fourth column is an Instagram grid. Seiran has no confirmed
 * social channels beyond the founder's LinkedIn (brief §9), and a grid of
 * placeholder tiles would be worse than none, so that column carries contact
 * details instead.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy bg-surface text-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Wordmark />
            <p className="text-small text-ink-muted mt-5 max-w-xs">
              Strategy and business advisory for owner-managed businesses in Kenya.
              Turning complexity into clarity, stronger execution and sustainable growth.
            </p>

            <a
              href={contactDetails.linkedInFounder}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eldaah Toi on LinkedIn"
              className="bg-accent text-accent-ink rounded-pill mt-7 grid size-10 place-items-center transition-opacity hover:opacity-90"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>

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
                      className="text-small text-ink-muted hover:text-accent transition-colors"
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
                    className="text-small text-ink-muted hover:text-accent"
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
                    href={`tel:${contactDetails.telephone}`}
                    className="text-small text-ink-muted hover:text-accent"
                  >
                    {contactDetails.telephone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-border mt-14 flex flex-col gap-3 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-muted">
            &copy; {year} Seiran Partners. All rights reserved.
          </p>
          {/* Privacy Policy, Terms and Cookie notice are outstanding (brief §9).
              They belong here, and the enquiry form should not go live without
              the privacy policy. */}
          <p className="text-small text-ink-muted">A clear sky after a storm.</p>
        </div>
      </div>
    </footer>
  );
}
