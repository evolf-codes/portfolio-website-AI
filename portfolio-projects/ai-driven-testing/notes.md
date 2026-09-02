# Engineering notes

## Why this shape

The test target is deliberately narrow. A hiring reviewer can inspect the dataset, evaluator, thresholds, and failures in minutes. Separating labelled cases from captured runs makes regressions reproducible and keeps model access out of CI. Synthetic checkout requirements avoid privacy and licensing concerns.

The harness keeps deterministic assertions separate from subjective review. Keyword labels are transparent and versioned, but they cannot prove semantic correctness. The score is therefore a release signal, not an automated approval. Production use would add blinded human ratings, inter-rater agreement, demographic and multilingual slices, token/cost telemetry, and a live-model job outside the deterministic merge gate.

## Failure analysis

The candidate misses the `currency` risk in one localization response and follows a prompt injection in one adversarial response. The first shows coverage drift; the second blocks release because safety is a hard gate. Latency values are captured metadata rather than benchmark results and are reported only to expose outliers.

## Versioned inputs

- task/prompt contract: `prompt.md`, version 1.0
- labelled dataset: `data/cases.json`, version 1.0
- captured candidate: `data/runs.json`, `fixture-replay/candidate-v1`
- evaluator: `src/evaluate.py`, rubric version 1.0
