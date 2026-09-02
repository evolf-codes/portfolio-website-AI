import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/layout/BackLink";
import { PageMain } from "@/components/layout/PageMain";
import { ProjectBrief } from "@/components/work/ProjectBrief";
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
        <ProjectBrief project={project} />
      </article>
    </PageMain>
  );
}
