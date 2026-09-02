import { RESUME_FILES } from "@/lib/resumes";

export function ResumeDownloads() {
  return (
    <div className="resume-downloads mt-8">
      {RESUME_FILES.map((format) => (
        <a
          key={format.href}
          className="btn-secondary"
          href={format.href}
          target="_blank"
          rel="noreferrer"
        >
          View {format.label}
        </a>
      ))}
    </div>
  );
}
