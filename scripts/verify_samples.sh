#!/bin/sh
set -eu

repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

(cd "$repo_dir/portfolio-projects/kanban-board" && npm test)
(cd "$repo_dir/portfolio-projects/employee-schedules" && python3 -m pytest -q)
(cd "$repo_dir/portfolio-projects/backend-automation" && .venv/bin/python -m pytest -q)
(cd "$repo_dir/portfolio-projects/ai-driven-testing" && ./run.sh)
(cd "$repo_dir/portfolio-projects/performance-testing" && \
  .venv/bin/python -m unittest discover -s tests -v && \
  .venv/bin/python scripts/run_load_test.py)
