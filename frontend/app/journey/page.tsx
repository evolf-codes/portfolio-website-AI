import type { Metadata } from "next";
import { CareerTimeline } from "@/components/CareerTimeline";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Career Journey",
  description:
    "Eric Volfson's QA career across digital assets, Toronto Stock Exchange (TMX), and capital markets leadership.",
};

export default function JourneyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Career journey"
        title="From trading floors to global platforms"
        description="Capital markets quality engineering through environment management, technical leadership, senior consulting, and QA management."
      />
      <CareerTimeline />
    </div>
  );
}
