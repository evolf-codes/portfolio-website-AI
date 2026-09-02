import Link from "next/link";
import { SITE_TITLE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__brand font-semibold tracking-wide uppercase">
              Eric Volfson
            </p>
            <p className="site-footer__tagline mt-1">{SITE_TITLE}</p>
          </div>
          <nav aria-label="Footer" className="site-footer__nav">
            <Link className="footer-link" href="/#about">
              About
            </Link>
            <Link className="footer-link" href="/#resume">
              Resume
            </Link>
            <Link className="footer-link" href="/#work">
              Work
            </Link>
            <Link className="footer-link" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
