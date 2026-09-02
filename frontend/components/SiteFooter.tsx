import Link from "next/link";
import { SITE_LINKEDIN, SITE_TITLE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="site-footer__brand text-sm font-semibold tracking-wide uppercase">
              Eric Volfson
            </p>
            <p className="site-footer__tagline mt-1 text-xs">{SITE_TITLE}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs">
            <Link className="footer-link" href="/#work">
              Work
            </Link>
            <Link className="footer-link" href="/#about">
              About
            </Link>
            <Link className="footer-link" href="/#resume">
              Resume
            </Link>
            <Link className="footer-link" href="/#contact">
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
