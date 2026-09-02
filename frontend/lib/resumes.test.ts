import { describe, expect, it } from "vitest";
import { RESUME_FILES } from "./resumes";

describe("RESUME_FILES", () => {
  it("lists PDF and DOCX view links", () => {
    expect(RESUME_FILES.map((format) => format.href)).toEqual([
      "/resume/eric-volfson-qa-manager-2-page.pdf",
      "/resume/eric-volfson-qa-manager-2-page.docx",
    ]);
  });
});
