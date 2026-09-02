"""Locust workload and release gate for the local catalog API."""

from locust import HttpUser, LoadTestShape, between, events, task

P95_LIMIT_MS = 100
ERROR_RATE_LIMIT = 0.01
MIN_REQUESTS_PER_SECOND = 20


class CatalogUser(HttpUser):
    """Model a visitor repeatedly browsing testing products."""

    wait_time = between(0.02, 0.05)

    @task
    def browse_testing_products(self):
        """Validate status, media type, and response contract."""
        with self.client.get(
            "/api/products?category=testing",
            name="GET /api/products?category=[category]",
            catch_response=True,
        ) as response:
            if "application/json" not in response.headers.get("Content-Type", ""):
                response.failure("Expected an application/json response")
                return
            products = response.json().get("products", [])
            if len(products) != 2 or any(
                product.get("category") != "testing" for product in products
            ):
                response.failure("Catalog response contract did not match")


class PortfolioLoadShape(LoadTestShape):
    """Run warm-up, steady-state, and short peak stages."""

    stages = (
        {"duration": 2, "users": 2, "spawn_rate": 2},
        {"duration": 8, "users": 8, "spawn_rate": 4},
        {"duration": 11, "users": 16, "spawn_rate": 8},
    )

    def tick(self):
        """Return the active stage or stop after eleven seconds."""
        elapsed = self.get_run_time()
        for stage in self.stages:
            if elapsed < stage["duration"]:
                return stage["users"], stage["spawn_rate"]
        return None


def assess(stats):
    """Evaluate the aggregate Locust statistics against release thresholds."""
    return {
        "p95": stats.get_response_time_percentile(0.95) < P95_LIMIT_MS,
        "errors": stats.fail_ratio < ERROR_RATE_LIMIT,
        "throughput": stats.total_rps >= MIN_REQUESTS_PER_SECOND,
    }


@events.quitting.add_listener
def enforce_release_gate(environment, **_kwargs):
    """Fail the process when any pre-declared service objective is breached."""
    verdicts = assess(environment.stats.total)
    print("\nRelease gate:")
    print(f"  p95 < {P95_LIMIT_MS} ms: {'PASS' if verdicts['p95'] else 'FAIL'}")
    print(
        f"  errors < {ERROR_RATE_LIMIT:.0%}: "
        f"{'PASS' if verdicts['errors'] else 'FAIL'}"
    )
    print(
        f"  throughput >= {MIN_REQUESTS_PER_SECOND} req/s: "
        f"{'PASS' if verdicts['throughput'] else 'FAIL'}"
    )
    environment.process_exit_code = 0 if all(verdicts.values()) else 1
