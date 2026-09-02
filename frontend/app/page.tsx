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
      <section id="work" className="page-section scroll-mt-20">
        <div className="page-section__inner">
          <SectionHeading
            eyebrow="Work"
            title="Quality engineering in practice"
            description="Short samples that show what was tested, which practice site was used, and what a good result looks like."
          />
          <WorkShowcase />
        </div>
      </section>
      <section id="about" className="page-section page-section--white scroll-mt-20">
        <div className="page-section__inner about-flow">
          <SectionHeading eyebrow="About" title="QA leadership for fintech and digital assets" />
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
      <section id="resume" className="page-section scroll-mt-20">
        <div className="page-section__inner">
          <SectionHeading
            eyebrow="Resume"
            title="View a current resume"
            description="Open the short 2-page resume or the detailed version. PDF opens in the browser; DOCX is available for the 2-page file."
          />
          <ResumeDownloads />
        </div>
      </section>
      <section id="contact" className="contact-flow scroll-mt-20">
        <div className="page-section__inner contact-flow__inner">
          <div>
            <p className="type-eyebrow contact-flow__eyebrow">Contact</p>
            <h2 className="contact-flow__title mt-3">Let&apos;s improve release confidence.</h2>
            <p className="contact-flow__copy mt-5">
              Share a role, delivery challenge, or QA leadership opportunity. You can also email{" "}
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
