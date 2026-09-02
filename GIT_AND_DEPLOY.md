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

Cloudflare runs a build **only if** the Worker is connected to your GitHub repo (see below). A `git push` alone does nothing if Git is not linked.

### 5. Confirm deploy in Cloudflare

**Where to look** (names vary slightly in the UI):

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
2. Click your Worker (e.g. `portfolio-website-ai`)
3. Open **Deployments** (or **Builds** / **Build history**)

You should see a row for commit `b411e7e` (or your latest message) with a build log.

Build log should show `opennextjs-cloudflare build` and `wrangler deploy`, not only `npx wrangler deploy`.

### 5b. No build after `git push`?

Usually the Worker is **not** connected to GitHub, or you are on the wrong project.

**Check Git is connected**

1. Workers & Pages → your Worker → **Settings**
2. Find **Builds** / **Build configuration** / **Connect to Git**
3. Confirm:
   - Repository: `evolf-codes/portfolio-website-AI`
   - Production branch: `main`
   - Deploy command: `npm run deploy`
4. If there is no repo linked, choose **Connect to Git**, authorize GitHub, select the repo and branch, set deploy command, save.

**Trigger a build without a new commit**

- On the Worker page, use **Create deployment** / **Retry deployment** / **Deploy latest commit** (wording depends on account).

**Confirm GitHub received the push**

```bash
cd /Users/evolfson/Documents/portfolio
git log origin/main -1 --oneline
```

Should show your latest commit (e.g. `b411e7e`).

**Deploy from your Mac (always works if Wrangler is logged in)**

```bash
cd /Users/evolfson/Documents/portfolio
npx wrangler login    # once
npm run deploy
```

For a manual production release, prefer `npm run release`; it runs the complete local verification gate before deploying.

That uploads the current code even when Cloudflare Git builds are off.

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
