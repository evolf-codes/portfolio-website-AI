#!/bin/sh
set -eu

repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

require_file() {
  path=$1
  if [ ! -f "$path" ]; then
    echo "Missing required evidence: $path" >&2
    exit 1
  fi
}

echo "== Leadership evidence =="
require_file "$repo_dir/portfolio-projects/employee-schedules/evidence/jira-scheduling.svg"
require_file "$repo_dir/frontend/public/work/results/jira-scheduling.svg"
echo "OK"

echo "== AI evidence gallery =="
require_file "$repo_dir/frontend/public/work/results/ai-driven-testing.svg"
require_file "$repo_dir/frontend/public/work/results/ai-test-plan.svg"
require_file "$repo_dir/frontend/public/work/results/ai-coverage-matrix.svg"
echo "OK"

echo "== Backend automation =="
(cd "$repo_dir/portfolio-projects/backend-automation" && \
  if [ ! -x .venv/bin/python ]; then python3 -m venv .venv && .venv/bin/pip install -q -r requirements.txt; fi && \
  .venv/bin/python -m pytest -q)

echo "== AI-driven testing =="
(cd "$repo_dir/portfolio-projects/ai-driven-testing" && ./run.sh)

echo "== Performance testing =="
(cd "$repo_dir/portfolio-projects/performance-testing" && \
  if [ ! -x .venv/bin/python ]; then python3 -m venv .venv && .venv/bin/pip install -q -r requirements.txt; fi && \
  .venv/bin/python -m unittest discover -s tests -v && \
  .venv/bin/python scripts/run_load_test.py)

echo "== Frontend automation package =="
require_file "$repo_dir/portfolio-projects/frontend-automation/qa-the-internet/tests/test_herokuapp.py"
require_file "$repo_dir/portfolio-projects/frontend-automation/qa-the-internet/README.md"
require_file "$repo_dir/frontend/public/work/results/frontend-automation.svg"
echo "OK"

echo "All sample checks passed."
