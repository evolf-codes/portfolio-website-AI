import { expect, test } from "@playwright/test";

test.describe("Journey", () => {
  test("shows career timeline and education", async ({ page }) => {
    await page.goto("/journey");
    await expect(
      page.getByRole("heading", { level: 1, name: /trading floors to global platforms/i }),
    ).toBeVisible();
    await expect(page.getByText("Confidential", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quality Assurance Manager" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Senior Quality Assurance Consultant" })).toBeVisible();
    await expect(page.getByText("Toronto Stock Exchange (TMX)").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Education" })).toBeVisible();
    await expect(page.getByText("York University")).toBeVisible();
  });
});
