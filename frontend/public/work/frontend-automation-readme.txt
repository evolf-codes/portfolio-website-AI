# Heroku the-internet UI checks (pytest + Playwright)

Fifteen UI checks against `https://the-internet.herokuapp.com/`.

`pip install` only installs the Python package. You must also download the Chromium
binary into `~/Library/Caches/ms-playwright/` (macOS) with `playwright install`, or
every test will fail with `Executable doesn't exist`.

## One-shot setup (macOS / Linux)

```bash
cd qa-the-internet
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
. .venv/bin/activate
python -m pytest tests/ -v
```

## Run locally (manual)

```bash
cd qa-the-internet
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python -m playwright install chromium
python -m pytest tests/ -v
```

## Troubleshooting: Executable doesn't exist

After upgrading `playwright` in `requirements.txt` or on a new machine, run again:

```bash
. .venv/bin/activate
python -m playwright install chromium
```

If the version changed, Playwright may use a new cache folder; the install step always
refetches the matching browser build.

## Run in Docker

```bash
cd qa-the-internet
docker build -t herokuapp-ui-qa .
docker run --rm herokuapp-ui-qa
```

## Portfolio screenshot (optional)

After a green run, generate a terminal-style PNG the site can show:

```bash
cd qa-the-internet
. .venv/bin/activate
python scripts/snapshot_pytest_output.py
```

The image is written to `../frontend/public/work/frontend-automation-pytest-output.png`.

See `notes.txt` for the rationale and trade-offs.
