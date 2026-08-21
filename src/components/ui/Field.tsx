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

      {error && (
        <p id={errorId} className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase = [
  "w-full rounded-control border bg-surface px-3 py-2.5 text-body text-ink",
  "border-border placeholder:text-ink-muted",
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
