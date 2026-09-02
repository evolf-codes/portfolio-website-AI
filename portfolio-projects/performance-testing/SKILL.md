---
name: build-performance-testing-sample
description: Build or refine the portfolio performance sample when demonstrating workload modelling, service objectives, Locust thresholds, and decision-ready analysis.
---

# Performance testing sample

Confirm the target permits load testing before sending traffic. Default to a local or owned service; never run material load against an unapproved public target.

Define the workload, ramp, steady-state window, latency percentiles, throughput, and error thresholds before scripting. Prefer a small Python Locust scenario and checked-in configuration. Capture system and test conditions so results can be compared honestly.

Report what the evidence supports, likely bottlenecks, limitations, and the release decision. A chart without thresholds and analysis is incomplete. Update the portfolio status only after the scenario runs reproducibly.

Use [README.md](README.md) as the scope contract.
Follow the ownership and handoff contract in [../README.md](../README.md); recommend shared-site changes to the integration owner instead of editing them here.
