import { expect, test } from "@playwright/test";
import { WORK_PROJECTS } from "../lib/work-projects";

test.describe("Home", () => {
  test("shows a combined about intro with resume, work, and contact", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Eric Volfson" })).toBeVisible();
    await expect(page.getByRole("img", { name: /Eric Volfson/i }).first()).toBeVisible();
    await expect(page.getByText("Toronto, ON, Canada — Remote First")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#home")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "/resume/eric-volfson-qa-manager-2-page.pdf",
    );
    await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Jira tracking & documentation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI-assisted quality engineering" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frontend automation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Let's talk." })).toBeVisible();

    const sectionOrder = await page.evaluate(() =>
      ["about", "resume", "work", "contact"].map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      }),
    );
    expect(sectionOrder).toEqual([...sectionOrder].sort((a, b) => a - b));

    const navLabels = await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link")
      .allTextContents();
    expect(navLabels).toEqual(["About", "Resume", "Work", "Contact"]);

    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/#resume");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "LinkedIn" })).toHaveCount(0);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "GitHub" })).toHaveCount(0);
    await expect(page.getByRole("contentinfo").getByText(/@/)).toHaveCount(0);

    const footerNavLabels = await page
      .getByRole("contentinfo")
      .getByRole("navigation", { name: "Footer" })
      .getByRole("link")
      .allTextContents();
    expect(footerNavLabels).toEqual(["About", "Resume", "Work", "Contact"]);
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
