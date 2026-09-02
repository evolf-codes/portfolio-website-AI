import { describe, expect, it } from "vitest";
import { getWorkProject, WORK_PROJECTS } from "./work-projects";

describe("work-projects", () => {
  it("lists six projects with unique slugs", () => {
    expect(WORK_PROJECTS).toHaveLength(6);
    const slugs = new Set(WORK_PROJECTS.map((p) => p.slug));
    expect(slugs.size).toBe(6);
  });

  it("resolves known slugs", () => {
    expect(getWorkProject("kanban")?.title).toBe("Jira delivery reporting");
    expect(getWorkProject("ai-driven-testing")?.title).toBe(
      "AI-driven testing",
    );
  });

  it("returns undefined for unknown slug", () => {
    expect(getWorkProject("missing")).toBeUndefined();
  });

  it("gives every project an honest status and evidence plan", () => {
    for (const project of WORK_PROJECTS) {
      expect(["Ready", "Planned"]).toContain(project.status);
      expect(project.approach).toHaveLength(3);
      expect(project.evidence).toHaveLength(3);
      expect(project.nextStep.length).toBeGreaterThan(20);
    }

    expect(WORK_PROJECTS.every((project) => project.status === "Ready")).toBe(true);
    expect(WORK_PROJECTS.every((project) => project.resultImageSrc.startsWith("/work/"))).toBe(true);
  });

  it("leads with automation and performance evidence", () => {
    expect(WORK_PROJECTS.slice(0, 3).map((project) => project.slug)).toEqual([
      "frontend-automation",
      "backend-automation",
      "performance-testing",
    ]);
  });

  it("exposes GitHub source links for every project path", () => {
    for (const project of WORK_PROJECTS) {
      expect(project.sourcePath).toMatch(/^portfolio-projects\//);
      expect(project.sourcePath.endsWith("/")).toBe(true);
    }
  });
});
