/* eslint-disable @next/next/no-img-element -- local SVG hero */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FrontendAutomationCaseStudy } from "@/components/work/FrontendAutomationCaseStudy";
import { getWorkProject, WORK_PROJECTS } from "@/lib/work-projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-link text-sm">
        Back to work
      </Link>
      <article className="mt-8">
        {project.slug === "frontend-automation" ? (
          <FrontendAutomationCaseStudy project={project} />
        ) : (
          <>
            <p className="page-hero__eyebrow text-xs font-semibold tracking-wide uppercase">
              Case study template
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ink)]">
              {project.title}
            </h1>
            <div className="panel mt-8 overflow-hidden">
              <img
                src={project.imageSrc}
                alt=""
                className="w-full object-cover"
                role="presentation"
              />
            </div>
            <div className="prose prose-neutral mt-8 max-w-none text-[var(--graphite)]">
              <p className="text-base leading-relaxed">{project.summary}</p>
              <p className="mt-4 text-base leading-relaxed">
                This page is a placeholder for a deeper write-up: context, risks,
                strategy, tooling, results, and what you would repeat next time.
              </p>
            </div>
          </>
        )}
      </article>
    </div>
  );
}
