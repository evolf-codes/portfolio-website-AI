/* eslint-disable @next/next/no-img-element -- local case-study evidence */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import {
  getProjectResultImages,
  getProjectSourceUrl,
  type WorkProject,
} from "@/lib/work-projects";

export function ProjectBrief({ project }: { project: WorkProject }) {
  const isLeadership = project.kind === "leadership";
  const sourceUrl = getProjectSourceUrl(project);
  const resultImages = getProjectResultImages(project);

  const sourceHeading =
    project.sourceLabel ?? (isLeadership ? "Source" : "Site under test");
  const checksHeading =
    project.checksLabel ??
    (isLeadership ? "What this shows" : "What the tests check");

  return (
    <>
      <CaseStudyHeader eyebrow={project.discipline} title={project.title} />

      <div className="case-study-simple mt-8">
        <section>
          <h2>Goal</h2>
          <p>{project.about}</p>
        </section>
        <section>
          <h2>{sourceHeading}</h2>
          <p>{project.inputSource}</p>
        </section>
        <section>
          <h2>{checksHeading}</h2>
          <p>{project.demonstrates}</p>
        </section>
        <section>
          <h2>Success looks like</h2>
          <p>{project.expectedOutput}</p>
        </section>
        <section>
          <h2>Tools</h2>
          <p className="case-study-tools">{project.tools}</p>
        </section>
        <section>
          <h2>Result</h2>
          <p>{project.outcome}</p>
          <div className={`result-gallery mt-5 ${resultImages.length > 1 ? "result-gallery--multi" : ""}`}>
            {resultImages.map((image) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noreferrer"
                className="result-link overflow-hidden rounded-xl border border-[var(--border)] bg-white"
              >
                <img src={image.src} alt={image.alt} className="w-full object-contain" />
              </a>
            ))}
          </div>
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
