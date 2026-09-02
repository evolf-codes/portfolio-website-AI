import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Home", () => {
  test("shows a continuous work, about, resume, and contact flow", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
    await expect(page.getByRole("img", { name: /Eric Volfson/i }).first()).toBeVisible();
    await expect(page.getByText("Toronto, ON, Canada — Remote First")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Jira tracking & documentation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI-assisted quality engineering" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frontend automation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quality leadership that scales with the product" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "/resume/eric-volfson-qa-manager-2-page.pdf",
    );
    await expect(page.getByRole("heading", { name: "Ready to talk quality leadership." })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#home");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/#resume");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/eric-v-aa45ab79/",
    );
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/evolf-codes",
    );
    await expect(page.getByRole("contentinfo").getByText(/@/)).toHaveCount(0);
  });

  test("redirects /work to home", async ({ page }) => {
    await page.goto("/work");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
  });

  test("work showcase opens a case study", async ({ page }) => {
    const project = WORK_PROJECTS[0]!;
    await page.goto("/");
    await page
      .getByRole("link", { name: new RegExp(project.title, "i") })
      .first()
      .click();
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
  });
});
