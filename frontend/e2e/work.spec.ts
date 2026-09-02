import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Work", () => {
  test("each showcase item opens its case study", async ({ page }) => {
    for (const project of WORK_PROJECTS) {
      await page.goto("/");
      await page
        .getByRole("link", { name: new RegExp(project.title, "i") })
        .first()
        .click();
      await expect(
        page.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();

      await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Focus" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Tools" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
      await expect(page.getByText(project.about)).toBeVisible();

      const sourceLink = page.getByRole("link", { name: "View project files" });
      if (project.sourcePath) {
        await expect(sourceLink).toBeVisible();
        await expect(sourceLink).toHaveAttribute(
          "href",
          new RegExp(`github\\.com/.*/${project.sourcePath.replace(/\/$/, "")}`),
        );
      } else {
        await expect(sourceLink).toHaveCount(0);
      }
    }
  });

  test("case study shows output evidence without a decorative hero image", async ({ page }) => {
    await page.goto("/work/performance-testing");

    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
    await expect(page.getByRole("img", { name: /Restful Booker|performance/i })).toBeVisible();
    await expect(page.locator(".case-study-simple")).toBeVisible();
  });

  test("Jira examples are framed as leadership evidence", async ({ page }) => {
    await page.goto("/work/gantt-schedules");
    await expect(page.getByRole("heading", { level: 1, name: "Jira tracking & documentation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Focus" })).toBeVisible();
    await expect(page.getByText(/workflow tests/i)).toHaveCount(0);
    await expect(page.getByRole("img", { name: /bug status pie chart/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "View project files" })).toHaveCount(0);
  });

  test("AI case study shows workflow gallery", async ({ page }) => {
    await page.goto("/work/ai-driven-testing");
    await expect(
      page.getByRole("heading", { level: 1, name: "AI-assisted quality engineering" }),
    ).toBeVisible();
    await expect(page.getByRole("img", { name: /backend services through GUI/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /test plan draft/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /coverage matrix/i })).toBeVisible();
  });
});
