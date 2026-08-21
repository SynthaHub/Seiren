import { z } from "zod";
import { env } from "@/lib/env";

/**
 * The eleven fields are fixed by the content brief §8.
 *
 * Only four are required. Eleven required fields on a first contact would cost
 * completions, and Seiran can reply with name, email, organisation and a
 * description of the problem — everything else helps route the enquiry but does
 * not gate it.
 *
 * Messages are written for the person filling the form: what is wrong and how
 * to fix it, never Zod's defaults.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  organization: z.string().trim().min(1, "Enter your organisation's name"),
  email: z.email("Enter an email address we can reply to"),
  challenge: z
    .string()
    .trim()
    .min(20, "A sentence or two about the situation helps us reply usefully"),

  position: z.string().trim().optional(),
  telephone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  sector: z.string().trim().optional(),
  organizationSize: z.string().trim().optional(),
  supportArea: z.string().trim().optional(),
  preferredContact: z.enum(["email", "telephone", "whatsapp"]).optional(),

  /**
   * Honeypot. Hidden from sighted users and from assistive technology, so only
   * a bot filling every field will populate it. Paired with a minimum
   * time-to-submit this stops most automated spam without a CAPTCHA, which on a
   * lead form costs real conversions.
   */
  website: z.string().max(0, "").optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export const sectorOptions = [
  "Retail",
  "Wholesale",
  "Food & hospitality",
  "Professional & business services",
  "Agribusiness",
  "Private schools & education",
  "Faith-based or mission-driven",
  "Other",
] as const;

export const sizeOptions = [
  "1–10 people",
  "11–50 people",
  "51–200 people",
  "More than 200 people",
] as const;

export const supportOptions = [
  "Strategy & Growth",
  "Operations & Business Systems",
  "People & Organization",
  "Business Performance",
  "Not sure yet",
] as const;

export class EnquiryError extends Error {
  constructor(
    readonly kind: "network" | "server" | "unconfigured",
    message: string,
  ) {
    super(message);
    this.name = "EnquiryError";
  }
}

export async function submitEnquiry(values: EnquiryValues): Promise<void> {
  if (!env.VITE_ENQUIRY_ENDPOINT) {
    throw new EnquiryError(
      "unconfigured",
      "The enquiry endpoint is not configured yet. Set VITE_ENQUIRY_ENDPOINT.",
    );
  }

  // The honeypot is never transmitted; it exists only to be checked.
  const { website: _honeypot, ...payload } = values;

  let response: Response;
  try {
    response = await fetch(env.VITE_ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new EnquiryError("network", "Could not reach the server.");
  }

  // fetch only rejects on network failure — a 500 resolves with ok: false.
  if (!response.ok) {
    throw new EnquiryError("server", `Enquiry endpoint returned ${response.status}.`);
  }
}
