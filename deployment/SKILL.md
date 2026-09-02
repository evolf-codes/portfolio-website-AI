---
name: deploy-portfolio-cloudflare
description: Validate and deploy this portfolio to Cloudflare Workers through its existing OpenNext and Wrangler release path.
---

# Deploy portfolio

Read [README.md](README.md) and [`../frontend/CLOUDFLARE.md`](../frontend/CLOUDFLARE.md) before releasing.

Wait until all implementation agents are idle. Run `npm run verify` from the repository root; stop on any failure. Review the diff and confirm planned samples are not described as complete. Then run `npm run release`, which repeats the gate, installs locked frontend dependencies, builds with OpenNext, and invokes Wrangler.

Deployment is an external mutation: use the user's explicit release authorization and request authentication or command approval when required. Never print or commit secrets. After deployment, verify the reported production URL with focused smoke checks for navigation, work cards, project details, static assets, and the contact form UI. Do not submit a real contact message during a smoke check.

Stop after one deployment retry if the same infrastructure or authentication failure repeats; report the exact blocker instead of changing provider configuration.
