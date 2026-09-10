import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MapPin, Mail, Phone, ChevronDown } from "lucide-react";
import { SocialLinks } from "@/components/common/SocialLinks";
import { primaryNav, contactDetails, officeAddress } from "@/content/navigation";
import { servicePillars } from "@/content/services";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

/**
 * Utility bar over a white nav bar, following the approved reference layout.
 *
 * Email is still outstanding, so each item renders only once it has a value.
 *
 * Hidden below md. The header is sticky, and on a phone this bar plus the nav
 * pinned about 112px — roughly a sixth of a 640px viewport — permanently. Below
 * md the bar had already dropped its email and socials, so all it cost that
 * space for was the address, which is in the footer and on /contact anyway. Social channels are live and come from SocialLinks,
 * which points at the company profiles rather than the founder's personal one.
 */
function TopBar() {
  return (
    <div className="on-navy bg-surface text-ink hidden md:block">
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
            className="text-ink-muted hover:text-ink ease-out-soft hidden items-center gap-2 text-[0.8rem] transition-colors duration-200 sm:flex"
          >
            <Mail className="text-accent size-3.5 shrink-0" aria-hidden="true" />
            {contactDetails.email}
          </a>
        )}

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <span className="text-ink-muted text-[0.8rem]">Follow us</span>
          <SocialLinks size={7} />
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
          {/* The most-clicked link on the site and the only one that gave no
              answer at all. Opacity rather than colour: the wordmark's whole
              point is the relationship between the serif Seiran and the gold
              PARTNERS, and dimming both together is the one hover that does not
              disturb it. */}
          <Link
            to="/"
            aria-label="Seiran Partners — home"
            className="rounded-control focus-visible:outline-accent ease-out-soft transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 active:opacity-70 active:duration-75"
            onClick={() => setOpen(false)}
          >
            {/* aria-label names the LINK, which overrides the lockup's own alt
                text. Without it the two combined and a screen reader announced
                "Seiran Partners, Seiran Partners — home". */}
            <Wordmark />
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
                    {/* No aria-expanded here. This is a link: activating it
                        navigates to /services, it does not expand anything. The
                        panel is a hover/focus convenience on top of that, so
                        announcing the link as an expandable control promised
                        behaviour it does not have — a keyboard user told
                        "collapsed" would press Enter expecting a menu and get a
                        page navigation instead. The panel's own links are in
                        the tab order, which is what actually makes it
                        reachable. */}
                    <Link
                      to={item.to}
                      className="text-small text-ink hover:text-accent nav-mark ease-out-soft flex items-center gap-1 transition-colors duration-200"
                      onFocus={() => setServicesOpen(true)}
                    >
                      {item.label}
                      {/* The chevron turning is the only thing that tells you
                          the panel below belongs to this item rather than
                          having appeared over it. */}
                      <ChevronDown
                        className={cn(
                          "ease-out-soft size-3.5 transition-transform duration-200",
                          servicesOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    {servicesOpen && (
                      <ul className="bg-surface border-border rounded-card animate-drop-in absolute top-full left-0 w-72 border p-2 shadow-lg">
                        {servicePillars.map((p) => (
                          <li key={p.slug}>
                            <Link
                              to="/services/$pillar"
                              params={{ pillar: p.slug }}
                              onClick={() => setServicesOpen(false)}
                              className="text-small text-ink hover:bg-surface-sunken hover:text-accent rounded-control ease-out-soft block px-3 py-2 transition-colors duration-150"
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
                      className="text-small text-ink hover:text-accent nav-mark ease-out-soft transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* The reference puts a phone number here, and Seiran's is now live.
              The CTA fallback stays for the case where it is cleared again. */}
          {/* Grouped so the gold disc answers a hover on the label beside it.
              The two are one control to the reader; only one of them is a link,
              and without the group the other looks inert. */}
          <div className="group ml-auto hidden items-center gap-3 lg:ml-0 lg:flex">
            <span className="bg-accent text-accent-ink rounded-pill ease-out-soft grid size-11 place-items-center transition-opacity duration-200 group-hover:opacity-90">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="text-ink-muted block text-[0.75rem]">Speak to us</span>
              {contactDetails.telephone ? (
                <a
                  href={`tel:${contactDetails.telephoneE164 ?? contactDetails.telephone}`}
                  className="text-body text-ink-strong hover:text-accent ease-out-soft font-semibold transition-colors duration-200"
                >
                  {contactDetails.telephone}
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="text-body text-ink-strong hover:text-accent ease-out-soft font-semibold transition-colors duration-200"
                >
                  Start a Conversation
                </Link>
              )}
            </span>
          </div>

          <button
            type="button"
            className="text-ink hover:text-accent ease-out-soft ml-auto inline-flex size-11 items-center justify-center transition-colors duration-200 active:scale-95 active:duration-75 lg:hidden"
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

        {/* `hidden` still does the showing and hiding, so the panel is genuinely
            absent from the tab order when closed. The animation only runs on the
            frame it becomes visible. */}
        <div
          id="mobile-nav"
          hidden={!open}
          className={cn("border-border border-t lg:hidden", open && "animate-drop-in")}
        >
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
                    // active: rather than hover: is the one that matters here —
                    // this list is only ever seen on a touch screen.
                    className="text-body text-ink hover:text-accent active:text-accent ease-out-soft block py-3 transition-colors duration-150"
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
