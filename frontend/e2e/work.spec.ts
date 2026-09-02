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

      await expect(page.getByRole("heading", { name: "Goal" })).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: project.kind === "leadership" ? "Source" : "Site under test",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: project.kind === "leadership" ? "What this shows" : "What the tests check",
        }),
      ).toBeVisible();
      await expect(page.getByRole("heading", { name: "Success looks like" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Tools" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
      await expect(page.getByText(project.inputSource)).toBeVisible();
      await expect(page.getByText(project.about)).toBeVisible();
    }
  });

  test("frontend automation page exposes downloadable project links", async ({
    page,
    request,
  }) => {
    await page.goto("/work/frontend-automation");

    const readme = page.getByRole("link", { name: "README" });
    const reqs = page.getByRole("link", { name: "requirements.txt" });
    const notes = page.getByRole("link", { name: "notes.txt" });

    await expect(readme).toHaveAttribute(
      "href",
      "/work/frontend-automation-readme.txt",
    );
    await expect(reqs).toHaveAttribute(
      "href",
      "/work/frontend-automation-requirements.txt",
    );
    await expect(notes).toHaveAttribute("href", "/work/frontend-automation-notes.txt");

    const [readmeResp, reqsResp, notesResp] = await Promise.all([
      request.get("/work/frontend-automation-readme.txt"),
      request.get("/work/frontend-automation-requirements.txt"),
      request.get("/work/frontend-automation-notes.txt"),
    ]);

    expect(readmeResp.ok()).toBeTruthy();
    expect(reqsResp.ok()).toBeTruthy();
    expect(notesResp.ok()).toBeTruthy();
  });

  test("case study shows output evidence without a decorative hero image", async ({ page }) => {
    await page.goto("/work/performance-testing");

    await expect(page.getByRole("heading", { name: "Goal" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Site under test" })).toBeVisible();
    await expect(page.getByText("https://restful-booker.herokuapp.com/")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
    await expect(page.getByRole("img", { name: /Restful Booker/i })).toBeVisible();
    await expect(page.locator(".case-study-simple")).toBeVisible();
  });

  test("Jira examples are framed as leadership evidence", async ({ page }) => {
    await page.goto("/work/gantt-schedules");
    await expect(page.getByRole("heading", { name: "What this shows" })).toBeVisible();
    await expect(page.getByText(/workflow tests/i)).toHaveCount(0);
    await expect(page.getByRole("link", { name: "View project files" })).toBeVisible();
  });
});
