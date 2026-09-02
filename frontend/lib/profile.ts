export const PROFILE_SUMMARY = [
  "Fifteen years across capital markets, digital assets, and high-volume trading systems.",
  "I build and mentor QA teams, partner with product and engineering, and stay hands-on enough to keep delivery honest.",
  "Deep domain in trading engines, spot and margin flows, system integration, and production risk.",
] as const;

export const CERTIFICATIONS = [
  { year: "2021", name: "Big Data Analytics Certificate, York University" },
  { year: "2017", name: "Certified ScrumMaster (CSM), Scrum Alliance" },
  { year: "2016", name: "ISTQB Foundation Level" },
  { year: "2016", name: "Canadian Capital Markets, CSI" },
] as const;

export const CORE_SKILLS = [
  "QA leadership & team development",
  "Quality strategy",
  "AI-assisted quality",
  "Capital markets & digital assets",
  "Spot / margin trading",
  "System integration",
  "Performance & capacity testing",
  "Test automation",
  "CI/CD & GitLab",
  "Release & production risk",
  "Test environment management",
  "Python · pytest · Playwright",
  "JMeter · Postman · Locust",
  "Oracle SQL · Splunk · AWS",
  "Jira · Confluence · TestRail",
] as const;

/** Skills shown on the home intro — skip labels already covered in the bio. */
export const INTRO_SKILLS = [
  "AI-assisted quality",
  "Capital markets & digital assets",
  "Spot / margin trading",
  "System integration",
  "Performance & capacity testing",
  "Test automation",
  "CI/CD & GitLab",
  "Release & production risk",
] as const;

export const EDUCATION = {
  school: "York University",
  degree: "B.Com. (Honours), Business Systems Analysis",
  years: "2008 – 2013",
  honors: "Dean’s List / Honour Roll",
} as const;
