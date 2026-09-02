export type ResumeFile = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const RESUME_FILES: readonly ResumeFile[] = [
  {
    id: "two-page",
    title: "2-page resume",
    description: "Concise version for a quick read.",
    href: "/resume/eric-volfson-qa-manager-2-page.pdf",
    fileName: "Eric-Volfson-QA-Manager-2-page.pdf",
  },
  {
    id: "detailed",
    title: "Detailed resume",
    description: "Longer version with selected project highlights.",
    href: "/resume/eric-volfson-qa-manager-detailed.pdf",
    fileName: "Eric-Volfson-QA-Manager-detailed.pdf",
  },
];
