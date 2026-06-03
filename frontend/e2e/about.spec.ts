import { expect, test } from "@playwright/test";

test.describe("About", () => {
  test("shows name and a mailto link", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { level: 1, name: "Eric Volfson" }),
    ).toBeVisible();
    const mail = page.getByRole("complementary").getByRole("link", {
      name: /58_bent\.sleigh@icloud\.com/i,
    });
    await expect(mail).toHaveAttribute("href", /^mailto:58_bent\.sleigh@icloud\.com/);
  });

});
