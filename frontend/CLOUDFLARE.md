# Deploy on Cloudflare Workers

This app uses [OpenNext for Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) so `/api/contact` runs on the Worker (not static Pages only).

## Workers Builds (GitHub)

| Setting | Value |
|--------|--------|
| **Root directory** | `frontend` |
| **Install command** | `npm ci` (or leave default if it runs in `frontend`) |
| **Build command** | `npm run pages:build` |
| **Deploy command** | `npx wrangler deploy` |

Or use a single deploy step:

| **Deploy command** | `npm run deploy` |

Do **not** use bare `npx wrangler deploy` without `pages:build` first — Wrangler has no `.open-next/` output and will fail with “Could not detect a directory containing static files”.

## Environment variables (dashboard)

| Variable | Notes |
|----------|--------|
| `FORMSPREE_FORM_ID` | Formspree form id (secret) |
| `NEXT_PUBLIC_SITE_EMAIL` | Public contact email, e.g. `58_bent.sleigh@icloud.com` |

## Local

```bash
cd frontend
npm run pages:build
npm run pages:preview   # optional local Worker preview
```

Production deploy (requires `wrangler login` or CI token):

```bash
npm run deploy
```
