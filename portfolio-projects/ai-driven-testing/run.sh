#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$project_dir"

python3 src/evaluate.py
python3 -m unittest discover -s tests -v
python3 src/evaluate.py
git diff --exit-code -- evidence/report.json evidence/results.svg
