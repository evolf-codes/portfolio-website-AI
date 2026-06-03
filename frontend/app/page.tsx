import type { Metadata } from "next";
import { HomeIntro } from "@/components/HomeIntro";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <HomeIntro />
      <section className="page-section">
        <div className="page-section__inner">
          <SectionHeading
            eyebrow="Work"
            title="Quality engineering in practice"
            description="Selected projects and automation examples that demonstrate test strategy, tooling, and delivery at a senior QA level."
          />
          <div className="mt-10">
            <WorkGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
