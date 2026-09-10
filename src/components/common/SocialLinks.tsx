import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
} from "@/components/ui/icons";
import { contactDetails } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Seiran's social channels, rendered from one list so the header and the
 * footer cannot drift apart as channels are added or retired.
 *
 * LinkedIn points at the COMPANY page here, not the founder's personal
 * profile. The site chrome speaks for the firm; the founder's own profile
 * belongs in his biography on /team, where it still is. Before this change
 * both the header and the footer sent everyone to a personal profile, which
 * reads as a one-person operation rather than a practice.
 *
 * Each entry renders only once it has a URL, so a channel that has not been
 * opened yet costs nothing and the row simply tightens.
 *
 * `size` matches the two existing placements — 7 in the utility bar, 9 on the
 * footer's closing line — rather than introducing a new control size.
 */

const channels = [
  { key: "linkedin", href: contactDetails.linkedInCompany, label: "Seiran Partners on LinkedIn", Icon: LinkedInIcon },
  { key: "instagram", href: contactDetails.instagram, label: "Seiran Partners on Instagram", Icon: InstagramIcon },
  { key: "facebook", href: contactDetails.facebook, label: "Seiran Partners on Facebook", Icon: FacebookIcon },
  { key: "tiktok", href: contactDetails.tiktok, label: "Seiran Partners on TikTok", Icon: TikTokIcon },
] as const;

export function SocialLinks({
  size = 9,
  className,
}: {
  size?: 7 | 9;
  className?: string;
}) {
  const present = channels.filter((c) => Boolean(c.href));
  if (present.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {present.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "bg-accent text-accent-ink rounded-pill ease-out-soft grid place-items-center",
              "transition-[opacity,transform] duration-200 hover:opacity-90",
              "active:scale-95 active:duration-75",
              size === 7 ? "size-7" : "size-9",
            )}
          >
            <Icon className={size === 7 ? "size-3.5" : "size-4"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
