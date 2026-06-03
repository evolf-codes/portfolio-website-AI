import type { Metadata } from "next";
import { CareerTimeline } from "@/components/CareerTimeline";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Career Journey",
  description:
    "Eric Volfson's QA career across Kraken, TMX Group, and capital markets leadership.",
};

export default function JourneyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Career journey"
        title="From trading floors to global crypto platforms"
        description="A progression through capital markets quality engineering: environment management, technical test leadership, and senior QA consulting at scale."
      />
      <CareerTimeline />
    </div>
  );
}
