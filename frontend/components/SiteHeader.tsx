"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTIONS = ["home", "work", "about", "resume", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const nav = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#work", label: "Work", section: "work" },
  { href: "/#about", label: "About", section: "about" },
  { href: "/#resume", label: "Resume", section: "resume" },
  { href: "/#contact", label: "Contact", section: "contact" },
] as const;

const HEADER_OFFSET_PX = 96;

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
  let current: SectionId = "home";

  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - HEADER_OFFSET_PX <= 1) {
      current = id;
    }
  }

  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  if (scrolledToBottom) {
    return "contact";
  }

  return current;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId | null>(() =>
    sectionFromLocation(pathname, ""),
  );

  useEffect(() => {
    const syncFromPath = () => {
      setActiveSection(sectionFromLocation(pathname, window.location.hash));
    };

    syncFromPath();

    if (pathname !== "/") {
      return;
    }

    let frame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveSection(sectionFromScroll());
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("hashchange", syncFromPath);
    window.addEventListener("resize", updateFromScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("hashchange", syncFromPath);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/#home" className="group flex flex-col">
          <span className="site-header__brand text-sm font-semibold tracking-wide uppercase">
            Eric Volfson
          </span>
          <span className="site-header__tagline hidden text-[10px] font-medium tracking-wide uppercase sm:block">
            QA Leadership
          </span>
        </Link>
        <nav aria-label="Primary" className="flex gap-4 sm:gap-6 md:gap-8">
          {nav.map((item) => {
            const active = activeSection === item.section;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`text-sm transition-colors ${
                  active ? "site-header__link site-header__link--active" : "site-header__link"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
