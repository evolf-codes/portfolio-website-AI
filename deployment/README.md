# Deployment

The portfolio deploys from the repository root to Cloudflare Workers through OpenNext.

## Release

1. From the repository root, run `npm run verify`.
2. From the repository root, review `git status` and `git diff --check`.
3. Confirm all implementation agents are idle, then run `npm run release` from the repository root.
4. Record the deployed URL and inspect the home, work, one project, and contact journeys in production.

Required Cloudflare variables and dashboard configuration remain in [`../frontend/CLOUDFLARE.md`](../frontend/CLOUDFLARE.md). Never commit `.env` files or deployment credentials.
