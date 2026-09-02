---
name: build-api-automation-sample
description: Build or refine the portfolio API automation sample when demonstrating contract checks, business invariants, negative paths, and diagnostic reporting.
---

# API automation sample

Choose a stable, safe target and keep dependencies minimal. Prefer a public QA
practice API such as Restful Booker when demonstrating live HTTPS contracts.
Test externally meaningful contracts and business behaviour before exhaustive
endpoint coverage.

Separate deterministic checks from live-service health checks. Cover representative success, validation, authorization, idempotency, and schema risks only where the target supports them. Make failures show the request context needed to investigate while redacting secrets.

Provide a one-command local run, CI-friendly output, and a short risk-to-test map. Do not claim coverage or reliability that has not been measured. Update the portfolio status only after the suite and evidence pass.

Use [README.md](README.md) as the scope contract.
Follow the ownership and handoff contract in [../README.md](../README.md); recommend shared-site changes to the integration owner instead of editing them here.
