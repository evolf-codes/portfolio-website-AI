import Link from "next/link";
import { HOME_HIGHLIGHTS } from "@/lib/home-highlights";
import { SITE_EMAIL, SITE_LINKEDIN, SITE_TITLE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__highlights border-t border-[var(--border)] bg-[var(--white)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_HIGHLIGHTS.map((item) => (
            <div key={item.value} className="stat-card">
              <p className="stat-card__value">{item.value}</p>
              <p className="stat-card__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="site-footer__bar">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="site-footer__brand text-sm font-semibold tracking-wide uppercase">
              Eric Volfson
            </p>
            <p className="site-footer__tagline mt-1 text-xs">{SITE_TITLE}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs">
            <a className="footer-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>
            <Link className="footer-link" href="/">
              Home
            </Link>
            <Link className="footer-link" href="/journey">
              Journey
            </Link>
            <Link className="footer-link" href="/about">
              About
            </Link>
            <Link className="footer-link" href="/contact">
              Contact
            </Link>
            <a className="footer-link" href={SITE_LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
