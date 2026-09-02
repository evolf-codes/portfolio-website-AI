import { expect, test } from "@playwright/test";

test.describe("Resume", () => {
  test("nav opens resume section with both PDF downloads", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }).click();
    await expect(page.getByRole("heading", { name: "Download a current resume" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "2-page resume" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Detailed resume" })).toBeVisible();

    const links = page.getByRole("link", { name: "Download PDF" });
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute("href", "/resume/eric-volfson-qa-manager-2-page.pdf");
    await expect(links.nth(1)).toHaveAttribute("href", "/resume/eric-volfson-qa-manager-detailed.pdf");
  });

  test("resume PDFs are served", async ({ request }) => {
    for (const path of [
      "/resume/eric-volfson-qa-manager-2-page.pdf",
      "/resume/eric-volfson-qa-manager-detailed.pdf",
    ]) {
      const response = await request.get(path);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()["content-type"]).toContain("application/pdf");
    }
  });
});
