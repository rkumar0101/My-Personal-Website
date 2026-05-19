import type { Metadata } from "next";
import { ConstructionInProgress } from "@/components/ui/ConstructionInProgress";

export const metadata: Metadata = {
  title: "Portfolio — Rishav Kumar",
  description:
    "Every writing sample and web build, indexed. Coming soon.",
};

export default function PortfolioPage() {
  return (
    <ConstructionInProgress
      pageTitle="Portfolio"
      description="The full portfolio with case studies, metrics, and detailed write-ups is being built. For now, the home page shows the featured selection."
      features={[
        "Searchable archive of every piece",
        "Detailed case studies for each web project",
        "Metrics and results per writing piece",
        "Filter by client, year, and category",
        "Stack and role breakdown per project",
      ]}
      progress={45}
      eta="Q3 2026"
      backHref="/"
      backLabel="Back to home"
    />
  );
}
