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
          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
            <Plus className="size-4 group-data-[state=open]:hidden" />
            <Minus className="hidden size-4 group-data-[state=open]:block" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      <RadixAccordion.Content className="overflow-hidden">
        <div className="measure text-body text-ink-muted pb-6">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
