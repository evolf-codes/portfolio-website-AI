export type CareerMilestone = {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: readonly string[];
};

export const CAREER_MILESTONES: readonly CareerMilestone[] = [
  {
    id: "kraken-manager",
    company: "Confidential",
    role: "Quality Assurance Manager",
    period: "2025 – Present",
    location: "Remote / Canada",
    highlights: [
      "Interview, hire, onboard, train, and mentor QA staff.",
      "Develop test plans for initiatives ranging from one-week changes to six-month projects.",
      "Allocate QA resources across concurrent projects while coordinating dependencies with development, product, engineering, and external teams.",
      "Review merge requests to verify critical business scenarios and appropriate test and code coverage.",
    ],
  },
  {
    id: "kraken-consultant",
    company: "Confidential",
    role: "Senior Quality Assurance Consultant",
    period: "2022 – 2025",
    location: "Remote / Canada",
    highlights: [
      "Designed functional tests for spot and margin crypto trading across multiple order types on a global platform serving approximately 5 million users.",
      "Created automated system-integration tests across the trading engine, database, and related components.",
      "Identified and tested high-risk edge cases with potential for downtime or production issues.",
      "Managed CI pipelines, code merges, and configuration while improving internal QA workflows.",
      "Triaged defects, maintained Jira dashboards, reproduced production issues, and trained team members on custom tools and processes.",
    ],
  },
  {
    id: "tmx-senior",
    company: "Toronto Stock Exchange (TMX)",
    role: "Senior QA Analyst / Technical Test Lead",
    period: "2016 – 2022",
    location: "Toronto, Canada",
    highlights: [
      "Led performance, capacity, and failure testing across the trading platform, including simulations of approximately 1 billion messages over two days.",
      "Analyzed capacity limitations and designed tests to expose vulnerabilities in order entry, message queuing, and market-data output.",
      "Planned sprint QA activities, estimates, resource allocation, KPI reporting, and release readiness.",
      "Validated APIs with SOAP UI, performed load testing with JMeter, and developed Selenium automation using Python.",
      "Selected projects: Market on Close & Hardware Refresh; Solace Middleware Upgrade; TMX Matrix WebApp; Security Risk Rating.",
    ],
  },
  {
    id: "tmx-env",
    company: "Toronto Stock Exchange (TMX)",
    role: "QA Test Environment Manager",
    period: "2013 – 2016",
    location: "Toronto, Canada",
    highlights: [
      "Managed and monitored production-like QA environments, including start-of-day, end-of-day, batch support, troubleshooting, and escalation.",
      "Supported 35 QA professionals in the equities trading space by maintaining reliable and available test environments.",
      "Led the QA lab migration from Windows XP physical machines to Windows 7 virtual machines.",
    ],
  },
  {
    id: "tmx-analyst",
    company: "Toronto Stock Exchange (TMX)",
    role: "Quality Assurance Analyst",
    period: "2011 – 2013",
    location: "Toronto, Canada",
    highlights: [
      "Managed test cycles and supported release approvals across non-production and production environments.",
      "Validated equities-trading billing calculations using Oracle SQL and detailed business-rule analysis.",
      "Executed functional, regression, equivalency, performance, and user-acceptance testing across trading applications.",
    ],
  },
] as const;
