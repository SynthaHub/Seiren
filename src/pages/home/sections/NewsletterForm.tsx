import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
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
 * The endpoint is outstanding, and the one thing that must not happen is
 * silently accepting an address and dropping it. That used to be enforced by
 * disabling the field — which also meant the only text input on the footer of
 * every page could not be typed into, and read as broken rather than as
 * pending. The field now behaves normally and the submit says plainly that
 * sign-up is not open yet, which keeps the guarantee without the dead control.
 */
export function NewsletterForm() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<
    "idle" | "sending" | "done" | "error" | "unavailable"
  >("idle");
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

    // Not an error the reader made, so it is announced as a status and styled
    // as one. Nothing is stored: saying so is the honest version.
    if (!configured) {
      setState("unavailable");
      setMessage(
        "Sign-up is not open yet — the mailing list is still being connected, so this address has not been stored. Send an enquiry and we will add you by hand.",
      );
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
      <p
        role="status"
        aria-live="polite"
        className="text-body text-ink animate-rise-in mt-8"
      >
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
          aria-invalid={state === "error" ? true : undefined}
          aria-describedby={message || !configured ? "newsletter-message" : undefined}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* The spinner is the only one on the site, and it is here because a
            network round trip is the only thing a reader has to wait on. The
            label changes too, so the state is not carried by motion alone. */}
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
          {state === "sending" ? "Signing up…" : "Submit"}
        </Button>
      </div>

      {(message || !configured) && (
        <p
          id="newsletter-message"
          role={
            state === "error" ? "alert" : state === "unavailable" ? "status" : undefined
          }
          className={`text-small mt-3 ${state === "error" ? "text-danger" : "text-ink-muted"} ${message ? "animate-rise-in" : ""}`}
        >
          {message ?? "Sign-up opens once the mailing list is connected."}
        </p>
      )}
    </form>
  );
}
