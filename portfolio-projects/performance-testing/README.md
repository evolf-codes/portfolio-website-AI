# Performance testing: Restful Booker practice API

A short, respectful Locust run against the public QA practice API
[Restful Booker](https://restful-booker.herokuapp.com/) on Heroku.

This mirrors the frontend sample’s approach: hit a site built for testers
(same Heroku practice ecosystem as
[the-internet.herokuapp.com](https://the-internet.herokuapp.com/)), not a
customer production system. Load stays intentionally light.

## Workload and release criteria

| Stage | Duration | Virtual users | Purpose |
| --- | ---: | ---: | --- |
| Warm-up | 3 seconds | 1 | Confirm connectivity |
| Steady state | 7 seconds | 3 | Light browsing concurrency |
| Peak | 4 seconds | 4 | Short, polite spike |

Users call:

- `GET /booking`
- `GET /booking/{id}`

and validate JSON contracts. The run fails unless all gates pass:

- p95 latency below **3000 ms** (public internet)
- HTTP error rate below **5%**
- throughput at least **0.5 requests/second**
- at least one successful request recorded

## Run

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python scripts/run_load_test.py
```

Optional override:

```bash
PERF_BASE_URL=https://restful-booker.herokuapp.com python scripts/run_load_test.py
```

See [green-run evidence](evidence/load-test-green-run.svg).

## Design notes

- Do **not** raise VU counts against this shared practice target.
- Thresholds are tuned for a public network path, not localhost.
