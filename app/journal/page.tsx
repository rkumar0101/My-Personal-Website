import type { Metadata } from "next";
import { ConstructionInProgress } from "@/components/ui/ConstructionInProgress";

export const metadata: Metadata = {
  title: "Personal Journal — Rishav Kumar",
  description:
    "Unfiltered personal views, day-to-day notes, half-formed ideas. Coming soon.",
};

export default function JournalPage() {
  return (
    <ConstructionInProgress
      pageTitle="Personal journal"
      description="A private-feeling corner of the site for unfiltered thinking. No SEO, no clients, no editor. Day-to-day notes, half-formed ideas, late-night letters."
      features={[
        "Email signup for new entries",
        "Hindi and English mix as they come",
        "Archive going back to 2020",
        "Tagged by mood + topic",
        "No comments, no analytics, just writing",
      ]}
      progress={20}
      eta="Late 2026"
      backHref="/"
      backLabel="Back to home"
    />
  );
}
