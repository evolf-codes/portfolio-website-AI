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
          <div className="resume-downloads__actions">
            {resume.formats.map((format) => (
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
        </li>
      ))}
    </ul>
  );
}
