export type ResumeFormat = {
  label: "PDF" | "DOCX";
  href: string;
};

export const RESUME_FILES: readonly ResumeFormat[] = [
  { label: "PDF", href: "/resume/eric-volfson-qa-manager-2-page.pdf" },
  { label: "DOCX", href: "/resume/eric-volfson-qa-manager-2-page.docx" },
];
