import type { Metadata } from "next";
import Link from "next/link";
import {
  CERTIFICATIONS,
  CORE_SKILLS,
  PROFILE_SUMMARY,
} from "@/lib/profile";
import {
  SITE_EMAIL,
  SITE_LINKEDIN,
  SITE_LOCATION,
  SITE_TITLE,
} from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero eyebrow="About" title="Eric Volfson" description={SITE_TITLE} />
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-[var(--ink)]">Profile</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--graphite)]">
              {PROFILE_SUMMARY.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--mist)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-[var(--slate)]">
              I combine hands-on testing with leadership that keeps quality visible early:
              sprint planning, environment reliability, performance validation, and automation
              that supports release confidence in regulated, high-volume systems.
            </p>
            <Link
              href="/journey"
              className="text-link inline-flex text-sm"
            >
              Read the full career journey
            </Link>
          </section>

          <aside className="space-y-6">
            <div className="panel panel--muted p-6">
              <h2 className="text-sm font-semibold text-[var(--ink)]">Contact</h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--graphite)]">
                <li>
                  <a className="text-link" href={`mailto:${SITE_EMAIL}`}>
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>{SITE_LOCATION}</li>
                <li>
                  <a className="text-link" href={SITE_LINKEDIN} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="panel p-6">
              <h2 className="text-sm font-semibold text-[var(--ink)]">Certifications</h2>
              <ul className="mt-4 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name} className="text-sm text-[var(--graphite)]">
                    <span className="font-medium text-[var(--slate)]">{cert.year}</span>
                    {" · "}
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[var(--ink)]">Core skills</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CORE_SKILLS.map((skill) => (
              <li key={skill} className="skill-pill">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
