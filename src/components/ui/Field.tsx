import { cn } from "@/lib/cn";

/**
 * Owns label, description, and error together, so no field can ship without a
 * label and no error can ship unassociated with its input.
 *
 * The control is a render prop rather than a child so the wiring ids cannot be
 * forgotten at the call site — Field computes them and hands them over.
 */

type ControlProps = {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": boolean | undefined;
};

export type FieldProps = {
  label: string;
  name: string;
  error?: string | undefined;
  description?: string | undefined;
  /** Optional fields are marked, not required ones — on an eleven-field form
   *  "(optional)" is the label that reduces anxiety. */
  optional?: boolean;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
};

export function Field({
  label,
  name,
  error,
  description,
  optional,
  className,
  children,
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const descId = `${id}-description`;
  const describedBy =
    [description ? descId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-small text-ink font-medium">
        {label}
        {optional && <span className="text-ink-muted ml-2 font-normal">(optional)</span>}
      </label>

      {description && (
        <p id={descId} className="text-small text-ink-muted">
          {description}
        </p>
      )}

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}

      {/* An error that appears instantly under a field the user has just left
          is easy to miss on a long form. The fade is short enough not to delay
          the reading and long enough to catch the eye moving away. */}
      {error && (
        <p id={errorId} className="text-small text-danger animate-rise-in">
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase = [
  "w-full rounded-control border bg-surface px-3 py-2.5 text-body text-ink",
  // The header is sticky. Without this, jumping to #field-x from the enquiry
  // form's error summary parks the control underneath it.
  "scroll-mt-28",
  "border-border placeholder:text-ink-muted",
  // The border resolving to the stronger rule under the pointer is the whole
  // interaction here: eleven fields on the contact form, and this is what tells
  // you which one you are about to land in before you click.
  // Scoped so it cannot fight the two states below: a disabled field is not
  // offering anything to hover, and an invalid one must keep its red rule.
  "transition-[border-color,color] duration-150 ease-out-soft",
  "enabled:not-aria-[invalid=true]:hover:border-border-strong",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  // aria-invalid is not one of Tailwind's built-in aria variants, so this uses
  // the arbitrary form rather than silently doing nothing.
  "aria-[invalid=true]:border-danger",
  "disabled:opacity-50",
].join(" ");

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlBase, "min-h-40 resize-y", className)} {...props} />
  );
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(controlBase, "h-11 py-0", className)} {...props} />;
}
