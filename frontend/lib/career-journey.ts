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
    id: "kraken",
    company: "Confidential — Kraken Digital Asset Exchange",
    role: "Senior Quality Assurance Consultant / QA Manager",
    period: "2022 – Present",
    location: "Remote / Canada",
    highlights: [
      "Design functional tests for spot and margin crypto trading across order types on a platform serving millions of users.",
      "Build automated system integration tests for the trading engine, database, and related components.",
      "Manage CI pipelines, code merges, configuration, and defect triage with Jira dashboards.",
      "Coordinate with development, product, and engineering on complex business requirements.",
      "Train and mentor team members on custom tools, processes, and production issue reproduction.",
    ],
  },
  {
    id: "tmx-senior",
    company: "TMX Group (Toronto Stock Exchange)",
    role: "Senior QA Analyst / Technical Test Lead",
    period: "2016 – 2022",
    location: "Toronto, Canada",
    highlights: [
      "Led performance, capacity, and failure testing (~1B messages simulated over two days).",
      "Maintained agile scrum boards, sprint QA planning, demos, and KPI reporting.",
      "Validated APIs with SOAP UI; load testing with JMeter; Selenium automation with Python.",
      "Central contact for disaster recovery execution and benchmark environment releases.",
      "Notable projects: BM Hardware Refresh, Solace Middleware Upgrade, TMX Matrix WebApp, Atlas Salesforce, TMX Webstore, Security Risk Rating.",
    ],
  },
  {
    id: "tmx-env",
    company: "TMX Group (Toronto Stock Exchange)",
    role: "Quality Assurance Test Environment Manager",
    period: "2013 – 2016",
    location: "Toronto, Canada",
    highlights: [
      "Supported 35 QA team members across equities trading test environments.",
      "Led Windows XP to Windows 7 virtual QA lab migration.",
      "Published daily environment status to IT and business stakeholders.",
      "Defined standards for configuration files, lab software, and environment wiki pages.",
    ],
  },
  {
    id: "tmx-analyst",
    company: "TMX Group (Toronto Stock Exchange)",
    role: "Quality Assurance Analyst",
    period: "2011 – 2013",
    location: "Toronto, Canada",
    highlights: [
      "Validated equities trading billing calculations with Oracle SQL.",
      "Ran functional, regression, performance, equivalency, and UAT cycles.",
      "Managed test cycles and approved releases to non-production environments.",
      "Trained and mentored new employees on in-house trading applications.",
    ],
  },
] as const;
