"""Deterministic Orders API used by the portfolio contract tests."""

import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse


PRODUCTS = {"keyboard": 79.0, "mouse": 39.0}
TOKEN = "portfolio-test-token"


class OrdersHandler(BaseHTTPRequestHandler):
    """Serve a minimal API with predictable validation and idempotency rules."""

    orders = {}
    idempotency = {}
    next_id = 1

    def log_message(self, _format, *_args):
        """Keep deterministic test output quiet."""

    def _send(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("X-Correlation-ID", "local-contract-run")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _error(self, status, code, message):
        self._send(status, {"error": {"code": code, "message": message}})

    def _authorized(self):
        return self.headers.get("Authorization") == f"Bearer {TOKEN}"

    def _json_body(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            return json.loads(self.rfile.read(length))
        except (ValueError, json.JSONDecodeError):
            return None

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/health":
            self._send(HTTPStatus.OK, {"status": "ok", "version": "1.0"})
            return
        if not self._authorized():
            self._error(
                HTTPStatus.UNAUTHORIZED, "unauthorized", "Valid bearer token required"
            )
            return
        if path == "/products":
            products = [
                {"sku": sku, "price": price} for sku, price in PRODUCTS.items()
            ]
            self._send(HTTPStatus.OK, {"products": products})
            return
        if path.startswith("/orders/"):
            order = self.orders.get(path.rsplit("/", 1)[-1])
            if order:
                self._send(HTTPStatus.OK, order)
            else:
                self._error(HTTPStatus.NOT_FOUND, "not_found", "Order not found")
            return
        self._error(HTTPStatus.NOT_FOUND, "not_found", "Resource not found")

    def do_POST(self):
        if urlparse(self.path).path != "/orders":
            self._error(HTTPStatus.NOT_FOUND, "not_found", "Resource not found")
            return
        if not self._authorized():
            self._error(
                HTTPStatus.UNAUTHORIZED, "unauthorized", "Valid bearer token required"
            )
            return
        payload = self._json_body()
        if not isinstance(payload, dict):
            self._error(
                HTTPStatus.BAD_REQUEST, "invalid_json", "A JSON object is required"
            )
            return
        sku, quantity = payload.get("sku"), payload.get("quantity")
        if sku not in PRODUCTS:
            self._error(
                HTTPStatus.UNPROCESSABLE_ENTITY, "invalid_sku", "Known sku required"
            )
            return
        valid_quantity = (
            not isinstance(quantity, bool)
            and isinstance(quantity, int)
            and 1 <= quantity <= 10
        )
        if not valid_quantity:
            self._error(
                HTTPStatus.UNPROCESSABLE_ENTITY,
                "invalid_quantity",
                "Quantity must be 1 to 10",
            )
            return
        key = self.headers.get("Idempotency-Key")
        if not key:
            self._error(
                HTTPStatus.BAD_REQUEST,
                "missing_idempotency_key",
                "Idempotency-Key required",
            )
            return
        fingerprint = (sku, quantity)
        if key in self.idempotency:
            previous_fingerprint, order = self.idempotency[key]
            if previous_fingerprint != fingerprint:
                self._error(
                    HTTPStatus.CONFLICT, "idempotency_conflict", "Key already used"
                )
                return
            self._send(HTTPStatus.OK, order)
            return
        order_id = str(self.next_id)
        type(self).next_id += 1
        order = {"id": order_id, "sku": sku, "quantity": quantity,
                 "total": PRODUCTS[sku] * quantity, "status": "accepted"}
        self.orders[order_id] = order
        self.idempotency[key] = (fingerprint, order)
        self._send(HTTPStatus.CREATED, order)
