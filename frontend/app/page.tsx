import type { Metadata } from "next";
import { HomeIntro } from "@/components/HomeIntro";
import { ContactForm } from "@/components/ContactForm";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { ResumeDownloads } from "@/components/ResumeDownloads";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { WorkShowcase } from "@/components/WorkShowcase";
import { CORE_SKILLS, PROFILE_SUMMARY } from "@/lib/profile";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <HomeIntro />
      <section id="about" className="page-section page-section--white">
        <div className="page-section__inner about-flow">
          <SectionHeading eyebrow="About" title="Quality leadership that scales with the product" />
          <div className="about-flow__content">
            <div className="about-flow__profile">
              <ProfilePhoto className="profile-photo--about" />
              <div className="space-y-4">
                {PROFILE_SUMMARY.map((item) => (
                  <p key={item} className="type-body">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 content-start">
              {CORE_SKILLS.slice(0, 8).map((skill) => (
                <li key={skill} className="skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
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
            description="Leadership, AI-assisted quality, and automation samples that show how I keep releases clear and defensible."
          />
          <WorkShowcase />
        </div>
      </section>
      <section id="contact" className="contact-flow">
        <div className="page-section__inner contact-flow__inner">
          <div>
            <p className="type-eyebrow contact-flow__eyebrow">Contact</p>
            <h2 className="contact-flow__title mt-3">Ready to talk quality leadership.</h2>
            <p className="contact-flow__copy mt-5">
              Tell me about the role, the team, or the delivery challenge. You can also email{" "}
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
