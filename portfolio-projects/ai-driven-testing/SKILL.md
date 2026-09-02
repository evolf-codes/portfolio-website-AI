---
name: build-ai-testing-sample
description: Build or refine the portfolio AI quality sample when evaluating a bounded testing task with labelled cases, scoring, repeatability, and failure analysis.
---

# AI testing sample

Evaluate one narrow task instead of presenting a general AI test generator. Define the user decision, labelled cases, scoring rubric, and acceptable error boundary before implementation.

Version prompts, model identifiers, parameters, datasets, and evaluator logic. Measure task quality, consistency across repeated runs, latency, and unsupported or unsafe outputs. Keep deterministic checks separate from model-graded judgments and retain human review for ambiguous cases.

Use synthetic or approved data only. Publish representative failures and limitations alongside aggregate scores. Update the portfolio status only after the harness and evidence are reproducible.

Use [README.md](README.md) as the scope contract.
Follow the ownership and handoff contract in [../README.md](../README.md); recommend shared-site changes to the integration owner instead of editing them here.
