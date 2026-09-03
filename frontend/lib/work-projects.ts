export type WorkResultImage = {
  src: string;
  alt: string;
};

export type WorkProject = {
  slug: string;
  title: string;
  kind: "automation" | "leadership";
  about: string;
  demonstrates: string;
  tools: string;
  outcome: string;
  discipline: string;
  accent: string;
  sourcePath?: string;
  resultImageSrc: string;
  resultImageAlt: string;
  resultImages?: readonly WorkResultImage[];
  priority: number;
};

const PROJECTS: WorkProject[] = [
  {
    slug: "gantt-schedules",
    title: "Jira tracking & documentation",
    kind: "leadership",
    about:
      "I keep bugs, owners, and decisions visible in Jira and Confluence so the team shares one view of project health.",
    demonstrates:
      "Status dashboards, defect lists by ID, burndown-style progress, and Confluence runbooks.",
    tools: "Jira · Confluence · Dashboards · Filters",
    outcome: "Shared risk view. Clear ownership. Fewer surprises.",
    discipline: "Leadership · Delivery",
    accent: "#0f766e",
    resultImageSrc: "/work/results/jira-scheduling.svg",
    resultImageAlt:
      "Jira-style dashboard with bug status pie chart and open bug list with IDs",
    priority: 1,
  },
  {
    slug: "ai-driven-testing",
    title: "AI-assisted quality engineering",
    kind: "automation",
    about:
      "I use AI daily to draft plans, find coverage gaps, and move faster — with QA still owning the call.",
    demonstrates:
      "Claude, Cursor, Codex, and ChatGPT for plans, matrices, skills, agents, and tooling from API to UI.",
    tools: "Claude · Cursor · Codex · ChatGPT · Skills · Agents · Sheets",
    outcome: "Stronger plans, visible gaps, and this site built the same way.",
    discipline: "AI · End-to-end",
    accent: "#0f766e",
    resultImageSrc: "/work/results/ai-driven-testing.svg",
    resultImageAlt:
      "AI-assisted QA workflow showing Claude, Cursor, Codex, ChatGPT, skills, and end-to-end coverage",
    resultImages: [
      {
        src: "/work/results/ai-driven-testing.svg",
        alt: "AI daily workflow from backend services through GUI validation",
      },
      {
        src: "/work/results/ai-test-plan.svg",
        alt: "AI-assisted test plan draft reviewed by QA",
      },
      {
        src: "/work/results/ai-coverage-matrix.svg",
        alt: "Google Sheets style coverage matrix with API and GUI gaps",
      },
    ],
    priority: 2,
  },
  {
    slug: "frontend-automation",
    title: "Frontend automation",
    kind: "automation",
    about: "Browser checks for the flows that matter before you ship.",
    demonstrates:
      "Login, forms, tables, menus, and multi-window paths in concise pytest and Playwright.",
    tools: "Python · pytest · Playwright · Docker",
    outcome: "15/15 passed on a public practice site.",
    discipline: "UI automation",
    accent: "#0f766e",
    sourcePath: "portfolio-projects/frontend-automation/qa-the-internet/",
    resultImageSrc: "/work/results/frontend-automation.svg",
    resultImageAlt: "Green pytest output for fifteen frontend browser checks",
    priority: 3,
  },
  {
    slug: "backend-automation",
    title: "Backend API automation",
    kind: "automation",
    about: "API checks for booking and auth over live HTTPS.",
    demonstrates:
      "Tokens, create and read flows, search filters, and blocked updates without permission.",
    tools: "Python · pytest · requests · JSON Schema",
    outcome: "15/15 passed against a live practice API.",
    discipline: "API automation",
    accent: "#0f766e",
    sourcePath: "portfolio-projects/backend-automation/",
    resultImageSrc: "/work/results/backend-automation.svg",
    resultImageAlt: "Verbose pytest results for Restful Booker API automation",
    priority: 4,
  },
  {
    slug: "performance-testing",
    title: "Performance testing",
    kind: "automation",
    about: "A light Locust profile to see if an API stays fast under load.",
    demonstrates:
      "Response time, error rate, and throughput against clear pass/fail limits.",
    tools: "Python · Locust",
    outcome: "61 requests, 190 ms p95, zero failures.",
    discipline: "Performance",
    accent: "#0f766e",
    sourcePath: "portfolio-projects/performance-testing/",
    resultImageSrc: "/work/results/performance-testing.svg",
    resultImageAlt: "Locust performance summary against Restful Booker with release thresholds",
    priority: 5,
  },
];

export const WORK_PROJECTS: readonly WorkProject[] = PROJECTS.sort(
  (a, b) => a.priority - b.priority,
);

export function getProjectSourceUrl(project: WorkProject): string | null {
  if (!project.sourcePath) return null;
  return `https://github.com/evolf-codes/portfolio-website-AI/tree/main/${project.sourcePath}`;
}

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectResultImages(project: WorkProject): readonly WorkResultImage[] {
  if (project.resultImages?.length) return project.resultImages;
  return [{ src: project.resultImageSrc, alt: project.resultImageAlt }];
}
