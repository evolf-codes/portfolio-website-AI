# Deploy on Cloudflare Workers

This app uses [OpenNext for Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) so `/api/contact` runs on the Worker (not static Pages only).

## Workers Builds (GitHub)

Your build log must **not** show only `Executing user deploy command: npx wrangler deploy`. Change the deploy command in the Cloudflare dashboard.

### Option A — repo root (recommended if you cannot set a root directory)

| Setting | Value |
|--------|--------|
| **Root directory** | *(leave empty / repository root)* |
| **Deploy command** | `npm run deploy` |

Root `package.json` runs `npm ci` in `frontend`, OpenNext build, then `wrangler deploy`.

### Option B — `frontend` as root

| Setting | Value |
|--------|--------|
| **Root directory** | `frontend` |
| **Build command** | `npm run pages:build` |
| **Deploy command** | `npx wrangler deploy` |

Or one step: **Deploy command** = `npm run deploy` (with root directory `frontend`).

Do **not** use bare `npx wrangler deploy` at the repo root — there is no `wrangler.jsonc` or `.open-next/` there, and you will get “Could not detect a directory containing static files”.

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
