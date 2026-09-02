/* eslint-disable @next/next/no-img-element -- local project evidence */
import Link from "next/link";
import { WORK_PROJECTS } from "@/lib/work-projects";

export function WorkShowcase() {
  return (
    <div className="work-showcase mt-12">
      {WORK_PROJECTS.map((project, index) => (
        <article id={project.slug} key={project.slug} className="work-showcase__item scroll-mt-24">
          <div className="work-showcase__copy">
            <p className="type-eyebrow">
              {String(index + 1).padStart(2, "0")} · {project.discipline}
            </p>
            <h3 className="work-showcase__title mt-3">
              <Link href={`/work/${project.slug}`} className="work-showcase__title-link">
                {project.title}
              </Link>
            </h3>
            <p className="type-body mt-4">{project.about}</p>
            <p className="work-showcase__outcome mt-5">{project.outcome}</p>
            <p className="type-caption mt-4">{project.tools}</p>
            <div className="mt-6">
              <Link className="text-link" href={`/work/${project.slug}`}>
                View details
              </Link>
            </div>
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="result-link overflow-hidden rounded-xl border border-[var(--border)] bg-white"
          >
            <img
              src={project.resultImageSrc}
              alt={project.resultImageAlt}
              className="h-full w-full object-contain"
              loading={index < 2 ? "eager" : "lazy"}
            />
          </Link>
        </article>
      ))}
    </div>
  );
}
