#!/usr/bin/env python3
"""Render the most recent pytest output as a PNG for the public portfolio page."""

import html
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
OUT = (
    REPO
    / "frontend"
    / "public"
    / "work"
    / "frontend-automation-pytest-output.png"
)


def main() -> int:
    cmd = [
        sys.executable,
        "-m",
        "pytest",
        str(ROOT / "tests"),
        "-v",
        "--color=no",
        "--tb=short",
    ]
    proc = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    text = (
        f"$ {' '.join(cmd)}\n\n"
        f"exit code: {proc.returncode}\n\n"
        f"--- stdout ---\n{proc.stdout}\n\n"
        f"--- stderr ---\n{proc.stderr}"
    )
    if len(text) > 14_000:
        text = text[:14_000] + "\n\n... (truncated)"
    block = html.escape(text)
    page_html = f"""<!doctype html><html><head><meta charset="utf-8" />
<meta name="color-scheme" content="dark" />
<style>body{{margin:0;padding:20px 24px 32px;background:#0a0a0a;color:#bfe9bf;
font:13px/1.45 ui-monospace, Menlo, Consolas, monospace;}}
pre{{white-space:pre-wrap;word-break:break-word;margin:0;}}</style>
</head><body><pre>{block}</pre></body></html>"""

    OUT.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as td:
        rep = Path(td) / "rep.html"
        rep.write_text(page_html, encoding="utf-8")
        from playwright.sync_api import sync_playwright

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 960, "height": 400})
            page.goto(rep.as_uri())
            page.wait_for_load_state("domcontentloaded")
            page.screenshot(path=str(OUT), full_page=True, type="png")
            browser.close()
    print(f"wrote {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
