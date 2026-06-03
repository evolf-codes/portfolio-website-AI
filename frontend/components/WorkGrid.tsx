/* eslint-disable @next/next/no-img-element -- local SVG tile placeholders */
import Link from "next/link";
import { WORK_PROJECTS } from "@/lib/work-projects";

export function WorkGrid() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {WORK_PROJECTS.map((project) => (
        <li key={project.slug} className="h-full">
          <Link
            href={`/work/${project.slug}`}
            className="group work-card flex h-full flex-col overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <div
              className="work-card__accent"
              style={{ backgroundColor: project.accent }}
              aria-hidden="true"
            />
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                loading={project.slug === "kanban" ? "eager" : "lazy"}
              />
            </div>
            <div className="work-card__body flex flex-1 flex-col px-4 py-4">
              <h2 className="work-card__title text-base font-semibold">{project.title}</h2>
              <p className="work-card__meta mt-1 text-sm">View overview</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
