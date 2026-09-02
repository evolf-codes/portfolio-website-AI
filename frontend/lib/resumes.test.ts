import { describe, expect, it } from "vitest";
import { getResumeGoogleDocsUrl, RESUME_FILES, SITE_ORIGIN } from "./resumes";

describe("RESUME_FILES", () => {
  it("lists PDF and Google Doc view links", () => {
    expect(RESUME_FILES.map((format) => format.label)).toEqual(["PDF", "Google Doc"]);
    expect(RESUME_FILES[0]?.href).toBe("/resume/eric-volfson-qa-manager-2-page.pdf");
    expect(RESUME_FILES[1]?.href).toBe(getResumeGoogleDocsUrl());
    expect(RESUME_FILES[1]?.href).toContain("docs.google.com/viewer");
    expect(RESUME_FILES[1]?.href).toContain(encodeURIComponent(`${SITE_ORIGIN}/resume/`));
  });
});
