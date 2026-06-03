import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageMain } from "@/components/layout/PageMain";
import { PanelHeading } from "@/components/layout/PanelHeading";
import { SectionHeading } from "@/components/layout/SectionHeading";
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

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero eyebrow="About" title="Eric Volfson" description={SITE_TITLE} />
      <PageMain>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <section className="space-y-6">
            <SectionHeading title="Profile" as="h2" />
            <ul className="space-y-3">
              {PROFILE_SUMMARY.map((item) => (
                <li key={item} className="list-bullet">
                  <span className="list-bullet__dot" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="type-body-muted">
              I combine hands-on testing with leadership that keeps quality visible early:
              sprint planning, environment reliability, performance validation, and automation
              that supports release confidence in regulated, high-volume systems.
            </p>
            <Link href="/journey" className="text-link inline-flex text-sm font-medium">
              Read the full career journey
            </Link>
          </section>

          <aside className="space-y-6">
            <div className="panel panel--muted p-6">
              <PanelHeading>Contact</PanelHeading>
              <ul className="mt-4 space-y-2 type-body">
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
              <PanelHeading>Certifications</PanelHeading>
              <ul className="mt-4 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name} className="type-body">
                    <span className="font-medium text-[var(--slate)]">{cert.year}</span>
                    {" · "}
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-12 md:mt-16">
          <SectionHeading title="Core skills" as="h2" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {CORE_SKILLS.map((skill) => (
              <li key={skill} className="skill-pill">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </PageMain>
    </div>
  );
}
