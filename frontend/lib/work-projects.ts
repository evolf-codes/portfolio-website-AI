export type WorkProject = {
  slug: string;
  title: string;
  about: string;
  tested: string;
  inputSource: string;
  expectedOutput: string;
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
      "A browser automation sample that checks real UI behaviour on a public training website.",
    tested:
      "Fifteen user-facing UI flows: navigation, forms, tables, hover states, keyboard events, new windows, and HTTP basic auth.",
    inputSource:
      "Live public app: https://the-internet.herokuapp.com/ (no customer or private data).",
    expectedOutput:
      "Each scenario should complete without flaky waits and end with a clear pytest PASS. A full green run is expected before the suite is treated as healthy.",
    tools: "Python · pytest · Playwright · Docker",
    outcome:
      "15/15 browser checks passed. The screenshot below is the actual pytest green-run evidence.",
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
      "An API automation sample that exercises a local Orders service over real HTTP.",
    tested:
      "API contracts and risk paths: health, JSON response shape, auth rejection, product catalog, order create/retrieve, quantity validation, unknown products, malformed JSON, and idempotency replay/conflict behaviour.",
    inputSource:
      "Local Orders API started for the test run on an ephemeral localhost port, with deterministic fixture products and orders (no internet dependency).",
    expectedOutput:
      "All 15 checks should PASS with verbose names printed. Failures must fail the run; auth and validation errors should return stable HTTP status codes and error envelopes.",
    tools: "Python · pytest · requests · JSON Schema · Docker",
    outcome:
      "15/15 API checks passed. The verbose pytest listing below is the committed run evidence.",
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
      "A safe local load-test sample that answers one release question: can a catalog read endpoint hold expected browsing traffic?",
    tested:
      "Latency, error rate, and throughput for repeated catalog reads under warm-up, steady-state, and short peak load.",
    inputSource:
      "Local catalog HTTP service started by the runner. Virtual users repeatedly call GET /api/products?category=testing.",
    expectedOutput:
      "Release gates must all pass: p95 latency under 100 ms, HTTP error rate under 1%, and throughput at least 20 requests/second. The run fails if any gate is breached.",
    tools: "Python · Locust · local HTTP target",
    outcome:
      "2,085 requests completed at 188.9 req/s with 14 ms p95 and 0 failures. All thresholds passed.",
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
      "An offline evaluation sample for AI-generated checkout test suggestions before a QA engineer would trust them.",
    tested:
      "Whether each candidate response is useful and safe: risk coverage, observable oracles, requirement traceability, unsupported claims, consistency across runs, and refusal of prompt-injection instructions.",
    inputSource:
      "Versioned fixture file of labelled evaluation cases plus captured candidate responses (offline; no live model calls, API keys, or customer data).",
    expectedOutput:
      "At least 80% of responses should pass the quality rubric, every adversarial case must refuse the injected instruction, and score drift across repeats must stay within one point. A safety failure blocks release even if overall quality looks high.",
    tools: "Python · unittest · labelled evaluation fixtures",
    outcome:
      "17 of 18 responses passed the quality checks, but the safety hard gate correctly blocked the candidate release.",
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
      "A delivery-flow sample that turns board policy into management-ready release decisions.",
    tested:
      "Workflow rules in code: valid and invalid card transitions, WIP limits, blocked work, ageing flags, and flow-metric calculations.",
    inputSource:
      "A deterministic in-browser / in-memory board fixture with sample cards, columns, and policy rules. The Jira-style report is illustrative sample data, not a confidential client screenshot.",
    expectedOutput:
      "Invalid moves should be rejected, WIP and blocked/ageing signals should surface correctly, and flow metrics should match the fixture. Reviewers should see a clear delivery-risk view for release readiness.",
    tools: "Jira workflow design · JavaScript · Node test runner",
    outcome:
      "8 deterministic workflow tests passed. The image below is the illustrative Jira delivery report generated from those rules.",
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
      "A staffing-schedule sample focused on overlaps, leave, coverage gaps, and timezone-safe intervals.",
    tested:
      "Schedule rules: overlapping shifts, shift-vs-leave conflicts, coverage gaps across a support window, overnight work, mixed timezones, and half-open interval boundaries.",
    inputSource:
      "Deterministic Python schedule fixtures (people, shifts, leave, and expected coverage windows). The Jira-style planning view is illustrative sample data for management review.",
    expectedOutput:
      "Conflicts and uncovered intervals should be detected exactly against the fixture rules, adjacent shifts at the same boundary should not false-positive, and the report should make capacity and documentation gaps obvious.",
    tools: "Jira planning · Python · Flask · pytest",
    outcome:
      "16 schedule, conflict, boundary, and route tests passed. The image below is the illustrative Jira scheduling and documentation report.",
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
