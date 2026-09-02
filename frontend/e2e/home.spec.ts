import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Home", () => {
  test("shows a continuous work, about, and contact flow", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
    await expect(page.getByText("15+")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frontend automation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "QA leadership for fintech and digital assets" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Let's improve release confidence." })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
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
