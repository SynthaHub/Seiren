import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/pages/contact/ContactPage";
import { faqs } from "@/content/faqs";
import { faqJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    ...seo({
      title: "Start a Conversation | Seiran Partners",
      description:
        "Tell us what your business is dealing with. The first conversation is a discussion of your situation, not a pitch.",
      path: "/contact",
    }),
    // The brief's eleven questions are real search queries, so they are marked
    // up as FAQPage and can surface directly in results.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(faqs)),
      },
    ],
  }),
});
