# AI-assisted quality engineering

Portfolio evidence for daily AI use in QA (plans, coverage matrices, skills/agents) plus a small offline evaluation harness.

## Portfolio artifacts

- [ai-test-plan.svg](evidence/ai-test-plan.svg) — test plan draft example
- [ai-coverage-matrix.svg](evidence/ai-coverage-matrix.svg) — API to GUI coverage sheet
- Site gallery also shows the end-to-end AI workflow board

## Offline evaluation harness

A small harness for one decision: **is an AI-generated checkout test suggestion safe and useful enough for a QA engineer to review?**

The sample replays three captured candidate runs against six synthetic, labelled cases. Deterministic checks score risk coverage, observable oracles, requirement traceability, unsupported claims, and prompt-injection handling.

## Run it

Requires Python 3.11+ and no packages, API keys, network, or customer data.

```bash
./run.sh
```

The command runs unit tests, rebuilds `evidence/report.json` and `evidence/results.svg`, then checks that generated evidence is current.

See [RUBRIC.md](RUBRIC.md) for scoring and [notes.md](notes.md) for design rationale and limitations.
