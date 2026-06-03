"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/work/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group flex flex-col">
          <span className="site-header__brand text-sm font-semibold tracking-wide uppercase">
            Eric Volfson
          </span>
          <span className="site-header__tagline hidden text-[10px] font-medium tracking-wide uppercase sm:block">
            QA Leadership
          </span>
        </Link>
        <nav aria-label="Primary" className="flex gap-6 md:gap-8">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
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
