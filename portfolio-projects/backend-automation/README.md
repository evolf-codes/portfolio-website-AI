# Backend API automation

Pytest contract suite against the public QA practice API
[Restful Booker](https://restful-booker.herokuapp.com/) on Heroku.

This is the API equivalent of using
[the-internet.herokuapp.com](https://the-internet.herokuapp.com/) for UI automation:
a real, shared practice target designed for testers (auth, CRUD, filters, deliberate quirks).

## What it covers

| Risk | Representative checks |
| --- | --- |
| Availability | Booking collection responds |
| Contract | Booking detail schema and content type |
| Auth | Valid token minting and bad-credential handling |
| Create / read | Booking create and retrieve by ID |
| Filtering | firstname / lastname query filters |
| Authorization | Updates and deletes rejected without a token |
| Mutation | Authenticated PUT, PATCH, and DELETE |

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest
```

Optional override:

```bash
BOOKER_BASE_URL=https://restful-booker.herokuapp.com pytest
```

Expected result: **15 passed**. See
[verbose green-run evidence](evidence/pytest-green-run.svg).

## Notes

- Restful Booker resets periodically and includes intentional quirks (for example
  authenticated DELETE returning `201`).
- No local mock server is required; tests hit the live practice API over HTTPS.
