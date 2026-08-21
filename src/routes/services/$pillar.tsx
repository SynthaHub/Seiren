import { createFileRoute, notFound } from "@tanstack/react-router";
import { servicePillars } from "@/content/services";
import { PillarPage } from "@/pages/services/PillarPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$pillar")({
  loader: ({ params }) => {
    const pillar = servicePillars.find((p) => p.slug === params.pillar);
    // A bad slug is a 404, not an empty page — an empty page would be indexed.
    if (!pillar) throw notFound();
    return { pillar };
  },
  component: PillarRoute,
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return seo({
      title: `${loaderData.pillar.title} | Seiran Partners`,
      description: loaderData.pillar.summary,
      path: `/services/${params.pillar}`,
    });
  },
});

function PillarRoute() {
  const { pillar } = Route.useLoaderData();
  return <PillarPage pillar={pillar} />;
}
