# Backend API automation

A compact, risk-ranked pytest suite for a deterministic Orders API. It exercises a real HTTP boundary while avoiding a fragile public dependency, making every check suitable for local development and CI.

## What it demonstrates

| Risk | Representative checks |
| --- | --- |
| Breaking client integrations | JSON Schema, content type, stable error envelope |
| Incorrect order acceptance | Required fields, quantity bounds, unknown products |
| Unauthorized data access | Missing and invalid bearer tokens |
| Duplicate transactions | Idempotency-key replay and conflict behaviour |
| Poor operability | Health contract and correlation IDs |

The suite tests behaviour and contracts rather than implementation details. Failure messages include method, path, status, and response body; credentials are never logged.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest
```

The server starts on an ephemeral localhost port and shuts down after the run. No internet access, database, secrets, or persistent state is required.

## Docker

```bash
docker build -t backend-api-sample .
docker run --rm backend-api-sample
```

Expected result: **15 passed**. See the committed [green-run evidence](evidence/pytest-green-run.svg).

## Design notes

- `api.py` is a deliberately small system under test, not a production service.
- `conftest.py` owns lifecycle and exposes an HTTP client with diagnostic assertions.
- Schemas allow additive fields while protecting required types and client-critical values.
- Each test is independent; mutable API state is recreated for every test.

Known limitation: this sample does not prove production authentication, persistence, or network resilience. The next useful increment would run the same contract layer against a deployed test environment and publish JUnit results in CI.
