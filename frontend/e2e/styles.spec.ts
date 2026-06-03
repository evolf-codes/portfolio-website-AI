import { expect, test } from "@playwright/test";

test.describe("Site styles", () => {
  test("loads stylesheet with layout and component rules", async ({ page, request }) => {
    await page.goto("/");

    const stylesheet = page.locator('link[rel="stylesheet"]').first();
    await expect(stylesheet).toHaveAttribute("href", /\/_next\/static\/chunks\/.+\.css/);

    const href = await stylesheet.getAttribute("href");
    expect(href).toBeTruthy();

    const cssResponse = await request.get(href!);
    expect(cssResponse.status(), `CSS failed: ${href}`).toBe(200);

    const css = await cssResponse.text();
    expect(css).toContain(".btn-primary");
    expect(css).toContain(".site-header");
    expect(css).toContain(".page-hero");
    expect(css).toContain(".contact-form");
    expect(css).toContain(".type-eyebrow");
    expect(css).toContain(".page-main");
  });

  test("home page shows styled name and work tiles", async ({ page }) => {
    await page.goto("/");

    const name = page.getByRole("heading", { level: 1, name: "Eric Volfson" });
    await expect(name).toBeVisible();
    const fontSize = await name.evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThan(32);

    const tile = page.getByRole("link", { name: /Kanban board/i }).first();
    await expect(tile).toBeVisible();
    await expect(tile).toHaveClass(/work-card/);
  });
});
