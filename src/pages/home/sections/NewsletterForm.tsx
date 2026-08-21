import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { env } from "@/lib/env";

const emailSchema = z.email("Enter an email address we can send to");

/**
 * Single-field capture from the reference's closing band.
 *
 * Kept separate from the enquiry path on purpose: a subscriber is not a lead,
 * and merging them would put people who wanted an article into Seiran's
 * business development process without asking.
 *
 * The endpoint is outstanding. Until it is set the field is disabled with a
 * visible explanation rather than silently accepting addresses and dropping
 * them, which is the worst of the available failures.
 */
export function NewsletterForm() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const configured = Boolean(env.VITE_NEWSLETTER_ENDPOINT);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(value.trim());
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }

    setState("sending");
    setMessage(null);
    try {
      const res = await fetch(env.VITE_NEWSLETTER_ENDPOINT as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setValue("");
    } catch {
      setState("error");
      setMessage("We could not sign you up just now. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <p role="status" aria-live="polite" className="text-body text-ink mt-8">
        You are on the list. The first piece will arrive when it is worth sending.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8">
      <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={value}
          disabled={!configured}
          aria-invalid={state === "error" ? true : undefined}
          aria-describedby={message ? "newsletter-message" : undefined}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" size="lg" disabled={!configured || state === "sending"}>
          {state === "sending" ? "Signing up…" : "Submit"}
        </Button>
      </div>

      {(message || !configured) && (
        <p
          id="newsletter-message"
          role={state === "error" ? "alert" : undefined}
          className={`text-small mt-3 ${state === "error" ? "text-danger" : "text-ink-muted"}`}
        >
          {message ?? "Sign-up opens once the mailing list is connected."}
        </p>
      )}
    </form>
  );
}
