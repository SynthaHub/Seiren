import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Base carries focus and disabled styling, so a new variant cannot ship
 * without them.
 *
 * `bg-accent` / `text-accent-ink` resolve per surface: Gold Deep on white and
 * parchment, Gold Leaf inside `.on-navy`. That is what enforces SPES-001 · 02 —
 * Gold Leaf is unreachable on a light ground, so the failing 2.78:1 pairing
 * cannot be produced by accident.
 *
 * Radius is 2px (`rounded-control`): institutional, not friendly-rounded.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-control",
    "font-medium whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:opacity-90",
        outline: "border border-border text-ink hover:bg-surface-sunken",
        ghost: "text-ink-muted hover:text-ink",
      },
      size: {
        // Touch targets stay at or above 44px on the sizes used for real actions.
        sm: "h-9 px-3 text-small",
        md: "h-11 px-5 text-body",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
