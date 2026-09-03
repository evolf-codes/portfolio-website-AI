/* eslint-disable @next/next/no-img-element -- local project evidence */
import Link from "next/link";
import { getProjectSourceUrl, WORK_PROJECTS } from "@/lib/work-projects";

export function WorkShowcase() {
  return (
    <div className="work-showcase">
      {WORK_PROJECTS.map((project, index) => {
        const sourceUrl = getProjectSourceUrl(project);

        return (
          <article id={project.slug} key={project.slug} className="work-showcase__item">
            <div className="work-showcase__copy">
              <p className="type-eyebrow">
                {String(index + 1).padStart(2, "0")} · {project.discipline}
              </p>
              <h3 className="work-showcase__title">
                <Link href={`/work/${project.slug}`} className="work-showcase__title-link">
                  {project.title}
                </Link>
              </h3>
              <p className="type-body">{project.about}</p>
              <p className="work-showcase__outcome">{project.outcome}</p>
              <p className="type-caption">{project.tools}</p>
              <div className="work-showcase__actions">
                <Link className="text-link" href={`/work/${project.slug}`}>
                  View details
                </Link>
                {sourceUrl ? (
                  <a className="text-link" href={sourceUrl} target="_blank" rel="noreferrer">
                    Project files
                  </a>
                ) : null}
              </div>
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="work-showcase__media result-link overflow-hidden rounded-xl border border-[var(--border)]"
            >
              <img
                src={project.resultImageSrc}
                alt={project.resultImageAlt}
                width={1280}
                height={760}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
