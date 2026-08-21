import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitEnquiry, supportOptions } from "@/pages/contact/enquiry";

/**
 * The short form the reference puts in its consultation card.
 *
 * It reuses the same submit path and the same rules as the full enquiry form —
 * it is a shorter door into one process, not a second one. Anything longer
 * belongs on /contact, and the link at the foot says so.
 */
const shortSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  organization: z.string().trim().min(1, "Enter your organisation's name"),
  email: z.email("Enter an email address we can reply to"),
  supportArea: z.string().trim().optional(),
  challenge: z
    .string()
    .trim()
    .min(20, "A sentence or two about the situation helps us reply usefully"),
  website: z.string().max(0, "").optional(),
});

type ShortValues = z.infer<typeof shortSchema>;

export function ShortEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const mountedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShortValues>({
    resolver: zodResolver(shortSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (Date.now() - mountedAt.current < 4000 || values.website) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    try {
      await submitEnquiry(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <p role="status" aria-live="polite" className="text-body text-ink mt-6">
        Thank you — that has reached us. Eldaah will reply within two working days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="short-name" error={errors.name?.message}>
          {(p) => <Input {...p} {...register("name")} autoComplete="name" />}
        </Field>
        <Field label="Email address" name="short-email" error={errors.email?.message}>
          {(p) => (
            <Input {...p} {...register("email")} type="email" autoComplete="email" />
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Organisation"
          name="short-organization"
          error={errors.organization?.message}
        >
          {(p) => (
            <Input {...p} {...register("organization")} autoComplete="organization" />
          )}
        </Field>
        <Field label="Area of support" name="short-support" optional>
          {(p) => (
            <Select {...p} {...register("supportArea")} defaultValue="">
              <option value="">Select…</option>
              {supportOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      <Field
        label="What are you dealing with?"
        name="short-challenge"
        error={errors.challenge?.message}
      >
        {(p) => (
          <Textarea {...p} {...register("challenge")} rows={4} className="min-h-28" />
        )}
      </Field>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="field-short-website">Website</label>
        <input
          id="field-short-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert" aria-live="polite" className="text-small text-danger">
          We could not send that just now. Please try again.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
