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
      "A browser automation sample that checks real UI behaviour on a public training website.",
    demonstrates:
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
    kind: "automation",
    about:
      "An API automation sample against the public Restful Booker Heroku practice API — the API counterpart to The Internet for UI testing.",
    demonstrates:
      "Live HTTPS contracts for booking list/detail, auth token minting, create/read, name filters, unauthorized update/delete rejection, and authenticated PUT/PATCH/DELETE.",
    inputSource:
      "Public QA practice API: https://restful-booker.herokuapp.com/ (shared tester sandbox on Heroku; no customer data).",
    expectedOutput:
      "All 15 checks should PASS against the live practice API, with verbose names printed. Auth failures should not mint tokens; unauthorized mutations should be rejected; created bookings should be readable.",
    tools: "Python · pytest · requests · JSON Schema",
    outcome:
      "15/15 API checks passed against Restful Booker in 1.44s. The verbose pytest listing below is the committed run evidence.",
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
      "A light Locust run against the same public Restful Booker practice API used for backend checks — a Heroku QA sandbox, not a customer production system.",
    demonstrates:
      "Latency, error rate, and throughput for polite browsing of GET /booking and GET /booking/{id} under a short warm-up / steady / peak profile.",
    inputSource:
      "Public QA practice API: https://restful-booker.herokuapp.com/ with a capped profile (max 4 virtual users, ~14 seconds).",
    expectedOutput:
      "Release gates must all pass on the public network path: p95 under 3000 ms, HTTP errors under 5%, throughput at least 0.5 req/s, and at least one recorded request. The run fails if any gate is breached.",
    tools: "Python · Locust · Restful Booker (Heroku)",
    outcome:
      "61 requests completed at 4.48 req/s with 190 ms p95 and 0 failures. All public-practice thresholds passed.",
    discipline: "Performance engineering",
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
      "An offline evaluation sample for AI-generated checkout test suggestions before a QA engineer would trust them.",
    demonstrates:
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
    kind: "leadership",
    about:
      "A Jira-style delivery dashboard showing how I make release risk visible to leadership: WIP, blocked work, ageing, and go / no-go decisions.",
    demonstrates:
      "QA leadership through Jira reporting — triage dashboards, flow visibility, release readiness, and cross-team coordination without drowning stakeholders in board noise.",
    inputSource:
      "Illustrative Jira management views based on how I run delivery reporting in capital-markets and digital-asset delivery (not a confidential client screenshot).",
    expectedOutput:
      "Leaders should quickly see blocked work, ageing risk, owners, and the next release decision — with linked documentation for follow-through.",
    tools: "Jira · Confluence · KPI / release dashboards",
    outcome:
      "The screenshot below is an illustrative delivery-reporting view aligned to my resume: defect triage, Jira dashboards, and release confidence.",
    discipline: "Jira · Leadership reporting",
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
      "A Jira-style planning view for QA capacity, coverage gaps, schedule conflicts, and the operating docs teams need during delivery.",
    demonstrates:
      "QA management skills from my resume: resource allocation across concurrent work, dependency coordination, coverage planning, and keeping runbooks/documentation attached to the plan.",
    inputSource:
      "Illustrative Jira scheduling and documentation views that mirror how I plan staffing and coverage (sample data only; no confidential client schedules).",
    expectedOutput:
      "Managers should see who is assigned, where coverage is thin, which conflicts need a decision, and which Confluence / runbook links support the work.",
    tools: "Jira · Confluence · capacity and coverage planning",
    outcome:
      "The screenshot below shows the leadership artifact: capacity, conflicts, coverage, owners, and linked documentation in one reviewable view.",
    discipline: "Jira · Leadership planning",
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
