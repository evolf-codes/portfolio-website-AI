import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SITE_EMAIL, SITE_LINKEDIN, SITE_LOCATION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact" title="Get in touch" />
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="contact-layout">
          <aside className="contact-aside">
            <p className="text-sm leading-relaxed text-[var(--graphite)]">
              Share a note about roles, consulting, or QA leadership. I read every message and
              respond when I can.
            </p>
            <div className="panel panel--muted contact-aside__card">
              <h2 className="text-sm font-semibold text-[var(--ink)]">Direct</h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--graphite)]">
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
            <Link href="/" className="text-link text-sm">
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
      </div>
    </div>
  );
}
