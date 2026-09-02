import { describe, expect, it } from "vitest";
import { RESUME_FILES } from "./resumes";

describe("RESUME_FILES", () => {
  it("lists resume files with direct view links", () => {
    expect(RESUME_FILES).toHaveLength(2);
    expect(RESUME_FILES[0]?.formats.map((format) => format.href)).toEqual([
      "/resume/eric-volfson-qa-manager-2-page.pdf",
      "/resume/eric-volfson-qa-manager-2-page.docx",
    ]);
    expect(RESUME_FILES[1]?.formats.map((format) => format.href)).toEqual([
      "/resume/eric-volfson-qa-manager-detailed.pdf",
    ]);
  });
});
