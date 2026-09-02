"""Shared fixtures and diagnostic HTTP client."""

import threading
from http.server import ThreadingHTTPServer

import pytest
import requests

from api import OrdersHandler, TOKEN


class ApiClient:
    """Add safe request context when an API assertion fails."""

    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {TOKEN}"}

    def request(self, method, path, **kwargs):
        return requests.request(method, f"{self.base_url}{path}", timeout=2, **kwargs)

    def authorized(self, method, path, **kwargs):
        headers = {**self.headers, **kwargs.pop("headers", {})}
        return self.request(method, path, headers=headers, **kwargs)

    @staticmethod
    def assert_status(response, expected):
        context = (
            f"{response.request.method} {response.request.path_url}: "
            f"{response.status_code} {response.text}"
        )
        assert response.status_code == expected, context


@pytest.fixture()
def api():
    """Start a clean Orders API on an ephemeral port for each test."""
    OrdersHandler.orders = {}
    OrdersHandler.idempotency = {}
    OrdersHandler.next_id = 1
    server = ThreadingHTTPServer(("127.0.0.1", 0), OrdersHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield ApiClient(f"http://127.0.0.1:{server.server_port}")
    server.shutdown()
    server.server_close()
    thread.join(timeout=2)
