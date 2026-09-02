# Performance testing: local catalog API

A small, reproducible load test that answers one release question: can a catalog
read endpoint sustain the expected browsing traffic without breaching its service
objectives?

The target is an intentionally small local HTTP service. No public system receives
load. The runner starts the service, waits for readiness, executes the scenario,
and always stops it.

## Workload and release criteria

| Stage | Duration | Virtual users | Purpose |
| --- | ---: | ---: | --- |
| Warm-up | 2 seconds | 2 | Establish connections and caches |
| Steady state | 6 seconds | 8 | Model normal concurrent browsing |
| Peak | 3 seconds | 16 | Exercise a short traffic spike |

Each user repeatedly requests `GET /api/products?category=testing` and validates
the status, content type, and response contract. The build fails unless all of
these pre-declared thresholds pass:

- p95 latency below 100 ms;
- HTTP error rate below 1%;
- throughput at least 20 requests/second.

## Run

Requires Python 3.11 or newer. Locust is pinned for reproducible tooling.

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python scripts/run_load_test.py
```

The load command is the complete one-command run. It exits non-zero on a threshold
breach and prints the workload, test conditions, percentile results, and release
decision. See the compact [green-run evidence](evidence/load-test-green-run.svg)
for a representative run.

## Result and interpretation

The recorded local run passed all three release criteria: 2,085 requests at 188.9
requests/second, 14 ms p95 latency, and 0% failures. This supports
releasing this endpoint for the modelled workload on the recorded machine; it does
not establish production capacity.

The large margin and flat local response time indicate the service was not close
to saturation. The next useful increment is to run an equivalent arrival-rate
scenario in a controlled staging environment while correlating CPU, memory,
connection-pool, and datastore telemetry. Network latency, authentication,
production data volume, and shared infrastructure are intentionally outside this
sample, so results must not be extrapolated to production.

## Design notes

This sample keeps the application deterministic and the assertions diagnostic.
Thresholds are declared before execution, warm-up is separated from measurement,
and failures identify the breached objective. The application target uses only the
Python standard library. The workload uses Locust's standard `HttpUser`,
`LoadTestShape`, response validation, and lifecycle hooks.
