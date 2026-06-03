import { describe, expect, it } from "vitest";
import { getWorkProject, WORK_PROJECTS } from "./work-projects";

describe("work-projects", () => {
  it("lists six projects with unique slugs", () => {
    expect(WORK_PROJECTS).toHaveLength(6);
    const slugs = new Set(WORK_PROJECTS.map((p) => p.slug));
    expect(slugs.size).toBe(6);
  });

  it("resolves known slugs", () => {
    expect(getWorkProject("kanban")?.title).toBe("Kanban board");
    expect(getWorkProject("ai-driven-testing")?.title).toBe(
      "AI driven testing example",
    );
  });

  it("returns undefined for unknown slug", () => {
    expect(getWorkProject("missing")).toBeUndefined();
  });
});
