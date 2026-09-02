import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("SiteHeader", () => {
  it("renders Work, About, Resume, and Contact section anchors", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/#work",
      "/#about",
      "/#resume",
      "/#contact",
    ]);
  });

  it("marks Work active on project routes", () => {
    vi.mocked(usePathname).mockReturnValue("/work/kanban");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const work = within(nav).getByRole("link", { name: "Work" });
    expect(work.className).toContain("site-header__link--active");
  });
});
