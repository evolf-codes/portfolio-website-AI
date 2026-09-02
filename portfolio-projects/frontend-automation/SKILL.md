---
name: maintain-frontend-automation-sample
description: Maintain the portfolio's pytest and Playwright UI automation sample, including its Docker path, test evidence, and senior-level rationale.
---

# Frontend automation sample

Work in [`../../qa-the-internet`](../../qa-the-internet) for executable code and keep the linked portfolio assets synchronized.

Preserve exactly 15 independent, readable scenarios unless the user changes the scope. Each test needs a concise docstring; use comments only to explain non-obvious intent. Prefer role, label, and stable structural locators, Playwright auto-waiting, and one clear behaviour per test. Do not add sleeps or page-object abstraction without demonstrated reuse.

Run the suite locally and in Docker when the environment permits. Regenerate the output screenshot only from a green run. Keep `requirements.txt`, the minimal README, and `notes.txt` accurate, then verify all public download links.

Follow the ownership and handoff contract in [../README.md](../README.md). The live verification hook is `npm run verify:live` from the repository root; published evidence is under `frontend/public/work/frontend-automation-*`.
