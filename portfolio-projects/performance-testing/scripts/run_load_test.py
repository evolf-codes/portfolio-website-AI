"""Run a light Locust scenario against the public Restful Booker practice API."""

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.getenv(
    "PERF_BASE_URL",
    "https://restful-booker.herokuapp.com",
).rstrip("/")


def main():
    """Execute a short, respectful load profile against the practice API."""
    command = [
        sys.executable,
        "-m",
        "locust",
        "--headless",
        "--host",
        BASE_URL,
        "--only-summary",
        "--locustfile",
        "locustfile.py",
    ]
    print(f"Target: {BASE_URL}")
    print("Profile: light public-practice load (max 4 VUs, ~14s)")
    return subprocess.run(command, cwd=ROOT, check=False).returncode


if __name__ == "__main__":
    raise SystemExit(main())
