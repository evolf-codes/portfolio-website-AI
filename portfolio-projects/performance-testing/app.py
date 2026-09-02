"""Deterministic local API used only as the approved load-test target."""

import json
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

PRODUCTS = [
    {"id": 1, "name": "Test Strategy", "category": "testing"},
    {"id": 2, "name": "Release Checklist", "category": "testing"},
]


class CatalogHandler(BaseHTTPRequestHandler):
    """Serve health and catalog responses without external dependencies."""

    def do_GET(self):
        """Return the requested local resource."""
        request = urlparse(self.path)
        if request.path == "/health":
            self.send_response(204)
            self.end_headers()
            return
        if request.path == "/api/products":
            category = parse_qs(request.query).get("category", [None])[0]
            products = [
                product
                for product in PRODUCTS
                if category is None or product["category"] == category
            ]
            time.sleep(0.008)
            body = json.dumps({"products": products}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_error(404)

    def log_message(self, _format, *_args):
        """Keep performance output focused on Locust metrics."""


def create_server(port=4177):
    """Create the local threaded HTTP server."""
    return ThreadingHTTPServer(("127.0.0.1", port), CatalogHandler)


if __name__ == "__main__":
    create_server().serve_forever()
