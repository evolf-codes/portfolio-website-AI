import type { Metadata } from "next";
import { HomeIntro } from "@/components/HomeIntro";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <HomeIntro />
      <section className="border-t border-[var(--border)] bg-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <p className="page-hero__eyebrow text-xs font-semibold tracking-[0.2em] uppercase">
            Work
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
            Quality engineering in practice
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--graphite)] md:text-base">
            Selected projects and automation examples that demonstrate test strategy, tooling,
            and delivery at a senior QA level.
          </p>
          <div className="mt-10">
            <WorkGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
