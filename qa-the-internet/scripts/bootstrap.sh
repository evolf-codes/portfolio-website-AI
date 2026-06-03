#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 -m venv .venv
# shellcheck disable=SC1091
. .venv/bin/activate
python -m pip install -U pip
pip install -r requirements.txt
python -m playwright install chromium
echo "OK. Run: . .venv/bin/activate && python -m pytest tests/ -v"
