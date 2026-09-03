# Portfolio site (`frontend`)

Next.js app for Eric Volfson's QA portfolio.

## Sections

- **About** — intro, photo, skills (`/#about`)
- **Resume** — PDF + Google Doc links (`/#resume`)
- **Work** — five case studies with evidence tiles (`/#work`)
- **Contact** — Formspree form (`/#contact`)

## Local commands

```bash
npm test
npm run build
npm run test:e2e
npm run start:local   # rebuild + serve on :3002
```

From repo root: `npm run deploy` (OpenNext + Wrangler).

## Styling checklist

1. Run `npm run test:all` after UI/CSS changes (`e2e/styles.spec.ts` catches broken CSS).
2. Use `npm run start:local` for a fresh preview; do not reuse a stale `next start`.
3. Presentation lives in `app/globals.css` (`.btn-primary`, `.page-hero`, `.work-showcase`, etc.) plus Tailwind utilities.
