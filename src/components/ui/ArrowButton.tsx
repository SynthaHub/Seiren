import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The square arrow button that sits beside a primary CTA in the approved
 * layout.
 *
 * It is decorative in the reference — a second control pointing at the same
 * destination as the button next to it, which for a keyboard or screen-reader
 * user means tabbing twice to reach the same place. So it is rendered
 * aria-hidden and removed from the tab order, and the real link beside it does
 * the work. The visual pairing survives; the duplicate stop does not.
 */
export function ArrowButtonDecoration({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "rounded-control border-accent/40 text-accent grid size-12 shrink-0 place-items-center border",
        className,
      )}
    >
      <ArrowUpRight className="size-5" />
    </span>
  );
}

/** A genuinely separate destination gets a real, focusable link. */
export function ArrowLink({
  to,
  label,
  className,
}: {
  to: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={cn(
        "rounded-control border-accent/40 text-accent hover:bg-accent hover:text-accent-ink grid size-12 shrink-0 place-items-center border transition-colors",
        "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      <ArrowUpRight className="size-5" aria-hidden="true" />
    </Link>
  );
}
