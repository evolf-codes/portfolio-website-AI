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
  inputSource: string;
  expectedOutput: string;
  tools: string;
  outcome: string;
  discipline: string;
  accent: string;
  sourcePath?: string;
  sourceLabel?: string;
  checksLabel?: string;
  resultImageSrc: string;
  resultImageAlt: string;
  resultImages?: readonly WorkResultImage[];
  priority: number;
  downloads?: readonly { label: string; href: string }[];
};

const PROJECTS: WorkProject[] = [
  {
    slug: "frontend-automation",
    title: "Frontend automation",
    kind: "automation",
    about:
      "Sample browser tests that confirm everyday website actions still work.",
    demonstrates:
      "Forms, login, tables, menus, new windows, and basic page flows.",
    inputSource: "https://the-internet.herokuapp.com/ — a public practice website for QA.",
    expectedOutput: "All 15 tests pass and produce a clean green run report.",
    tools: "Python · pytest · Playwright · Docker",
    outcome: "15/15 tests passed against The Internet.",
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
    kind: "automation",
    about:
      "Sample API tests that confirm a booking service behaves correctly over HTTPS.",
    demonstrates:
      "Login/token checks, create and read bookings, search filters, and blocked updates without permission.",
    inputSource: "https://restful-booker.herokuapp.com/ — a public practice API for QA.",
    expectedOutput: "All 15 tests pass against the live practice API.",
    tools: "Python · pytest · requests · JSON Schema",
    outcome: "15/15 tests passed against Restful Booker.",
    discipline: "API automation",
    accent: "#7c3aed",
    sourcePath: "portfolio-projects/backend-automation/",
    resultImageSrc: "/work/results/backend-automation.svg",
    resultImageAlt: "Verbose pytest results for Restful Booker API automation",
    priority: 2,
  },
  {
    slug: "performance-testing",
    title: "Performance testing",
    kind: "automation",
    about:
      "A short, light load sample that checks whether a practice API stays fast and reliable.",
    demonstrates:
      "Response time, error rate, and request throughput while a few virtual users browse bookings.",
    inputSource:
      "https://restful-booker.herokuapp.com/ — same public practice API, with a small Locust profile.",
    expectedOutput:
      "The run stays under the set limits for speed, errors, and throughput.",
    tools: "Python · Locust",
    outcome: "61 requests, 190 ms p95, 0 failures — all limits passed.",
    discipline: "Performance",
    accent: "#ea580c",
    sourcePath: "portfolio-projects/performance-testing/",
    resultImageSrc: "/work/results/performance-testing.svg",
    resultImageAlt: "Locust performance summary against Restful Booker with release thresholds",
    priority: 3,
  },
  {
    slug: "ai-driven-testing",
    title: "AI-assisted quality engineering",
    kind: "automation",
    about:
      "I use AI every day to plan tests, find gaps, and move faster — with QA judgment still owning the release call.",
    demonstrates:
      "Claude, Cursor, Codex, and ChatGPT for test plans, coverage matrices, Google Sheets, Markdown skills, agents, and custom tooling — end to end from API through GUI.",
    inputSource:
      "Daily AI workflow examples, plus an offline evaluation sample in the project files.",
    expectedOutput:
      "Clear plans, visible coverage gaps, and artifacts a team can review and reuse.",
    tools: "Claude · Cursor · Codex · ChatGPT · Skills/MD · Agents · Google Sheets",
    outcome: "Built this site and QA tooling with AI. Example artifacts below.",
    discipline: "AI · E2E quality",
    accent: "#0891b2",
    sourcePath: "portfolio-projects/ai-driven-testing/",
    sourceLabel: "Where this comes from",
    checksLabel: "What I use AI for",
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
    priority: 4,
  },
  {
    slug: "gantt-schedules",
    title: "Jira tracking & documentation",
    kind: "leadership",
    about:
      "I run project health in Jira and Confluence — bugs, owners, status, and docs in one place the team can trust.",
    demonstrates:
      "Bug counts by status, open defect lists by ID, burndown-style progress, and Confluence links for decisions and runbooks.",
    inputSource:
      "Illustrative Jira dashboard with sample project data (not a confidential client board).",
    expectedOutput:
      "Anyone can see what’s open, what’s blocked, and which docs explain the work.",
    tools: "Jira · Confluence · Filters · Dashboards",
    outcome: "This is how I track bugs and project status day to day.",
    discipline: "Jira · Confluence · Leadership",
    accent: "#2563eb",
    sourcePath: "portfolio-projects/employee-schedules/",
    resultImageSrc: "/work/results/jira-scheduling.svg",
    resultImageAlt:
      "Jira-style dashboard with bug status pie chart and open bug list with IDs",
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
