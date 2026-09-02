/* eslint-disable @next/next/no-img-element -- local case-study evidence */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { getProjectSourceUrl, type WorkProject } from "@/lib/work-projects";

export function ProjectBrief({ project }: { project: WorkProject }) {
  const isLeadership = project.kind === "leadership";
  const sourceUrl = getProjectSourceUrl(project);

  return (
    <>
      <CaseStudyHeader
        eyebrow={project.discipline}
        title={project.title}
      />

      <div className="case-study-simple mt-8">
        <section>
          <h2>{isLeadership ? "About this example" : "About this sample"}</h2>
          <p>{project.about}</p>
        </section>
        <section>
          <h2>{isLeadership ? "Leadership focus" : "What is being tested"}</h2>
          <p>{project.demonstrates}</p>
        </section>
        <section>
          <h2>{isLeadership ? "Source" : "Input source"}</h2>
          <p>{project.inputSource}</p>
        </section>
        <section>
          <h2>{isLeadership ? "What leaders should see" : "Expected output"}</h2>
          <p>{project.expectedOutput}</p>
        </section>
        <section>
          <h2>{isLeadership ? "Tools" : "Technology"}</h2>
          <p className="case-study-tools">{project.tools}</p>
        </section>
        <section>
          <h2>{isLeadership ? "Evidence" : "Actual result"}</h2>
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

      {sourceUrl || project.downloads?.length ? (
        <p className="type-caption mt-6">
          {sourceUrl ? (
            <a className="text-link" href={sourceUrl} target="_blank" rel="noreferrer">
              View project files
            </a>
          ) : null}
          {project.downloads?.map((download, index) => (
            <span key={download.href}>
              {sourceUrl || index > 0 ? " · " : null}
              <a className="text-link" href={download.href} download>
                {download.label}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </>
  );
}
