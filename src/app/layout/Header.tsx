import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MapPin, Mail, Phone, ChevronDown } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { primaryNav, contactDetails, officeAddress } from "@/content/navigation";
import { servicePillars } from "@/content/services";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

/**
 * Utility bar over a white nav bar, following the approved reference layout.
 *
 * Contact details and social channels are outstanding (brief §9), so each item
 * renders only once it has a value. The bar collapses to just the address on
 * small screens rather than wrapping into two cramped rows.
 */
function TopBar() {
  return (
    <div className="on-navy bg-surface text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-2.5 md:px-8">
        <p className="text-ink-muted flex items-center gap-2 text-[0.8rem]">
          <MapPin className="text-accent size-3.5 shrink-0" aria-hidden="true" />
          <span>
            {officeAddress.name}, {officeAddress.locality}
          </span>
        </p>

        {contactDetails.email && (
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-ink-muted hover:text-ink hidden items-center gap-2 text-[0.8rem] transition-colors sm:flex"
          >
            <Mail className="text-accent size-3.5 shrink-0" aria-hidden="true" />
            {contactDetails.email}
          </a>
        )}

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <span className="text-ink-muted text-[0.8rem]">Follow us</span>
          <a
            href={contactDetails.linkedInFounder}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Eldaah Toi on LinkedIn"
            className="bg-accent text-accent-ink rounded-pill grid size-7 place-items-center transition-opacity hover:opacity-90"
          >
            <LinkedInIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <div className="bg-surface border-border border-b">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 md:px-8">
          <Link
            to="/"
            className="rounded-control focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
            onClick={() => setOpen(false)}
          >
            <Wordmark />
            <span className="sr-only">Seiran Partners — home</span>
          </Link>

          <nav aria-label="Primary" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-7">
              {primaryNav.map((item) =>
                item.to === "/services" ? (
                  <li
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    // onFocus opens the panel for keyboard users; without a
                    // matching blur it stayed open after focus had moved on.
                    // React's onBlur has focusout semantics and bubbles, so
                    // checking relatedTarget closes it only when focus has
                    // genuinely left the whole item.
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setServicesOpen(false);
                      }
                    }}
                  >
                    <Link
                      to={item.to}
                      className="text-small text-ink hover:text-accent flex items-center gap-1 transition-colors"
                      aria-expanded={servicesOpen}
                      onFocus={() => setServicesOpen(true)}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5" aria-hidden="true" />
                    </Link>

                    {servicesOpen && (
                      <ul className="bg-surface border-border rounded-card absolute top-full left-0 w-72 border p-2 shadow-lg">
                        {servicePillars.map((p) => (
                          <li key={p.slug}>
                            <Link
                              to="/services/$pillar"
                              params={{ pillar: p.slug }}
                              onClick={() => setServicesOpen(false)}
                              className="text-small text-ink hover:bg-surface-sunken hover:text-accent rounded-control block px-3 py-2 transition-colors"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-small text-ink hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* The reference puts a phone number here. Seiran's is outstanding,
              so the slot carries the primary action until one exists. */}
          <div className="ml-auto hidden items-center gap-3 lg:ml-0 lg:flex">
            <span className="bg-accent text-accent-ink rounded-pill grid size-11 place-items-center">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="text-ink-muted block text-[0.75rem]">Speak to us</span>
              {contactDetails.telephone ? (
                <a
                  href={`tel:${contactDetails.telephone}`}
                  className="text-body text-ink-strong font-semibold"
                >
                  {contactDetails.telephone}
                </a>
              ) : (
                <Link to="/contact" className="text-body text-ink-strong font-semibold">
                  Start a Conversation
                </Link>
              )}
            </span>
          </div>

          <button
            type="button"
            className="text-ink ml-auto inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div id="mobile-nav" hidden={!open} className="border-border border-t lg:hidden">
          <nav
            aria-label="Primary, mobile"
            className="mx-auto max-w-7xl px-4 py-4 md:px-8"
          >
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="text-body text-ink hover:text-accent block py-3 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ size: "md" }), "w-full")}
                >
                  Start a Conversation
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
