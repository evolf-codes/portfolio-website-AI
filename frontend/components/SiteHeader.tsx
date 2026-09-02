"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SECTIONS = ["home", "work", "about", "resume", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const nav = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#work", label: "Work", section: "work" },
  { href: "/#about", label: "About", section: "about" },
  { href: "/#resume", label: "Resume", section: "resume" },
  { href: "/#contact", label: "Contact", section: "contact" },
] as const;

function headerOffsetPx() {
  if (typeof window === "undefined") return 88;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-offset")
    .trim();
  const rem = Number.parseFloat(raw);
  if (!Number.isFinite(rem)) return 88;
  const rootFont = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return rem * rootFont;
}

function sectionFromLocation(pathname: string, hash: string): SectionId | null {
  if (pathname.startsWith("/work")) return "work";
  if (pathname === "/about" || pathname === "/journey") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname !== "/") return null;

  const fromHash = hash.replace(/^#/, "") as SectionId;
  if (SECTIONS.includes(fromHash)) return fromHash;
  return "home";
}

function sectionFromScroll(): SectionId {
  const offset = headerOffsetPx() + 8;
  let current: SectionId = "home";

  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - offset <= 0) {
      current = id;
    }
  }

  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12;
  if (scrolledToBottom) {
    return "contact";
  }

  return current;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId | null>(() =>
    sectionFromLocation(pathname, ""),
  );
  const pinnedSection = useRef<SectionId | null>(null);
  const pinTimer = useRef<number | null>(null);

  useEffect(() => {
    const syncFromPath = () => {
      const next = sectionFromLocation(pathname, window.location.hash);
      if (!pinnedSection.current) {
        setActiveSection(next);
      }
    };

    syncFromPath();

    if (pathname !== "/") {
      return;
    }

    let frame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (pinnedSection.current) {
          setActiveSection(pinnedSection.current);
          return;
        }
        setActiveSection(sectionFromScroll());
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("hashchange", syncFromPath);
    window.addEventListener("resize", updateFromScroll);

    return () => {
      cancelAnimationFrame(frame);
      if (pinTimer.current) window.clearTimeout(pinTimer.current);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("hashchange", syncFromPath);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [pathname]);

  function activateSection(section: SectionId) {
    setActiveSection(section);
    pinnedSection.current = section;
    if (pinTimer.current) window.clearTimeout(pinTimer.current);
    pinTimer.current = window.setTimeout(() => {
      pinnedSection.current = null;
      if (window.location.pathname === "/") {
        setActiveSection(sectionFromScroll());
      }
    }, 1000);
  }

  function handleSectionNav(
    event: React.MouseEvent<HTMLAnchorElement>,
    section: SectionId,
    href: string,
  ) {
    activateSection(section);

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
    window.history.replaceState(null, "", href);
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__brand-block group flex flex-col"
          onClick={() => activateSection("home")}
        >
          <span className="site-header__brand text-sm font-semibold tracking-wide uppercase">
            Eric Volfson
          </span>
          <span className="site-header__tagline hidden text-[10px] font-medium tracking-wide uppercase sm:block">
            QA Leadership
          </span>
        </Link>
        <nav aria-label="Primary" className="site-header__nav">
          {nav.map((item) => {
            const active = activeSection === item.section;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                onClick={(event) => handleSectionNav(event, item.section, item.href)}
                className={`transition-colors ${
                  active ? "site-header__link site-header__link--active" : "site-header__link"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
