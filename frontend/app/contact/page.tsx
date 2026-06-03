import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { PageMain } from "@/components/layout/PageMain";
import { PanelHeading } from "@/components/layout/PanelHeading";
import { SITE_EMAIL, SITE_LINKEDIN, SITE_LOCATION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Share a note about roles, consulting, or QA leadership. I read every message and respond when I can."
      />
      <PageMain>
        <div className="contact-layout">
          <aside className="contact-aside">
            <div className="panel panel--muted contact-aside__card">
              <PanelHeading>Direct</PanelHeading>
              <ul className="mt-4 space-y-2 type-body">
                <li>
                  <a className="text-link" href={`mailto:${SITE_EMAIL}`}>
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>{SITE_LOCATION}</li>
                <li>
                  <a
                    className="text-link"
                    href={SITE_LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <Link href="/" className="text-link inline-flex text-sm font-medium">
              View work
            </Link>
          </aside>

          <section className="panel contact-form-panel" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="sr-only">
              Contact form
            </h2>
            <ContactForm />
          </section>
        </div>
      </PageMain>
    </div>
  );
}
