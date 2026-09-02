"""Fast checks for the public practice target and release-gate decisions."""

import json
import os
import unittest
import urllib.request


BASE_URL = os.getenv(
    "PERF_BASE_URL",
    "https://restful-booker.herokuapp.com",
).rstrip("/")


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
    """Verify the public target contract without generating load."""

    def test_booking_collection_contract(self):
        """Restful Booker returns a booking ID collection."""
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
        """A booking detail payload includes guest name fields when present."""
        request = urllib.request.Request(
            f"{BASE_URL}/booking/1",
            headers={"Accept": "application/json"},
        )
        with urllib.request.urlopen(request, timeout=20) as response:
            # Shared practice data can reset; accept 200 detail or 404 missing.
            self.assertIn(response.status, (200, 404))
            if response.status == 200:
                body = json.load(response)
                self.assertIn("firstname", body)

    def test_release_gate_passes_healthy_stats(self):
        """Healthy measurements pass every objective."""
        from locustfile import assess

        self.assertTrue(all(assess(FakeStats(400, 0, 2)).values()))

    def test_release_gate_identifies_each_breach(self):
        """Each threshold produces a distinct failing verdict."""
        from locustfile import assess

        self.assertEqual(
            assess(FakeStats(5000, 0.2, 0.1)),
            {"p95": False, "errors": False, "throughput": False},
        )


if __name__ == "__main__":
    unittest.main()
