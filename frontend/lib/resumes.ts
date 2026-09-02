export type ResumeFormat = {
  label: "PDF" | "Google Doc";
  href: string;
};

const RESUME_PDF = "/resume/eric-volfson-qa-manager-2-page.pdf";
const RESUME_DOCX = "/resume/eric-volfson-qa-manager-2-page.docx";

/** Public origin used so Google Docs can fetch the hosted DOCX. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-website-ai.saucers-mikado-0a.workers.dev";

export function getResumeGoogleDocsUrl(origin = SITE_ORIGIN): string {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(`${origin}${RESUME_DOCX}`)}`;
}

export const RESUME_FILES: readonly ResumeFormat[] = [
  { label: "PDF", href: RESUME_PDF },
  { label: "Google Doc", href: getResumeGoogleDocsUrl() },
];
