import Link from "next/link";
import { SITE_GITHUB, SITE_TITLE } from "@/lib/site";

function GitHubIcon() {
  return (
    <svg className="footer-social__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.3 0 .32.22.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63.3 12 .3z"
      />
    </svg>
  );
}

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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
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
            <a
              className="footer-link footer-social"
              href={SITE_GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
