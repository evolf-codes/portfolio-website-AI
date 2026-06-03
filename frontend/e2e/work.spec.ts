import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Work", () => {
  test("each tile opens its overview template", async ({ page }) => {
    for (const project of WORK_PROJECTS) {
      await page.goto("/");
      await page
        .getByRole("link", { name: new RegExp(project.title, "i") })
        .first()
        .click();
      await expect(
        page.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();
      await expect(page.getByText(/case study/i).first()).toBeVisible();
    }
  });

  test("frontend automation page exposes downloadable project links", async ({
    page,
    request,
  }) => {
    await page.goto("/work/frontend-automation");

    const readme = page.getByRole("link", { name: "README" });
    const reqs = page.getByRole("link", { name: "requirements.txt" });
    const notes = page.getByRole("link", { name: /download notes.txt/i });

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
});
