# Sample coordination

Use one implementation agent per sample, subject to available concurrency. Each agent owns only its folder and returns this handoff:

- project slug and recommended `Planned` or `Ready` status;
- changed files and stable evidence paths;
- exact verification commands and results;
- known limitations and the next useful increment.

Project agents do not edit `frontend/lib/work-projects.ts`, shared components, or deployment files. The integration owner applies accepted handoffs to the site. The test owner runs `npm run verify` from the repository root after integration; externally dependent sample checks use `npm run verify:live` separately. The deployment owner runs `npm run release` only after all writing agents are idle, the diff has been reviewed, and the deterministic gate is green.

Keep bulky generated reports out of Git. Commit only compact evidence that a reviewer needs and link it from the relevant sample.
