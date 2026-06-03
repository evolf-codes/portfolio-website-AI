export type WorkProject = {
  slug: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
};

export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    slug: "kanban",
    title: "Kanban board",
    summary:
      "Placeholder case study for a single-board Kanban workflow with drag-and-drop columns and focused scope.",
    imageSrc: "/work/kanban.svg",
    imageAlt: "Kanban board with teal, amber, and blue workflow columns",
    accent: "#0d9488",
  },
  {
    slug: "gantt-schedules",
    title: "Gantt chart for employee schedules",
    summary:
      "Placeholder case study for schedule planning with timeline views and staffing clarity.",
    imageSrc: "/work/gantt.svg",
    imageAlt: "Gantt chart with color-coded schedule bars",
    accent: "#2563eb",
  },
  {
    slug: "frontend-automation",
    title: "Front end automation example",
    summary:
      "Fifteen pytest + Playwright checks against the public Heroku training app, packaged for Docker with a documented rationale and a screenshot of a clean run.",
    imageSrc: "/work/frontend-automation.svg",
    imageAlt: "Browser mockup for UI test automation",
    accent: "#4f46e5",
  },
  {
    slug: "backend-automation",
    title: "Back end automation example",
    summary:
      "Placeholder case study for API and service-level checks integrated into delivery pipelines.",
    imageSrc: "/work/backend-automation.svg",
    imageAlt: "API services connected for back end automation",
    accent: "#7c3aed",
  },
  {
    slug: "performance-testing",
    title: "Performance test example",
    summary:
      "Placeholder case study for load and performance validation before high-traffic releases.",
    imageSrc: "/work/performance.svg",
    imageAlt: "Performance load test chart with rising throughput",
    accent: "#ea580c",
  },
  {
    slug: "ai-driven-testing",
    title: "AI driven testing example",
    summary:
      "Placeholder case study for combining AI assistance with human judgment in test design.",
    imageSrc: "/work/ai-testing.svg",
    imageAlt: "AI assisted testing network diagram",
    accent: "#0891b2",
  },
] as const;

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
