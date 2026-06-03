import { expect, test } from "@playwright/test";

test.describe("Contact", () => {
  test("shows validation when submitted empty", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1, name: "Get in touch" })).toBeVisible();
    await page.locator("form[data-client-ready='true']").waitFor();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: /please complete your name and email/i }),
    ).toBeVisible();
  });

  test("submit sends via API and confirms delivery", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, to: "58_bent.sleigh@icloud.com" }),
      });
    });

    await page.goto("/contact");
    await page.locator("form[data-client-ready='true']").waitFor();

    await page.getByLabel("First name").fill("Jane");
    await page.getByLabel("Last name").fill("Doe");
    await page.getByLabel("Email address").fill("jane@example.com");
    await page.getByLabel("Subject").fill("Portfolio inquiry");
    await page.getByLabel("Message").fill("Interested in discussing QA leadership.");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Thanks", { exact: true })).toBeVisible();
  });
});
