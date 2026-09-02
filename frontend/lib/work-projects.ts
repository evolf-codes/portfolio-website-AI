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
      "I run project health in Jira and Confluence so bugs, owners, and decisions stay visible to the whole team.",
    demonstrates:
      "Status dashboards, defect lists by ID, burndown-style progress, and Confluence links for runbooks and release notes.",
    tools: "Jira · Confluence · Dashboards · Filters",
    outcome: "Clear risk, clear ownership, fewer surprises at release.",
    discipline: "Leadership · Delivery",
    accent: "#2563eb",
    sourcePath: "portfolio-projects/employee-schedules/",
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
      "I use AI every day to plan tests, find gaps, and move faster — while QA still owns the release call.",
    demonstrates:
      "Claude, Cursor, Codex, and ChatGPT for test plans, coverage matrices, skills, agents, and custom tooling across API through UI.",
    tools: "Claude · Cursor · Codex · ChatGPT · Skills · Agents · Sheets",
    outcome: "Stronger plans, visible coverage, and this site built with the same workflow.",
    discipline: "AI · End-to-end",
    accent: "#0891b2",
    sourcePath: "portfolio-projects/ai-driven-testing/",
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
    about:
      "UI automation that confirms critical browser flows still work before a release.",
    demonstrates:
      "Login, forms, tables, menus, and multi-window checks — short, readable pytest plus Playwright coverage.",
    tools: "Python · pytest · Playwright · Docker",
    outcome: "15/15 checks passed on a public practice site.",
    discipline: "UI automation",
    accent: "#4f46e5",
    sourcePath: "portfolio-projects/frontend-automation/qa-the-internet/",
    resultImageSrc: "/work/frontend-automation-pytest-output.png",
    resultImageAlt: "Green pytest output for fifteen frontend browser checks",
    priority: 3,
  },
  {
    slug: "backend-automation",
    title: "Backend API automation",
    kind: "automation",
    about:
      "API tests that prove booking and auth behaviour under real HTTPS traffic.",
    demonstrates:
      "Token checks, create and read flows, search filters, and blocked updates without permission.",
    tools: "Python · pytest · requests · JSON Schema",
    outcome: "15/15 checks passed against a live practice API.",
    discipline: "API automation",
    accent: "#7c3aed",
    sourcePath: "portfolio-projects/backend-automation/",
    resultImageSrc: "/work/results/backend-automation.svg",
    resultImageAlt: "Verbose pytest results for Restful Booker API automation",
    priority: 4,
  },
  {
    slug: "performance-testing",
    title: "Performance testing",
    kind: "automation",
    about:
      "Light load testing that shows whether an API stays fast and stable under pressure.",
    demonstrates:
      "Response time, error rate, and throughput with clear pass/fail limits for release.",
    tools: "Python · Locust",
    outcome: "61 requests, 190 ms p95, zero failures — limits met.",
    discipline: "Performance",
    accent: "#ea580c",
    sourcePath: "portfolio-projects/performance-testing/",
    resultImageSrc: "/work/results/performance-testing.svg",
    resultImageAlt: "Locust performance summary against Restful Booker with release thresholds",
    priority: 5,
  },
];

export const WORK_PROJECTS: readonly WorkProject[] = PROJECTS.sort(
  (a, b) => a.priority - b.priority,
);

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectResultImages(project: WorkProject): readonly WorkResultImage[] {
  if (project.resultImages?.length) return project.resultImages;
  return [{ src: project.resultImageSrc, alt: project.resultImageAlt }];
}
