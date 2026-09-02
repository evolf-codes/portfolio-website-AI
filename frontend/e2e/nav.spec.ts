import { expect, test } from "@playwright/test";

test.describe("Nav active state", () => {
  test("underlines About at the top and Work after opening the work section", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "true");

    await nav.getByRole("link", { name: "Resume" }).click();
    await expect(page.locator("#resume")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Resume" })).toHaveClass(/site-header__link--active/);
    await expect(nav.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current", "true");

    await nav.getByRole("link", { name: "Work" }).click();
    await expect(page.locator("#work")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true", {
      timeout: 3000,
    });
  });

  test("keeps Work underlined on case study pages", async ({ page }) => {
    await page.goto("/work/frontend-automation");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true");
  });
});
