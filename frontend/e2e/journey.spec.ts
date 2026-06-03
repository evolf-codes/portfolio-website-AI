import { expect, test } from "@playwright/test";

test.describe("Journey", () => {
  test("shows career timeline and education", async ({ page }) => {
    await page.goto("/journey");
    await expect(
      page.getByRole("heading", { level: 1, name: /trading floors to global crypto/i }),
    ).toBeVisible();
    await expect(
      page.getByText("Confidential — Kraken Digital Asset Exchange"),
    ).toBeVisible();
    await expect(page.getByText("TMX Group (Toronto Stock Exchange)").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Education" })).toBeVisible();
    await expect(page.getByText("York University")).toBeVisible();
  });
});
