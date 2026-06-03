/* eslint-disable @next/next/no-img-element -- local SVG hero */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/layout/BackLink";
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { PageMain } from "@/components/layout/PageMain";
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
    <PageMain narrow>
      <BackLink />
      <article className="mt-8">
        {project.slug === "frontend-automation" ? (
          <FrontendAutomationCaseStudy project={project} />
        ) : (
          <>
            <CaseStudyHeader eyebrow="Case study" title={project.title} />
            <div className="panel mt-8 overflow-hidden">
              <img
                src={project.imageSrc}
                alt=""
                className="w-full object-cover"
                role="presentation"
              />
            </div>
            <div className="article-body mt-8">
              <p>{project.summary}</p>
              <p>
                This page is a placeholder for a deeper write-up: context, risks, strategy,
                tooling, results, and what you would repeat next time.
              </p>
            </div>
          </>
        )}
      </article>
    </PageMain>
  );
}
