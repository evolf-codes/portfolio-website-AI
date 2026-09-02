"""Tiny HTTP application for reviewing schedule risks."""

from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from schedule import assignment_conflicts, coverage_gaps, sample_schedule


def render_page() -> str:
    """Render the sample as a semantic, accessible HTML document."""

    window, assignments, leave = sample_schedule()
    conflicts = assignment_conflicts(assignments, leave)
    gaps = coverage_gaps(window, assignments)
    start = window.start
    duration = (window.end - start).total_seconds()

    def position(item):
        left = (item.start - start).total_seconds() / duration * 100
        width = (item.end - item.start).total_seconds() / duration * 100
        return f"left:{left:.2f}%;width:{width:.2f}%"

    rows = "".join(
        f'<li><div class="person"><strong>{escape(item.person)}</strong>'
        f'<span>{escape(item.role)}</span></div><div class="track">'
        f'<span class="shift" style="{position(item.interval)}">'
        f'{item.interval.start:%H:%M}–{item.interval.end:%H:%M}</span></div></li>'
        for item in assignments
    )
    findings = "".join(f"<li>{escape(item)}</li>" for item in conflicts)
    findings += "".join(
        f"<li>Coverage gap: {gap.start:%H:%M}–{gap.end:%H:%M}</li>" for gap in gaps
    )
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Schedule quality review</title><style>
:root{{--ink:#171717;--muted:#686868;--line:#dedbd4;--paper:#f5f3ee;--card:#fff;--risk:#8b2d2d}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 system-ui,sans-serif}}
main{{width:min(1040px,92vw);margin:64px auto}} header{{display:grid;gap:12px;margin-bottom:36px}}
.eyebrow{{font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}} h1{{font-size:clamp(2.25rem,6vw,4.5rem);line-height:1;margin:0;max-width:780px}}
.lede{{color:var(--muted);max-width:650px}} .summary{{display:flex;gap:12px;flex-wrap:wrap}} .pill{{border:1px solid var(--line);border-radius:99px;background:var(--card);padding:7px 12px}}
.panel{{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:clamp(18px,4vw,32px);box-shadow:0 12px 40px #0000000a}}
.hours{{margin-left:180px;display:flex;justify-content:space-between;color:var(--muted);font-size:.75rem}} .timeline{{list-style:none;padding:0;margin:8px 0 32px}}
.timeline li{{display:grid;grid-template-columns:165px 1fr;gap:15px;align-items:center;margin:12px 0}} .person{{display:flex;flex-direction:column}} .person span{{color:var(--muted);font-size:.8rem}}
.track{{position:relative;height:38px;border-radius:8px;background:repeating-linear-gradient(90deg,#f2f1ed 0,#f2f1ed calc(20% - 1px),var(--line) 20%)}}
.shift{{position:absolute;top:4px;height:30px;overflow:hidden;white-space:nowrap;border-radius:6px;background:var(--ink);color:white;padding:5px 9px;font-size:.78rem}}
.risks{{border-top:1px solid var(--line);padding-top:22px}} .risks h2{{font-size:1rem}} .risks li::marker{{color:var(--risk)}} footer{{color:var(--muted);font-size:.8rem;margin-top:20px}}
@media(max-width:650px){{main{{margin:32px auto}}.hours{{margin-left:0}}.timeline li{{grid-template-columns:1fr}}}}
</style></head><body><main><header><span class="eyebrow">Quality planning · 08 Sep 2026</span>
<h1>Coverage at a glance.</h1><p class="lede">A focused view of staffing risk. Times use America/Toronto and schedule intervals exclude their end boundary.</p>
<div class="summary"><span class="pill">4 assignments</span><span class="pill">2 conflicts</span><span class="pill">1 coverage gap</span></div></header>
<section class="panel" aria-labelledby="timeline-heading"><h2 id="timeline-heading">Tuesday schedule</h2><div class="hours" aria-hidden="true"><span>08:00</span><span>13:00</span><span>18:00</span></div><ol class="timeline">{rows}</ol>
<aside class="risks" aria-labelledby="risk-heading"><h2 id="risk-heading">Review required</h2><ul>{findings}</ul></aside></section>
<footer>Fixture data · No employee data is stored</footer></main></body></html>'''


class Handler(BaseHTTPRequestHandler):
    """Serve the sample and a lightweight health endpoint."""

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            body, status, content_type = b'{"status":"ok"}', 200, "application/json"
        elif self.path == "/":
            body, status, content_type = render_page().encode(), 200, "text/html; charset=utf-8"
        else:
            body, status, content_type = b"Not found", 404, "text/plain; charset=utf-8"
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        """Keep the demo output quiet."""


if __name__ == "__main__":
    print("Schedule sample: http://127.0.0.1:8010")
    ThreadingHTTPServer(("127.0.0.1", 8010), Handler).serve_forever()
