import { describe, expect, it } from "vitest";
import { RESUME_FILES } from "./resumes";

describe("RESUME_FILES", () => {
  it("lists the 2-page resume with PDF and DOCX view links", () => {
    expect(RESUME_FILES).toHaveLength(1);
    expect(RESUME_FILES[0]?.formats.map((format) => format.href)).toEqual([
      "/resume/eric-volfson-qa-manager-2-page.pdf",
      "/resume/eric-volfson-qa-manager-2-page.docx",
    ]);
  });
});
