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
    status: "Planned",
    discipline: "Delivery leadership",
    challenge: "Make delivery risk, work in progress, and blocked work visible without turning the board into administrative overhead.",
    approach: ["Set explicit entry and exit policies for each workflow state.", "Use WIP limits and ageing signals to surface flow risk early.", "Pair delivery metrics with qualitative review instead of treating velocity as performance."],
    evidence: ["Interactive board", "Workflow policy", "Flow-metrics summary"],
    nextStep: "Build the single-board workflow and validate keyboard-accessible drag and drop.",
  },
  {
    slug: "gantt-schedules",
    title: "Gantt chart for employee schedules",
    summary:
      "Placeholder case study for schedule planning with timeline views and staffing clarity.",
    imageSrc: "/work/gantt.svg",
    imageAlt: "Gantt chart with color-coded schedule bars",
    accent: "#2563eb",
    status: "Planned",
    discipline: "People operations",
    challenge: "Give managers a trustworthy staffing view while making overlaps, leave, and coverage gaps easy to spot.",
    approach: ["Model shifts and leave as simple time ranges with clear ownership.", "Highlight conflicts and under-covered periods at the point of planning.", "Test timezone, boundary-date, and overlapping-assignment risks first."],
    evidence: ["Schedule timeline", "Conflict rules", "Boundary test matrix"],
    nextStep: "Implement the schedule model, critical conflict checks, and an accessible timeline view.",
  },
  {
    slug: "frontend-automation",
    title: "Front end automation example",
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
  },
  {
    slug: "backend-automation",
    title: "Back end automation example",
    summary:
      "Placeholder case study for API and service-level checks integrated into delivery pipelines.",
    imageSrc: "/work/backend-automation.svg",
    imageAlt: "API services connected for back end automation",
    accent: "#7c3aed",
    status: "Planned",
    discipline: "API automation",
    challenge: "Show service-level confidence across contracts, business rules, failure modes, and authorization without a large test framework.",
    approach: ["Start with consumer-visible contracts and high-value business invariants.", "Separate deterministic API checks from environment health checks.", "Make failures diagnostic through concise request and correlation metadata."],
    evidence: ["API test suite", "Contract checks", "CI report"],
    nextStep: "Select a stable public API and build a risk-ranked pytest suite with schema validation.",
  },
  {
    slug: "performance-testing",
    title: "Performance test example",
    summary:
      "Placeholder case study for load and performance validation before high-traffic releases.",
    imageSrc: "/work/performance.svg",
    imageAlt: "Performance load test chart with rising throughput",
    accent: "#ea580c",
    status: "Planned",
    discipline: "Performance engineering",
    challenge: "Translate business expectations into measurable service objectives and a repeatable load profile.",
    approach: ["Define throughput, latency percentiles, and error budgets before scripting.", "Model ramp, steady-state, and recovery phases with realistic traffic ratios.", "Report bottlenecks and decision thresholds, not just charts."],
    evidence: ["Load model", "Threshold checks", "Decision report"],
    nextStep: "Choose a safe target service, establish a baseline, and publish a reproducible k6 scenario.",
  },
  {
    slug: "ai-driven-testing",
    title: "AI driven testing example",
    summary:
      "Placeholder case study for combining AI assistance with human judgment in test design.",
    imageSrc: "/work/ai-testing.svg",
    imageAlt: "AI assisted testing network diagram",
    accent: "#0891b2",
    status: "Planned",
    discipline: "AI quality",
    challenge: "Evaluate an AI-assisted workflow with repeatable evidence while keeping human review, privacy, and failure analysis explicit.",
    approach: ["Define a small labelled evaluation set and a task-specific scoring rubric.", "Track quality, consistency, latency, and unsafe or unsupported outputs.", "Keep prompts versioned and require human judgment for ambiguous results."],
    evidence: ["Evaluation dataset", "Scoring rubric", "Failure analysis"],
    nextStep: "Select one bounded testing task and build a deterministic evaluation harness around it.",
  },
] as const;

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
