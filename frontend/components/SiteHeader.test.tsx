import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("SiteHeader", () => {
  it("renders Home before Journey, About, and Contact", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    expect(links[0]).toHaveTextContent("Home");
    expect(links[0]).toHaveAttribute("href", "/");
    expect(within(nav).getByRole("link", { name: "Journey" })).toHaveAttribute(
      "href",
      "/journey",
    );
  });

  it("marks Home active on project routes", () => {
    vi.mocked(usePathname).mockReturnValue("/work/kanban");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home.className).toContain("site-header__link--active");
  });
});
