"""Shared client for the public Restful Booker practice API."""

import os

import pytest
import requests

BASE_URL = os.getenv(
    "BOOKER_BASE_URL",
    "https://restful-booker.herokuapp.com",
).rstrip("/")


class BookerClient:
    """Thin HTTP helper with useful assertion context."""

    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({"Accept": "application/json"})

    def request(self, method: str, path: str, **kwargs):
        return self.session.request(
            method,
            f"{self.base_url}{path}",
            timeout=20,
            **kwargs,
        )

    @staticmethod
    def assert_status(response, expected):
        context = (
            f"{response.request.method} {response.request.path_url}: "
            f"{response.status_code} {response.text[:300]}"
        )
        if isinstance(expected, (list, tuple, set)):
            assert response.status_code in expected, context
        else:
            assert response.status_code == expected, context


@pytest.fixture(scope="session")
def booker():
    """Point every test at the public Restful Booker Heroku practice API."""
    return BookerClient(BASE_URL)


@pytest.fixture()
def auth_token(booker):
    """Obtain a valid session token from POST /auth."""
    response = booker.request(
        "POST",
        "/auth",
        json={"username": "admin", "password": "password123"},
    )
    booker.assert_status(response, 200)
    token = response.json().get("token")
    assert token, response.text
    return token


@pytest.fixture()
def booking_payload():
    """Valid booking body used across create/update checks."""
    return {
        "firstname": "Eric",
        "lastname": "Volfson",
        "totalprice": 125,
        "depositpaid": True,
        "bookingdates": {"checkin": "2026-12-01", "checkout": "2026-12-05"},
        "additionalneeds": "Breakfast",
    }
