import type { Metadata } from "next";
import { HomeIntro } from "@/components/HomeIntro";
import { ContactForm } from "@/components/ContactForm";
import { ResumeDownloads } from "@/components/ResumeDownloads";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { WorkShowcase } from "@/components/WorkShowcase";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <HomeIntro />
      <section id="resume" className="page-section">
        <div className="page-section__inner">
          <SectionHeading title="Resume" />
          <ResumeDownloads />
        </div>
      </section>
      <section id="work" className="page-section">
        <div className="page-section__inner">
          <SectionHeading
            eyebrow="Work"
            title="Selected work"
            description="Delivery visibility, AI-assisted QA, and automation you can inspect."
          />
          <WorkShowcase />
        </div>
      </section>
      <section id="contact" className="contact-flow">
        <div className="page-section__inner contact-flow__inner">
          <div>
            <p className="type-eyebrow contact-flow__eyebrow">Contact</p>
            <h2 className="contact-flow__title mt-3">Let&apos;s talk.</h2>
            <p className="contact-flow__copy mt-5">
              Share the role, the team, or the challenge — or email{" "}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
            </p>
          </div>
          <div className="contact-flow__form">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
