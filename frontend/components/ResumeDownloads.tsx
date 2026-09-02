import { RESUME_FILES } from "@/lib/resumes";

export function ResumeDownloads() {
  return (
    <ul className="resume-downloads mt-10">
      {RESUME_FILES.map((resume) => (
        <li key={resume.id} className="resume-downloads__item">
          <div>
            <h3 className="resume-downloads__title">{resume.title}</h3>
            <p className="type-body mt-2">{resume.description}</p>
          </div>
          <a
            className="btn-secondary"
            href={resume.href}
            download={resume.fileName}
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        </li>
      ))}
    </ul>
  );
}
