"""Fast tests for the target contract and release-gate decisions."""

import json
import threading
import unittest
import urllib.request

from app import create_server


class FakeStats:
    """Minimal aggregate stats object accepted by the gate."""

    def __init__(self, p95, fail_ratio, total_rps):
        self.p95 = p95
        self.fail_ratio = fail_ratio
        self.total_rps = total_rps

    def get_response_time_percentile(self, _percentile):
        """Return the configured percentile value."""
        return self.p95


class PerformanceSampleTests(unittest.TestCase):
    """Verify behavior without generating load."""

    def test_catalog_contract(self):
        """The owned target returns the expected filtered product contract."""
        server = create_server(0)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            port = server.server_address[1]
            url = f"http://127.0.0.1:{port}/api/products?category=testing"
            with urllib.request.urlopen(url) as response:
                body = json.load(response)
                self.assertEqual(response.status, 200)
                self.assertEqual(len(body["products"]), 2)
        finally:
            server.shutdown()
            server.server_close()

    def test_release_gate_passes_healthy_stats(self):
        """Healthy measurements pass every objective."""
        from locustfile import assess

        self.assertTrue(all(assess(FakeStats(20, 0, 100)).values()))

    def test_release_gate_identifies_each_breach(self):
        """Each threshold produces a distinct failing verdict."""
        from locustfile import assess

        self.assertEqual(
            assess(FakeStats(120, 0.02, 10)),
            {"p95": False, "errors": False, "throughput": False},
        )


if __name__ == "__main__":
    unittest.main()
