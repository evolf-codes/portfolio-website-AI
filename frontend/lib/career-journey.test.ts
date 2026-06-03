import { describe, expect, it } from "vitest";
import { CAREER_MILESTONES } from "./career-journey";

describe("career-journey", () => {
  it("lists milestones in reverse chronological order by start", () => {
    expect(CAREER_MILESTONES.length).toBeGreaterThanOrEqual(4);
    expect(CAREER_MILESTONES[0]?.company).toContain("Confidential");
    expect(CAREER_MILESTONES[0]?.company).toContain("Kraken");
  });

  it("includes TMX progression", () => {
    const companies = CAREER_MILESTONES.map((m) => m.company);
    expect(companies.filter((c) => c.includes("TMX"))).toHaveLength(3);
  });
});
