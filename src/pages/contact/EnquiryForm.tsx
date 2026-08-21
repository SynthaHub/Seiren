import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  enquirySchema,
  sectorOptions,
  sizeOptions,
  submitEnquiry,
  supportOptions,
  type EnquiryValues,
} from "./enquiry";

type Status =
  { state: "idle" | "submitting" | "success" } | { state: "error"; message: string };

/**
 * Grouped into three fieldsets so eleven fields read as three short forms
 * rather than one wall.
 *
 * Validation is onBlur first: validating on every keystroke shows "enter a
 * valid email" while someone is still typing the second character, which reads
 * as the form arguing with them. Once a field has errored, it revalidates as
 * they correct it.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const mountedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (values) => {
    // Bots submit near-instantly. A human cannot complete this form in four
    // seconds, so silently accept and discard rather than telling a bot why.
    if (Date.now() - mountedAt.current < 4000 || values.website) {
      setStatus({ state: "success" });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      await submitEnquiry(values);
      setStatus({ state: "success" });
      reset();
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error && error.name === "EnquiryError"
            ? "We could not send that just now. Please try again, or email us directly."
            : "Something went wrong on our end. Please try again.",
      });
    }
  });

  if (status.state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-accent border-l-2 py-2 pl-6"
      >
        <h2 className="text-h2 text-ink-strong font-serif">
          Thank you — that has reached us.
        </h2>
        <p className="measure text-body text-ink-muted mt-4">
          Eldaah will read it personally and reply within two working days. If the
          situation is urgent, say so in a follow-up and it will be prioritised.
        </p>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-12">
      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-label text-accent font-semibold tracking-[0.1em] uppercase">
          About you
        </legend>

        <Field label="Name" name="name" error={errors.name?.message}>
          {(p) => <Input {...p} {...register("name")} autoComplete="name" />}
        </Field>

        <Field label="Email" name="email" error={errors.email?.message}>
          {(p) => (
            <Input {...p} {...register("email")} type="email" autoComplete="email" />
          )}
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Position or role" name="position" optional>
            {(p) => (
              <Input {...p} {...register("position")} autoComplete="organization-title" />
            )}
          </Field>

          <Field label="Telephone" name="telephone" optional>
            {(p) => (
              <Input {...p} {...register("telephone")} type="tel" autoComplete="tel" />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-label text-accent font-semibold tracking-[0.1em] uppercase">
          About your organisation
        </legend>

        <Field
          label="Organisation"
          name="organization"
          error={errors.organization?.message}
        >
          {(p) => (
            <Input {...p} {...register("organization")} autoComplete="organization" />
          )}
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Location" name="location" optional>
            {(p) => <Input {...p} {...register("location")} placeholder="e.g. Nairobi" />}
          </Field>

          <Field label="Industry or sector" name="sector" optional>
            {(p) => (
              <Select {...p} {...register("sector")} defaultValue="">
                <option value="">Select…</option>
                {sectorOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        <Field label="Organisation size" name="organizationSize" optional>
          {(p) => (
            <Select {...p} {...register("organizationSize")} defaultValue="">
              <option value="">Select…</option>
              {sizeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-label text-accent font-semibold tracking-[0.1em] uppercase">
          How we can help
        </legend>

        <Field
          label="What is the business or organisational challenge?"
          name="challenge"
          description="The more specific you can be, the more useful the first reply will be."
          error={errors.challenge?.message}
        >
          {(p) => <Textarea {...p} {...register("challenge")} rows={6} />}
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Area of support required" name="supportArea" optional>
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

          <Field label="Preferred contact method" name="preferredContact" optional>
            {(p) => (
              <Select {...p} {...register("preferredContact")} defaultValue="">
                <option value="">Select…</option>
                <option value="email">Email</option>
                <option value="telephone">Telephone</option>
                <option value="whatsapp">WhatsApp</option>
              </Select>
            )}
          </Field>
        </div>
      </fieldset>

      {/* Honeypot. Off-screen rather than display:none, and hidden from
          assistive tech, so a real user never encounters it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status.state === "error" && (
        <p role="alert" aria-live="polite" className="text-body text-danger">
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" disabled={submitting} className="self-start">
          {submitting ? "Sending…" : "Start a Conversation"}
        </Button>

        {/*
          OUTSTANDING (brief §9): the Privacy Policy is not written yet. This
          form collects name, email, telephone and organisation — personal data
          under Kenya's Data Protection Act 2019 — so it should not go live
          until this links to a real policy.
        */}
        <p className="text-small text-ink-muted">
          We use what you send only to reply to your enquiry.
        </p>
      </div>
    </form>
  );
}
