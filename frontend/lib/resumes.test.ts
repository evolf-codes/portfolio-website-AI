import { describe, expect, it } from "vitest";
import { RESUME_FILES } from "./resumes";

describe("RESUME_FILES", () => {
  it("lists two downloadable resume PDFs", () => {
    expect(RESUME_FILES).toHaveLength(2);
    expect(RESUME_FILES.map((file) => file.href)).toEqual([
      "/resume/eric-volfson-qa-manager-2-page.pdf",
      "/resume/eric-volfson-qa-manager-detailed.pdf",
    ]);
  });
});
