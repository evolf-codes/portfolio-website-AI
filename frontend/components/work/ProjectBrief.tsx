/* eslint-disable @next/next/no-img-element -- local case-study evidence */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { getProjectSourceUrl, type WorkProject } from "@/lib/work-projects";

export function ProjectBrief({ project }: { project: WorkProject }) {
  return (
    <>
      <CaseStudyHeader eyebrow={project.discipline} title={project.title} />

      <div className="case-study-simple mt-8">
        <section>
          <h2>About this sample</h2>
          <p>{project.about}</p>
        </section>
        <section>
          <h2>Purpose</h2>
          <p>{project.purpose}</p>
        </section>
        <section>
          <h2>Technology</h2>
          <p className="case-study-tools">{project.tools}</p>
        </section>
        <section>
          <h2>Output</h2>
          <p>{project.outcome}</p>
          <a
            href={project.resultImageSrc}
            target="_blank"
            rel="noreferrer"
            className="result-link mt-5 block overflow-hidden rounded-xl border border-[var(--border)] bg-white"
          >
            <img
              src={project.resultImageSrc}
              alt={project.resultImageAlt}
              className="w-full object-contain"
            />
          </a>
        </section>
      </div>

      <p className="type-caption mt-6">
        <a className="text-link" href={getProjectSourceUrl(project)} target="_blank" rel="noreferrer">
          View project files
        </a>
        {project.downloads?.map((download) => (
          <span key={download.href}>
            {" · "}
            <a className="text-link" href={download.href} download>
              {download.label}
            </a>
          </span>
        ))}
      </p>
    </>
  );
}
