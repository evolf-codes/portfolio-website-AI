"""Fast checks for the public Locust target and release-gate decisions.

These unit tests do not generate load. They verify:
1) the practice API contract is reachable, and
2) assess() marks healthy vs breached stats correctly.
"""

import json
import os
import unittest
import urllib.request


BASE_URL = os.getenv(
    "PERF_BASE_URL",
    "https://restful-booker.herokuapp.com",
).rstrip("/")


class FakeStats:
    """Minimal stats stand-in that Locust's assess() can consume."""

    def __init__(self, p95, fail_ratio, total_rps):
        self.p95 = p95
        self.fail_ratio = fail_ratio
        self.total_rps = total_rps

    def get_response_time_percentile(self, _percentile):
        """Return the configured p95 value for gate evaluation."""
        return self.p95


class PerformanceSampleTests(unittest.TestCase):
    """Verify the public target and gate logic without running Locust."""

    def test_booking_collection_contract(self):
        """GET /booking should return at least one booking ID."""
        request = urllib.request.Request(
            f"{BASE_URL}/booking",
            headers={"Accept": "application/json"},
        )
        with urllib.request.urlopen(request, timeout=20) as response:
            body = json.load(response)
            self.assertEqual(response.status, 200)
            self.assertIsInstance(body, list)
            self.assertGreaterEqual(len(body), 1)
            self.assertIn("bookingid", body[0])

    def test_booking_detail_contract(self):
        """GET /booking/1 should be either a detail payload or a clean 404."""
        request = urllib.request.Request(
            f"{BASE_URL}/booking/1",
            headers={"Accept": "application/json"},
        )
        with urllib.request.urlopen(request, timeout=20) as response:
            # Shared practice data can reset; ID 1 may be missing after cleanup.
            self.assertIn(response.status, (200, 404))
            if response.status == 200:
                body = json.load(response)
                self.assertIn("firstname", body)

    def test_release_gate_passes_healthy_stats(self):
        """Healthy fake stats should pass every release objective."""
        from locustfile import assess

        # 400 ms p95, 0% errors, 2 req/s — all inside the Locust thresholds.
        self.assertTrue(all(assess(FakeStats(400, 0, 2)).values()))

    def test_release_gate_identifies_each_breach(self):
        """Each breached threshold should flip its own verdict to False."""
        from locustfile import assess

        # 5000 ms p95, 20% errors, 0.1 req/s — fails p95, errors, and throughput.
        self.assertEqual(
            assess(FakeStats(5000, 0.2, 0.1)),
            {"p95": False, "errors": False, "throughput": False},
        )


if __name__ == "__main__":
    unittest.main()
