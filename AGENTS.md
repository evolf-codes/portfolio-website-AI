# Portfolio website

QA Manager portfolio for Eric Volfson (fintech / digital assets).

## Site shape

- `frontend/` — Next.js app (About, Resume, Work, Contact)
- `portfolio-projects/` — inspectable samples linked from Work
- Deploy to Cloudflare Workers via root `npm run deploy`

Nav: About · Resume · Work · Contact

Work samples (in order):
1. Jira tracking & documentation (leadership)
2. AI-assisted quality engineering
3. Frontend automation (pytest + Playwright + Docker)
4. Backend API automation (Restful Booker)
5. Performance testing (Locust)

## Coding standards

1. Prefer current idiomatic library usage; keep dependencies lean.
2. Keep it simple — no over-engineering, no extra features, no emojis.
3. Keep READMEs minimal. Sample tests need a short docstring plus brief why-comments.
4. After UI/CSS changes: `npm test`, `npm run build`, and Playwright e2e in `frontend/`.

## Color scheme

Black, white, grey, teal accents — professional and light.

## Atlassian Rovo MCP

When connected to atlassian-rovo-mcp:
- MUST use cloudId = "https://ericvolfson.atlassian.net"
- MUST use maxResults: 10 for all search operations
