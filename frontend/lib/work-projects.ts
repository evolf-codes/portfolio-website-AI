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
  resultImageSrc: string;
  resultImageAlt: string;
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
    title: "AI-driven testing",
    kind: "automation",
    about:
      "A sample that scores AI-written test ideas before a QA engineer would trust them.",
    demonstrates:
      "Quality, consistency, and safety — including whether unsafe prompt-injection requests are refused.",
    inputSource:
      "Saved practice cases and AI answers stored in the project (no live model calls).",
    expectedOutput:
      "Most answers meet the quality bar, and any unsafe answer blocks release.",
    tools: "Python · unittest",
    outcome: "17/18 answers passed quality checks; the safety gate blocked release.",
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
    kind: "leadership",
    about:
      "An example Jira-style report used to show delivery risk and release readiness.",
    demonstrates:
      "Blocked work, ageing items, owners, and a clear go / no-go view for leaders.",
    inputSource: "Illustrative Jira report with sample data (not a confidential client board).",
    expectedOutput: "A manager can see risk and next decisions quickly.",
    tools: "Jira · Confluence",
    outcome: "Example delivery dashboard below.",
    discipline: "Jira · Leadership",
    accent: "#0d9488",
    sourcePath: "portfolio-projects/kanban-board/",
    resultImageSrc: "/work/results/jira-delivery-reporting.svg",
    resultImageAlt: "Illustrative Jira delivery management dashboard with release risks and flow measures",
    priority: 5,
  },
  {
    slug: "gantt-schedules",
    title: "Jira scheduling & documentation",
    kind: "leadership",
    about:
      "An example Jira-style plan used to show staffing, coverage gaps, and linked docs.",
    demonstrates:
      "Who is assigned, where coverage is thin, and which documents support the work.",
    inputSource: "Illustrative Jira schedule with sample data (not a confidential client plan).",
    expectedOutput: "A manager can spot conflicts and coverage gaps in one view.",
    tools: "Jira · Confluence",
    outcome: "Example scheduling dashboard below.",
    discipline: "Jira · Leadership",
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

export function getProjectSourceUrl(project: WorkProject): string | null {
  if (!project.sourcePath) return null;
  return `https://github.com/evolf-codes/portfolio-website-AI/tree/main/${project.sourcePath}`;
}

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
