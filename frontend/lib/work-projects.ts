export type WorkProject = {
  slug: string;
  title: string;
  about: string;
  purpose: string;
  tools: string;
  outcome: string;
  discipline: string;
  accent: string;
  sourcePath: string;
  resultImageSrc: string;
  resultImageAlt: string;
  priority: number;
  downloads?: readonly { label: string; href: string }[];
};

const PROJECTS: WorkProject[] = [
  {
    slug: "frontend-automation",
    title: "Frontend automation",
    about:
      "A small browser automation suite against the public Heroku training app (The Internet).",
    purpose:
      "Show maintainable UI automation that is easy to run, review, and package for Docker.",
    tools: "Python · pytest · Playwright · Docker",
    outcome: "15 focused browser checks with a green run screenshot as evidence.",
    discipline: "UI automation",
    accent: "#4f46e5",
    sourcePath: "portfolio-projects/frontend-automation/qa-the-internet/",
    resultImageSrc: "/work/frontend-automation-pytest-output.png",
    resultImageAlt: "Green pytest output for fifteen frontend browser checks",
    priority: 1,
    downloads: [
      { label: "README", href: "/work/frontend-automation-readme.txt" },
      { label: "requirements.txt", href: "/work/frontend-automation-requirements.txt" },
      { label: "notes.txt", href: "/work/frontend-automation-notes.txt" },
    ],
  },
  {
    slug: "backend-automation",
    title: "Backend API automation",
    about:
      "A local Orders API exercised over HTTP for contracts, auth, validation, and idempotency.",
    purpose:
      "Demonstrate service-level confidence with clear pass/fail evidence at the API boundary.",
    tools: "Python · pytest · requests · JSON Schema · Docker",
    outcome: "15 verbose API tests passing against a deterministic local HTTP service.",
    discipline: "API automation",
    accent: "#7c3aed",
    sourcePath: "portfolio-projects/backend-automation/",
    resultImageSrc: "/work/results/backend-automation.svg",
    resultImageAlt: "Verbose pytest results for the Orders API automation sample",
    priority: 2,
  },
  {
    slug: "performance-testing",
    title: "Performance testing",
    about:
      "A safe local Locust workload with explicit latency, error-rate, and throughput gates.",
    purpose:
      "Show how release thresholds turn a load run into a clear go / no-go decision.",
    tools: "Python · Locust · local HTTP target",
    outcome:
      "2,085 requests at 188.9 req/s with 14 ms p95 and 0 failures; all thresholds passed.",
    discipline: "Performance engineering",
    accent: "#ea580c",
    sourcePath: "portfolio-projects/performance-testing/",
    resultImageSrc: "/work/results/performance-testing.svg",
    resultImageAlt: "Locust performance test summary with release thresholds",
    priority: 3,
  },
  {
    slug: "ai-driven-testing",
    title: "AI-driven testing",
    about:
      "An offline evaluation harness that scores task quality, consistency, and prompt-injection safety.",
    purpose:
      "Make AI-assisted output reviewable with a versioned rubric and an explicit safety gate.",
    tools: "Python · unittest · labelled evaluation fixtures",
    outcome:
      "17 of 18 responses pass; the safety hard gate correctly blocks the candidate release.",
    discipline: "AI quality",
    accent: "#0891b2",
    sourcePath: "portfolio-projects/ai-driven-testing/",
    resultImageSrc: "/work/results/ai-driven-testing.svg",
    resultImageAlt: "AI evaluation scorecard showing a blocked release after a safety failure",
    priority: 4,
  },
  {
    slug: "kanban",
    title: "Jira delivery reporting",
    about:
      "An illustrative Jira-style management view for WIP, blocked work, ageing, and release risk.",
    purpose:
      "Show how delivery reporting turns board signals into clear QA and release decisions.",
    tools: "Jira workflow design · JavaScript · Node test runner",
    outcome:
      "Illustrative delivery dashboard backed by 8 deterministic workflow tests.",
    discipline: "Jira · Management reporting",
    accent: "#0d9488",
    sourcePath: "portfolio-projects/kanban-board/",
    resultImageSrc: "/work/results/jira-delivery-reporting.svg",
    resultImageAlt: "Illustrative Jira delivery management dashboard with release risks and flow measures",
    priority: 5,
  },
  {
    slug: "gantt-schedules",
    title: "Jira scheduling & documentation",
    about:
      "An illustrative Jira planning view for capacity, schedule conflicts, coverage gaps, and linked docs.",
    purpose:
      "Show how scheduling and documentation stay connected for staffing and coverage decisions.",
    tools: "Jira planning · Python · Flask · pytest",
    outcome:
      "Illustrative scheduling report backed by 16 schedule, conflict, and boundary tests.",
    discipline: "Jira · Scheduling",
    accent: "#2563eb",
    sourcePath: "portfolio-projects/employee-schedules/",
    resultImageSrc: "/work/results/jira-scheduling.svg",
    resultImageAlt: "Illustrative Jira scheduling dashboard with capacity, conflicts, and linked documentation",
    priority: 6,
  },
];

export const WORK_PROJECTS: readonly WorkProject[] = PROJECTS.sort(
  (a, b) => a.priority - b.priority,
);

export function getProjectSourceUrl(project: WorkProject): string {
  return `https://github.com/evolf-codes/portfolio-website-AI/tree/main/${project.sourcePath}`;
}

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
