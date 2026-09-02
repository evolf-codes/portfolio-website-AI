export type WorkProject = {
  slug: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
  status: "Ready" | "Planned";
  discipline: string;
  challenge: string;
  approach: readonly string[];
  evidence: readonly string[];
  nextStep: string;
  tools: string;
  outcome: string;
  sourcePath: string;
  resultImageSrc: string;
  resultImageAlt: string;
};

export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    slug: "kanban",
    title: "Kanban delivery board",
    summary: "An accessible delivery board with enforceable WIP limits, blocked-work rules, ageing signals, and measured flow.",
    imageSrc: "/work/kanban.svg",
    imageAlt: "Kanban board with teal, amber, and blue workflow columns",
    accent: "#0d9488",
    status: "Ready",
    discipline: "Delivery leadership",
    challenge: "Make delivery risk, work in progress, and blocked work visible without turning the board into administrative overhead.",
    approach: ["Set explicit entry and exit policies for each workflow state.", "Use WIP limits and ageing signals to surface flow risk early.", "Pair delivery metrics with qualitative review instead of treating velocity as performance."],
    evidence: ["Interactive board", "Workflow policy", "Flow-metrics summary"],
    nextStep: "Add an automated browser accessibility scan while preserving the native keyboard move controls.",
    tools: "JavaScript · Node test runner · accessible HTML/CSS",
    outcome: "8 deterministic workflow tests pass; desktop and mobile interactions were reviewed with no browser errors.",
    sourcePath: "portfolio-projects/kanban-board/",
    resultImageSrc: "/work/results/kanban-board.png",
    resultImageAlt: "Working Kanban board with workflow columns, WIP limits, and flow metrics",
  },
  {
    slug: "gantt-schedules",
    title: "Employee schedule testing",
    summary: "A staffing timeline that exposes overlaps, approved leave, coverage gaps, overnight work, and timezone boundaries.",
    imageSrc: "/work/gantt.svg",
    imageAlt: "Gantt chart with color-coded schedule bars",
    accent: "#2563eb",
    status: "Ready",
    discipline: "People operations",
    challenge: "Give managers a trustworthy staffing view while making overlaps, leave, and coverage gaps easy to spot.",
    approach: ["Model shifts and leave as simple time ranges with clear ownership.", "Highlight conflicts and under-covered periods at the point of planning.", "Test timezone, boundary-date, and overlapping-assignment risks first."],
    evidence: ["Schedule timeline", "Conflict rules", "Boundary test matrix"],
    nextStep: "Add property-based interval testing for broader boundary coverage.",
    tools: "Python · Flask · pytest",
    outcome: "16 schedule, boundary, conflict, and route tests pass against a deterministic fixture set.",
    sourcePath: "portfolio-projects/employee-schedules/",
    resultImageSrc: "/work/results/employee-schedules.png",
    resultImageAlt: "Employee schedule timeline showing shifts, leave, and coverage alerts",
  },
  {
    slug: "frontend-automation",
    title: "Frontend automation",
    summary:
      "Fifteen pytest + Playwright checks against the public Heroku training app, packaged for Docker with a documented rationale and a screenshot of a clean run.",
    imageSrc: "/work/frontend-automation.svg",
    imageAlt: "Browser mockup for UI test automation",
    accent: "#4f46e5",
    status: "Ready",
    discipline: "UI automation",
    challenge: "Demonstrate maintainable browser automation that is fast to review, straightforward to run, and resistant to common sources of flakiness.",
    approach: ["Cover fifteen focused user behaviours with pytest and Playwright.", "Prefer accessible locators and auto-waiting over sleeps and brittle selectors.", "Package the same execution path for local use and Docker."],
    evidence: ["15 browser tests", "Docker runner", "Green-run screenshot"],
    nextStep: "Add CI reporting and targeted accessibility checks while keeping the suite intentionally small.",
    tools: "Python · pytest · Playwright · Docker",
    outcome: "15 browser scenarios pass against The Internet training application.",
    sourcePath: "portfolio-projects/frontend-automation/qa-the-internet/",
    resultImageSrc: "/work/frontend-automation-pytest-output.png",
    resultImageAlt: "Green pytest output for fifteen frontend browser checks",
  },
  {
    slug: "backend-automation",
    title: "Backend API automation",
    summary: "A deterministic Orders API exercised over HTTP for contracts, authorization, validation, idempotency, and diagnostics.",
    imageSrc: "/work/backend-automation.svg",
    imageAlt: "API services connected for back end automation",
    accent: "#7c3aed",
    status: "Ready",
    discipline: "API automation",
    challenge: "Show service-level confidence across contracts, business rules, failure modes, and authorization without a large test framework.",
    approach: ["Start with consumer-visible contracts and high-value business invariants.", "Separate deterministic API checks from environment health checks.", "Make failures diagnostic through concise request and correlation metadata."],
    evidence: ["API test suite", "Contract checks", "CI report"],
    nextStep: "Run the same contracts in an isolated deployed test environment and publish JUnit evidence in CI.",
    tools: "Python · pytest · requests · JSON Schema · Docker",
    outcome: "15 service-level checks pass against a real local HTTP boundary.",
    sourcePath: "portfolio-projects/backend-automation/",
    resultImageSrc: "/work/results/backend-automation.svg",
    resultImageAlt: "Green pytest summary for the Orders API automation sample",
  },
  {
    slug: "performance-testing",
    title: "Performance testing",
    summary: "A safe local Locust workload with explicit latency, error-rate, and throughput release thresholds.",
    imageSrc: "/work/performance.svg",
    imageAlt: "Performance load test chart with rising throughput",
    accent: "#ea580c",
    status: "Ready",
    discipline: "Performance engineering",
    challenge: "Translate business expectations into measurable service objectives and a repeatable load profile.",
    approach: ["Define throughput, latency percentiles, and error budgets before scripting.", "Model ramp, steady-state, and recovery phases with realistic traffic ratios.", "Report bottlenecks and decision thresholds, not just charts."],
    evidence: ["Load model", "Threshold checks", "Decision report"],
    nextStep: "Run the same Locust profile in a controlled CI environment and compare trends against the baseline.",
    tools: "Python · Locust · local HTTP target",
    outcome: "2,085 Locust requests completed at 188.9 req/s with 14 ms p95 latency and 0 failures; all gates passed.",
    sourcePath: "portfolio-projects/performance-testing/",
    resultImageSrc: "/work/results/performance-testing.svg",
    resultImageAlt: "Locust performance test summary with release thresholds",
  },
  {
    slug: "ai-driven-testing",
    title: "AI-driven testing",
    summary: "A versioned offline evaluation harness that scores task quality, consistency, and prompt-injection safety.",
    imageSrc: "/work/ai-testing.svg",
    imageAlt: "AI assisted testing network diagram",
    accent: "#0891b2",
    status: "Ready",
    discipline: "AI quality",
    challenge: "Evaluate an AI-assisted workflow with repeatable evidence while keeping human review, privacy, and failure analysis explicit.",
    approach: ["Define a small labelled evaluation set and a task-specific scoring rubric.", "Track quality, consistency, latency, and unsafe or unsupported outputs.", "Keep prompts versioned and require human judgment for ambiguous results."],
    evidence: ["Evaluation dataset", "Scoring rubric", "Failure analysis"],
    nextStep: "Add redacted model responses and blinded human ratings with inter-rater agreement.",
    tools: "Python · unittest · labelled evaluation fixtures",
    outcome: "17 of 18 responses pass; the safety hard gate correctly blocks the candidate release.",
    sourcePath: "portfolio-projects/ai-driven-testing/",
    resultImageSrc: "/work/results/ai-driven-testing.svg",
    resultImageAlt: "AI evaluation scorecard showing a blocked release after a safety failure",
  },
] as const;

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
