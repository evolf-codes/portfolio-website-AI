# Git and deploy (portfolio)

Quick reference for pushing changes and deploying to Cloudflare Workers.

## Prerequisites (one-time)

- Git remote: `git@github.com:evolf-codes/portfolio-website-AI.git`
- Cloudflare project linked to that repo
- Cloudflare **deploy command**: `npm run deploy` (not bare `npx wrangler deploy`)
- Cloudflare env vars: `FORMSPREE_FORM_ID`, `NEXT_PUBLIC_SITE_EMAIL`

See `frontend/CLOUDFLARE.md` for dashboard details.

## Every release

### 1. Work on `main` locally

```bash
cd /Users/evolfson/Documents/portfolio
git status
```

### 2. Run tests (recommended)

```bash
cd frontend
npm test
npm run build
```

Full check (unit + build + e2e):

```bash
cd frontend
npm run test:all
```

Preview locally:

```bash
cd frontend
npm run start:local
```

Open http://127.0.0.1:3002

### 3. Stage and commit

From the repo root:

```bash
cd /Users/evolfson/Documents/portfolio
git add -A
git status
git commit -m "Short summary of what changed and why."
```

Use a clear message (one or two sentences). Example:

```bash
git commit -m "Unify page layout typography and update Journey employer label."
```

### 4. Push to GitHub

```bash
git push origin main
```

Cloudflare Workers Builds runs automatically on push to `main`.

### 5. Confirm deploy in Cloudflare

1. Cloudflare dashboard → Workers & Pages → your project → **Deployments**
2. Wait for the latest build to finish (green)
3. Open the live URL and smoke-test: home styles, Journey, About, Contact form

Build log should show `opennextjs-cloudflare build` and `wrangler deploy`, not only `npx wrangler deploy`.

### 6. If the build fails

- Check **Root directory** is repo root (or use `frontend` with `npm run deploy` there)
- **Deploy command** must be `npm run deploy` at repo root
- Read the failed step in the build log; fix locally, commit, push again

## Manual deploy (optional, from your machine)

Requires [Wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/#login):

```bash
cd /Users/evolfson/Documents/portfolio
npm run deploy
```

Same as CI: installs `frontend` deps, OpenNext build, then `wrangler deploy`.

## Useful git commands

| Task | Command |
|------|---------|
| See changes | `git status` / `git diff` |
| Last commits | `git log -5 --oneline` |
| Undo unstaged edits to a file | `git checkout -- path/to/file` |
| Amend last commit (only if not pushed) | `git commit --amend` |

Do not force-push `main` unless you intend to overwrite remote history.
