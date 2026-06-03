<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Styling checklist (required after UI/CSS changes)

1. Run `npm run test:all` (unit + build + e2e). The `e2e/styles.spec.ts` test fails if CSS assets 404/500.
2. For local preview on port 3002, use `npm run start:local` (always rebuilds). Do not leave an old `next start` running after code changes.
3. Custom presentation lives in `app/globals.css` (`.btn-primary`, `.page-hero`, `.work-card`, etc.) plus Tailwind utilities in components.
