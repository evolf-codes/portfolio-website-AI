/* eslint-disable @next/next/no-img-element -- local case-study evidence */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import {
  getProjectResultImages,
  getProjectSourceUrl,
  type WorkProject,
} from "@/lib/work-projects";

export function ProjectBrief({ project }: { project: WorkProject }) {
  const resultImages = getProjectResultImages(project);
  const sourceUrl = getProjectSourceUrl(project);

  return (
    <>
      <CaseStudyHeader eyebrow={project.discipline} title={project.title} />

      <div className="case-study-simple mt-8">
        <section>
          <h2>Overview</h2>
          <p>{project.about}</p>
        </section>
        <section>
          <h2>Focus</h2>
          <p>{project.demonstrates}</p>
        </section>
        <section>
          <h2>Tools</h2>
          <p className="case-study-tools">{project.tools}</p>
        </section>
        <section>
          <h2>Result</h2>
          <p>{project.outcome}</p>
          <div
            className={`result-gallery mt-5 ${resultImages.length > 1 ? "result-gallery--multi" : ""}`}
          >
            {resultImages.map((image) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noreferrer"
                className="result-link overflow-hidden rounded-xl border border-[var(--border)] bg-white"
              >
                <img src={image.src} alt={image.alt} />
              </a>
            ))}
          </div>
        </section>
      </div>

      {sourceUrl ? (
        <p className="type-caption mt-6">
          <a className="text-link" href={sourceUrl} target="_blank" rel="noreferrer">
            View project files
          </a>
        </p>
      ) : null}
    </>
  );
}
