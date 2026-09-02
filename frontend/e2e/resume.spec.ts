import { expect, test } from "@playwright/test";

test.describe("Resume", () => {
  test("nav opens resume section with direct file links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }).click();
    await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "/resume/eric-volfson-qa-manager-2-page.pdf",
    );
    await expect(page.getByRole("link", { name: "View DOCX" })).toHaveAttribute(
      "href",
      "/resume/eric-volfson-qa-manager-2-page.docx",
    );
  });

  test("resume files are served", async ({ request }) => {
    const pdf = await request.get("/resume/eric-volfson-qa-manager-2-page.pdf");
    expect(pdf.ok()).toBeTruthy();
    expect(pdf.headers()["content-type"]).toContain("application/pdf");

    const docx = await request.get("/resume/eric-volfson-qa-manager-2-page.docx");
    expect(docx.ok()).toBeTruthy();
    expect(docx.headers()["content-type"]).toMatch(/wordprocessingml|octet-stream|msword/i);
  });
});
