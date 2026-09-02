/* eslint-disable @next/next/no-img-element -- local SVG case-study art */
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { PanelHeading } from "@/components/layout/PanelHeading";
import { getProjectSourceUrl, type WorkProject } from "@/lib/work-projects";

export function ProjectBrief({ project }: { project: WorkProject }) {
  return (
    <>
      <CaseStudyHeader eyebrow={project.status} title={project.title} />
      <div className="panel mt-8 overflow-hidden">
        <img src={project.imageSrc} alt="" className="w-full object-cover" role="presentation" />
      </div>
      <div className="case-study-grid mt-8">
        <section className="panel p-6 sm:p-8">
          <p className="type-eyebrow">{project.discipline}</p>
          <PanelHeading>Quality brief</PanelHeading>
          <div className="article-body mt-5">
            <p className="case-study-tools">{project.tools}</p>
            <p>{project.challenge}</p>
            <h2>Approach</h2>
            <ul>
              {project.approach.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
        <aside className="panel p-6 sm:p-8" aria-label="Project evidence">
          <p className="type-eyebrow">Evidence</p>
          <ul className="evidence-list mt-4">
            {project.evidence.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="type-eyebrow mt-8">Next increment</p>
          <p className="type-body mt-3">{project.nextStep}</p>
        </aside>
      </div>
      <section className="mt-8" aria-labelledby="result-heading">
        <p id="result-heading" className="type-eyebrow">Verified result</p>
        <p className="type-body mt-3">{project.outcome}</p>
        <a
          href={project.resultImageSrc}
          target="_blank"
          rel="noreferrer"
          className="result-link mt-4 block overflow-hidden rounded-xl border border-[var(--border)] bg-white"
        >
          <img
            src={project.resultImageSrc}
            alt={project.resultImageAlt}
            className="w-full object-contain"
          />
        </a>
        <p className="type-caption mt-3">
          <a className="text-link" href={getProjectSourceUrl(project)} target="_blank" rel="noreferrer">
            View project files
          </a>
          {project.downloads?.map((download) => (
            <span key={download.href}>
              {" · "}<a className="text-link" href={download.href} download>{download.label}</a>
            </span>
          ))}
          {" · "}Click the evidence to inspect it.
        </p>
      </section>
    </>
  );
}
