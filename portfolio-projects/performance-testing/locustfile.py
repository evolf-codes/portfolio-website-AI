"""Locust workload against the public Restful Booker practice API."""

from locust import HttpUser, LoadTestShape, between, events, task

# Public internet thresholds (looser than a local loopback target).
P95_LIMIT_MS = 3000
ERROR_RATE_LIMIT = 0.05
MIN_REQUESTS_PER_SECOND = 0.5


class BookerUser(HttpUser):
    """Browse booking endpoints on the Heroku QA practice API."""

    wait_time = between(0.3, 0.8)

    @task(3)
    def list_bookings(self):
        """Validate the booking collection under light load."""
        with self.client.get(
            "/booking",
            name="GET /booking",
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                response.failure(f"Unexpected status {response.status_code}")
                return
            payload = response.json()
            if not isinstance(payload, list) or not payload:
                response.failure("Expected a non-empty booking list")

    @task(1)
    def read_first_booking(self):
        """Validate a booking detail read using a seed booking ID."""
        with self.client.get(
            "/booking/1",
            name="GET /booking/{id}",
            catch_response=True,
        ) as response:
            # Seed IDs can churn when the shared practice API resets.
            if response.status_code not in (200, 404):
                response.failure(f"Unexpected status {response.status_code}")
                return
            if response.status_code == 200 and "firstname" not in response.text:
                response.failure("Booking detail missing firstname")


class PortfolioLoadShape(LoadTestShape):
    """Keep the public-site load small and respectful."""

    stages = (
        {"duration": 3, "users": 1, "spawn_rate": 1},
        {"duration": 10, "users": 3, "spawn_rate": 1},
        {"duration": 14, "users": 4, "spawn_rate": 1},
    )

    def tick(self):
        """Return the active stage or stop after fourteen seconds."""
        elapsed = self.get_run_time()
        for stage in self.stages:
            if elapsed < stage["duration"]:
                return stage["users"], stage["spawn_rate"]
        return None


def assess(stats):
    """Evaluate aggregate Locust statistics against release thresholds."""
    return {
        "p95": stats.get_response_time_percentile(0.95) < P95_LIMIT_MS,
        "errors": stats.fail_ratio < ERROR_RATE_LIMIT,
        "throughput": stats.total_rps >= MIN_REQUESTS_PER_SECOND,
    }


@events.quitting.add_listener
def enforce_release_gate(environment, **_kwargs):
    """Fail the process when any pre-declared objective is breached."""
    total = environment.stats.total
    verdicts = assess(total)
    print("\nRelease gate:")
    print(f"  requests: {total.num_requests}")
    print(f"  p95 < {P95_LIMIT_MS} ms: {'PASS' if verdicts['p95'] else 'FAIL'}")
    print(
        f"  errors < {ERROR_RATE_LIMIT:.0%}: "
        f"{'PASS' if verdicts['errors'] else 'FAIL'}"
    )
    print(
        f"  throughput >= {MIN_REQUESTS_PER_SECOND} req/s: "
        f"{'PASS' if verdicts['throughput'] else 'FAIL'}"
    )
    environment.process_exit_code = (
        0 if total.num_requests > 0 and all(verdicts.values()) else 1
    )
