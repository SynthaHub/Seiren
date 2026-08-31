import * as RadixAccordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Radix rather than a useState boolean.
 *
 * The hand-rolled version misses that the trigger needs aria-expanded, that the
 * panel must be associated with it, and that collapsed content should not be
 * reachable by tab. Radix handles all three, plus arrow-key navigation between
 * triggers.
 *
 * Content stays in the DOM when collapsed — these answers are FAQPage
 * structured data and need to be crawlable whether or not they are visible.
 */

export function Accordion({ className, ...props }: RadixAccordion.AccordionSingleProps) {
  return <RadixAccordion.Root className={cn("flex flex-col", className)} {...props} />;
}

export function AccordionItem({
  value,
  question,
  children,
}: {
  value: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <RadixAccordion.Item value={value} className="border-border border-t last:border-b">
      <RadixAccordion.Header>
        <RadixAccordion.Trigger
          className={cn(
            "group flex w-full items-start justify-between gap-6 py-5 text-left",
            "text-body text-ink hover:text-accent transition-colors",
            "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
          )}
        >
          <span>{question}</span>
          {/* The two glyphs are stacked rather than swapped, so the plus can
              rotate a quarter turn into the minus instead of the icon cutting.
              The vertical stroke is the only difference between them, which is
              what makes the rotation read as one mark changing state. */}
          <span
            className="text-accent ease-out-soft mt-0.5 grid shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90"
            aria-hidden="true"
          >
            <Plus className="col-start-1 row-start-1 size-4 transition-opacity duration-200 group-data-[state=open]:opacity-0" />
            <Minus className="col-start-1 row-start-1 size-4 -rotate-90 opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      {/* Radix measures the panel and publishes the height as a custom
          property, which is what lets this be a real height animation rather
          than a fixed pixel guess that breaks when an answer wraps. */}
      <RadixAccordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <div className="measure text-body text-ink-muted pb-6">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
