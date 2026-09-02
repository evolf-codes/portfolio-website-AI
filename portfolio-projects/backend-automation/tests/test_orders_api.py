"""Risk-focused contract tests for the local Orders API."""

from jsonschema import validate


ERROR_SCHEMA = {
    "type": "object",
    "required": ["error"],
    "properties": {"error": {"type": "object", "required": ["code", "message"]}},
}
ORDER_SCHEMA = {
    "type": "object",
    "required": ["id", "sku", "quantity", "total", "status"],
    "properties": {
        "id": {"type": "string"},
        "sku": {"enum": ["keyboard", "mouse"]},
        "quantity": {"type": "integer", "minimum": 1, "maximum": 10},
        "total": {"type": "number", "minimum": 0},
        "status": {"const": "accepted"},
    },
}


def create_order(api, key="order-1", **overrides):
    """Create a valid order with optional field overrides."""
    payload = {"sku": "keyboard", "quantity": 2, **overrides}
    return api.authorized("POST", "/orders", json=payload,
                          headers={"Idempotency-Key": key})


def test_health_contract(api):
    """Expose a stable unauthenticated health contract for monitoring."""
    response = api.request("GET", "/health")
    api.assert_status(response, 200)
    assert response.json() == {"status": "ok", "version": "1.0"}


def test_responses_are_json_and_traceable(api):
    """Return machine-readable content and a correlation ID for diagnosis."""
    response = api.request("GET", "/health")
    assert response.headers["Content-Type"] == "application/json"
    assert response.headers["X-Correlation-ID"] == "local-contract-run"


def test_products_require_authentication(api):
    """Reject product access when a bearer token is missing."""
    response = api.request("GET", "/products")
    api.assert_status(response, 401)
    validate(response.json(), ERROR_SCHEMA)


def test_invalid_token_is_rejected(api):
    """Reject invalid credentials using the standard error envelope."""
    response = api.request("GET", "/products",
                           headers={"Authorization": "Bearer wrong"})
    api.assert_status(response, 401)
    assert response.json()["error"]["code"] == "unauthorized"


def test_product_catalog_contract(api):
    """Publish unique SKUs with positive numeric prices."""
    response = api.authorized("GET", "/products")
    api.assert_status(response, 200)
    products = response.json()["products"]
    assert len({item["sku"] for item in products}) == len(products)
    assert all(item["price"] > 0 for item in products)


def test_create_order_contract(api):
    """Create an accepted order matching the client-facing schema."""
    response = create_order(api)
    api.assert_status(response, 201)
    validate(response.json(), ORDER_SCHEMA)


def test_order_total_is_calculated_server_side(api):
    """Calculate the authoritative total from catalog price and quantity."""
    response = create_order(api, total=0)
    assert response.json()["total"] == 158.0


def test_invalid_quantities_are_rejected(api):
    """Reject quantities outside the supported integer boundary."""
    for index, quantity in enumerate((0, 11, 1.5, True)):
        response = create_order(api, key=f"invalid-{index}", quantity=quantity)
        api.assert_status(response, 422)
        assert response.json()["error"]["code"] == "invalid_quantity"


def test_unknown_product_is_rejected(api):
    """Reject orders for SKUs absent from the product catalog."""
    response = create_order(api, sku="monitor")
    api.assert_status(response, 422)
    assert response.json()["error"]["code"] == "invalid_sku"


def test_malformed_json_has_stable_error(api):
    """Return a useful client error rather than an internal failure."""
    response = api.authorized("POST", "/orders", data="{broken",
                              headers={"Content-Type": "application/json"})
    api.assert_status(response, 400)
    validate(response.json(), ERROR_SCHEMA)


def test_idempotency_key_is_required(api):
    """Require replay protection for transaction creation."""
    response = api.authorized("POST", "/orders",
                              json={"sku": "mouse", "quantity": 1})
    api.assert_status(response, 400)
    assert response.json()["error"]["code"] == "missing_idempotency_key"


def test_identical_replay_returns_original_order(api):
    """Return the original order when an identical request is replayed."""
    first = create_order(api, key="replay")
    replay = create_order(api, key="replay")
    api.assert_status(replay, 200)
    assert replay.json() == first.json()


def test_changed_replay_is_a_conflict(api):
    """Reject reuse of an idempotency key with a changed payload."""
    create_order(api, key="conflict")
    response = create_order(api, key="conflict", quantity=3)
    api.assert_status(response, 409)
    assert response.json()["error"]["code"] == "idempotency_conflict"


def test_created_order_can_be_retrieved(api):
    """Persist accepted order data for authorized retrieval."""
    created = create_order(api).json()
    response = api.authorized("GET", f"/orders/{created['id']}")
    api.assert_status(response, 200)
    assert response.json() == created


def test_missing_order_uses_standard_error(api):
    """Return a stable not-found contract for unknown order IDs."""
    response = api.authorized("GET", "/orders/999")
    api.assert_status(response, 404)
    validate(response.json(), ERROR_SCHEMA)
