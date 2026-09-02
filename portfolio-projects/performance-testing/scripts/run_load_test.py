"""Start the approved target, run Locust headlessly, and always stop the target."""

import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:4177"


def wait_until_ready():
    """Wait briefly for the local target to accept requests."""
    for _attempt in range(40):
        try:
            with urllib.request.urlopen(f"{BASE_URL}/health", timeout=0.2) as response:
                if response.status == 204:
                    return
        except OSError:
            time.sleep(0.05)
    raise RuntimeError("Local target did not become ready")


def main():
    """Execute the complete, local-only performance scenario."""
    target = subprocess.Popen([sys.executable, "app.py"], cwd=ROOT)
    try:
        wait_until_ready()
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
        return subprocess.run(command, cwd=ROOT, check=False).returncode
    finally:
        target.terminate()
        target.wait(timeout=5)


if __name__ == "__main__":
    raise SystemExit(main())
