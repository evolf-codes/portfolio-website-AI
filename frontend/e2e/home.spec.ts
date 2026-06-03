import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Home", () => {
  test("shows name, highlights, and work grid", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
    await expect(page.getByText("13+")).toBeVisible();
    await expect(page.getByRole("link", { name: /Kanban board/i }).first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  test("redirects /work to home", async ({ page }) => {
    await page.goto("/work");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
  });

  test("work tile opens case study", async ({ page }) => {
    const project = WORK_PROJECTS[0]!;
    await page.goto("/");
    await page
      .getByRole("link", { name: new RegExp(project.title, "i") })
      .first()
      .click();
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
  });
});
