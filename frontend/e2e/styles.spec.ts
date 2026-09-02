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
    expect(css).toContain("safe-area-inset");
    expect(css).toContain("scroll-padding-top");
    expect(css).toContain("--brand:");
    expect(css).toContain(".btn-primary");
    expect(css).toContain(".site-header");
    expect(css).toContain(".page-hero");
    expect(css).toContain(".contact-form");
    expect(css).toContain(".type-eyebrow");
    expect(css).toContain(".page-main");
  });

  test("home page shows styled name and cohesive intro type", async ({ page }) => {
    await page.goto("/");

    const name = page.getByRole("heading", { level: 1, name: "Eric Volfson" });
    await expect(name).toBeVisible();
    const fontSize = await name.evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThan(32);

    const taglineSize = await page.locator(".home-intro__tagline").evaluate((el) => getComputedStyle(el).fontSize);
    const copySize = await page.locator(".home-intro__copy p").first().evaluate((el) => getComputedStyle(el).fontSize);
    const workBodySize = await page.locator(".work-showcase .type-body").first().evaluate((el) => getComputedStyle(el).fontSize);
    const sectionTitleSize = await page
      .locator(".type-section-title")
      .first()
      .evaluate((el) => getComputedStyle(el).fontSize);
    const workTitleSize = await page
      .locator(".work-showcase__title")
      .first()
      .evaluate((el) => getComputedStyle(el).fontSize);
    const contactTitleSize = await page
      .locator(".contact-flow__title")
      .evaluate((el) => getComputedStyle(el).fontSize);

    expect(taglineSize).toBe(copySize);
    expect(taglineSize).toBe(workBodySize);
    expect(parseFloat(sectionTitleSize)).toBeGreaterThan(parseFloat(workTitleSize));
    expect(parseFloat(workTitleSize)).toBeGreaterThan(parseFloat(taglineSize));
    expect(Math.abs(parseFloat(sectionTitleSize) - parseFloat(contactTitleSize))).toBeLessThan(1);

    const showcase = page.locator(".work-showcase");
    await expect(showcase).toBeVisible();
    await expect(page.getByRole("link", { name: /Frontend automation/i }).first()).toBeVisible();
  });
});
