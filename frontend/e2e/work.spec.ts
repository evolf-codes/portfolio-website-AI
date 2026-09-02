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

      if (project.kind === "leadership") {
        await expect(page.getByRole("heading", { name: "About this example" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Leadership focus" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Source" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "What leaders should see" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Tools" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Evidence" })).toBeVisible();
      } else {
        await expect(page.getByRole("heading", { name: "About this sample" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "What is being tested" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Input source" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Expected output" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Technology" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Actual result" })).toBeVisible();
      }

      await expect(page.getByText(project.inputSource)).toBeVisible();
      await expect(page.getByText(project.expectedOutput)).toBeVisible();
      await expect(page.getByText(project.demonstrates)).toBeVisible();
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

    await expect(page.getByRole("heading", { name: "About this sample" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Input source" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Expected output" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Actual result" })).toBeVisible();
    await expect(page.getByRole("img", { name: /Locust performance test summary/i })).toBeVisible();
    await expect(page.locator(".case-study-simple")).toBeVisible();
  });

  test("Jira examples are framed as leadership evidence", async ({ page }) => {
    await page.goto("/work/kanban");
    await expect(page.getByRole("heading", { name: "Leadership focus" })).toBeVisible();
    await expect(page.getByText(/workflow tests/i)).toHaveCount(0);
    await expect(page.getByRole("link", { name: "View project files" })).toHaveCount(0);
  });
});
