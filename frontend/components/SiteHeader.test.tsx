import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("SiteHeader", () => {
  it("renders About, Resume, Work, and Contact section anchors", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/#about",
      "/#resume",
      "/#work",
      "/#contact",
    ]);
  });

  it("marks About active on the home route by default", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const about = within(nav).getByRole("link", { name: "About" });
    expect(about.className).toContain("site-header__link--active");
    expect(about).toHaveAttribute("aria-current", "true");
  });

  it("marks Work active on project routes", () => {
    vi.mocked(usePathname).mockReturnValue("/work/gantt-schedules");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const work = within(nav).getByRole("link", { name: "Work" });
    expect(work.className).toContain("site-header__link--active");
  });

  it("marks About active on about and journey routes", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    const { rerender } = render(<SiteHeader />);
    let nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "About" }).className).toContain(
      "site-header__link--active",
    );

    vi.mocked(usePathname).mockReturnValue("/journey");
    rerender(<SiteHeader />);
    nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "About" }).className).toContain(
      "site-header__link--active",
    );
  });
});
