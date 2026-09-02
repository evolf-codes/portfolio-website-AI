import { describe, expect, it } from "vitest";
import { getProjectSourceUrl, getWorkProject, WORK_PROJECTS } from "./work-projects";

describe("work-projects", () => {
  it("lists five projects with unique slugs", () => {
    expect(WORK_PROJECTS).toHaveLength(5);
    const slugs = new Set(WORK_PROJECTS.map((p) => p.slug));
    expect(slugs.size).toBe(5);
  });

  it("resolves known slugs", () => {
    expect(getWorkProject("gantt-schedules")?.title).toBe(
      "Jira tracking & documentation",
    );
    expect(getWorkProject("gantt-schedules")?.kind).toBe("leadership");
    expect(getWorkProject("ai-driven-testing")?.title).toBe(
      "AI-assisted quality engineering",
    );
  });

  it("returns undefined for unknown slug", () => {
    expect(getWorkProject("missing")).toBeUndefined();
  });

  it("keeps every project brief and evidence-ready", () => {
    for (const project of WORK_PROJECTS) {
      expect(project.about.length).toBeGreaterThan(20);
      expect(project.demonstrates.length).toBeGreaterThan(20);
      expect(project.tools.length).toBeGreaterThan(5);
      expect(project.outcome.length).toBeGreaterThan(15);
      expect(project.resultImageSrc.startsWith("/work/")).toBe(true);
    }
  });

  it("leads with Jira management and AI evidence", () => {
    expect(WORK_PROJECTS.map((project) => project.slug)).toEqual([
      "gantt-schedules",
      "ai-driven-testing",
      "frontend-automation",
      "backend-automation",
      "performance-testing",
    ]);
  });

  it("treats Jira items as leadership evidence rather than test suites", () => {
    const jira = WORK_PROJECTS.filter((project) => project.slug === "gantt-schedules");
    expect(jira).toHaveLength(1);
    for (const project of jira) {
      expect(project.kind).toBe("leadership");
      expect(project.demonstrates.toLowerCase()).not.toContain("workflow tests");
      expect(project.outcome.toLowerCase()).not.toMatch(/\d+\s+.*tests? passed/);
    }
  });

  it("exposes GitHub source links for automation samples 3-5 only", () => {
    expect(getProjectSourceUrl(WORK_PROJECTS[0]!)).toBeNull();
    expect(getProjectSourceUrl(WORK_PROJECTS[1]!)).toBeNull();
    expect(getProjectSourceUrl(WORK_PROJECTS[2]!)).toContain(
      "portfolio-projects/frontend-automation/qa-the-internet/",
    );
    expect(getProjectSourceUrl(WORK_PROJECTS[3]!)).toContain(
      "portfolio-projects/backend-automation/",
    );
    expect(getProjectSourceUrl(WORK_PROJECTS[4]!)).toContain(
      "portfolio-projects/performance-testing/",
    );
  });
});
