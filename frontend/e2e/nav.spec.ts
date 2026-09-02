import { expect, test } from "@playwright/test";

test.describe("Nav active state", () => {
  test("underlines Home at the top and Work after scrolling to work", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "true");

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }).click();
    await expect(page.locator("#resume")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Resume" })).toHaveAttribute("aria-current", "true");
    await expect(nav.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current", "true");

    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true");
  });

  test("keeps Work underlined on case study pages", async ({ page }) => {
    await page.goto("/work/frontend-automation");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true");
  });
});
