export type ResumeFormat = {
  label: "PDF" | "DOCX";
  href: string;
};

export type ResumeFile = {
  id: string;
  title: string;
  description: string;
  formats: readonly ResumeFormat[];
};

export const RESUME_FILES: readonly ResumeFile[] = [
  {
    id: "two-page",
    title: "2-page resume",
    description: "Concise version for a quick read.",
    formats: [
      { label: "PDF", href: "/resume/eric-volfson-qa-manager-2-page.pdf" },
      { label: "DOCX", href: "/resume/eric-volfson-qa-manager-2-page.docx" },
    ],
  },
];
