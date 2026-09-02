"""API contract checks against the public Restful Booker practice API."""

from jsonschema import validate


BOOKING_SCHEMA = {
    "type": "object",
    "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
    ],
    "properties": {
        "firstname": {"type": "string", "minLength": 1},
        "lastname": {"type": "string", "minLength": 1},
        "totalprice": {"type": ["integer", "null"]},
        "depositpaid": {"type": "boolean"},
        "bookingdates": {
            "type": "object",
            "required": ["checkin", "checkout"],
            "properties": {
                "checkin": {"type": "string"},
                "checkout": {"type": "string"},
            },
        },
        "additionalneeds": {"type": "string"},
    },
}


def test_booking_collection_is_available(booker):
    """List bookings from the public practice API."""
    response = booker.request("GET", "/booking")
    booker.assert_status(response, 200)
    bookings = response.json()
    assert isinstance(bookings, list)
    assert bookings, "Expected Restful Booker to expose seed bookings"
    assert "bookingid" in bookings[0]


def test_booking_detail_matches_contract(booker):
    """Fetch one booking and validate the public response schema."""
    booking_id = booker.request("GET", "/booking").json()[0]["bookingid"]
    response = booker.request("GET", f"/booking/{booking_id}")
    booker.assert_status(response, 200)
    assert "application/json" in response.headers.get("Content-Type", "")
    validate(response.json(), BOOKING_SCHEMA)


def test_missing_booking_returns_not_found(booker):
    """Unknown booking IDs should return a client-visible not-found response."""
    response = booker.request("GET", "/booking/99999999")
    booker.assert_status(response, 404)


def test_auth_returns_token_for_valid_credentials(booker):
    """Valid admin credentials should mint a reusable token."""
    response = booker.request(
        "POST",
        "/auth",
        json={"username": "admin", "password": "password123"},
    )
    booker.assert_status(response, 200)
    assert response.json()["token"]


def test_auth_rejects_bad_credentials(booker):
    """Invalid credentials should not mint a usable token."""
    response = booker.request(
        "POST",
        "/auth",
        json={"username": "admin", "password": "not-the-password"},
    )
    booker.assert_status(response, 200)
    body = response.json()
    assert "token" not in body
    assert body.get("reason") == "Bad credentials"


def test_create_booking_contract(booker, booking_payload):
    """Creating a booking should return an ID and echo the booking body."""
    response = booker.request("POST", "/booking", json=booking_payload)
    booker.assert_status(response, 200)
    body = response.json()
    assert isinstance(body["bookingid"], int)
    validate(body["booking"], BOOKING_SCHEMA)
    assert body["booking"]["firstname"] == booking_payload["firstname"]


def test_created_booking_can_be_retrieved(booker, booking_payload):
    """A newly created booking should be readable by ID."""
    created = booker.request("POST", "/booking", json=booking_payload).json()
    response = booker.request("GET", f"/booking/{created['bookingid']}")
    booker.assert_status(response, 200)
    assert response.json()["lastname"] == booking_payload["lastname"]


def test_filter_bookings_by_name(booker, booking_payload):
    """Query filters should return bookings matching firstname/lastname."""
    created = booker.request("POST", "/booking", json=booking_payload).json()
    response = booker.request(
        "GET",
        "/booking",
        params={
            "firstname": booking_payload["firstname"],
            "lastname": booking_payload["lastname"],
        },
    )
    booker.assert_status(response, 200)
    ids = {item["bookingid"] for item in response.json()}
    assert created["bookingid"] in ids


def test_update_requires_authentication(booker, booking_payload):
    """Updates without a token should be rejected."""
    booking_id = booker.request("POST", "/booking", json=booking_payload).json()[
        "bookingid"
    ]
    response = booker.request("PUT", f"/booking/{booking_id}", json=booking_payload)
    booker.assert_status(response, 403)


def test_update_booking_with_token(booker, auth_token, booking_payload):
    """Authenticated PUT should replace booking fields."""
    booking_id = booker.request("POST", "/booking", json=booking_payload).json()[
        "bookingid"
    ]
    updated = {
        **booking_payload,
        "firstname": "Updated",
        "totalprice": 199,
        "additionalneeds": "Late checkout",
    }
    response = booker.request(
        "PUT",
        f"/booking/{booking_id}",
        json=updated,
        headers={"Cookie": f"token={auth_token}"},
    )
    booker.assert_status(response, 200)
    assert response.json()["firstname"] == "Updated"
    assert response.json()["totalprice"] == 199


def test_partial_update_with_token(booker, auth_token, booking_payload):
    """Authenticated PATCH should update only the supplied fields."""
    booking_id = booker.request("POST", "/booking", json=booking_payload).json()[
        "bookingid"
    ]
    response = booker.request(
        "PATCH",
        f"/booking/{booking_id}",
        json={"additionalneeds": "Quiet room"},
        headers={"Cookie": f"token={auth_token}"},
    )
    booker.assert_status(response, 200)
    assert response.json()["additionalneeds"] == "Quiet room"
    assert response.json()["firstname"] == booking_payload["firstname"]


def test_delete_requires_authentication(booker, booking_payload):
    """Deletes without a token should be rejected."""
    booking_id = booker.request("POST", "/booking", json=booking_payload).json()[
        "bookingid"
    ]
    response = booker.request("DELETE", f"/booking/{booking_id}")
    booker.assert_status(response, 403)


def test_delete_booking_with_token(booker, auth_token, booking_payload):
    """Authenticated delete should remove the booking (Restful Booker returns 201)."""
    booking_id = booker.request("POST", "/booking", json=booking_payload).json()[
        "bookingid"
    ]
    response = booker.request(
        "DELETE",
        f"/booking/{booking_id}",
        headers={"Cookie": f"token={auth_token}"},
    )
    booker.assert_status(response, 201)
    missing = booker.request("GET", f"/booking/{booking_id}")
    booker.assert_status(missing, 404)


def test_invalid_create_payload_is_rejected(booker):
    """Incomplete booking bodies should not create a successful booking record."""
    response = booker.request("POST", "/booking", json={"firstname": "Only"})
    # Public Restful Booker is intentionally quirky; accept either a hard failure
    # or a non-booking error payload rather than a valid bookingid contract.
    if response.status_code == 200:
        assert "bookingid" not in response.json()
    else:
        assert response.status_code >= 400


def test_health_style_ping_via_booking_list(booker):
    """Treat the booking collection as a lightweight availability signal."""
    response = booker.request("GET", "/booking")
    booker.assert_status(response, 200)
    assert response.elapsed.total_seconds() < 10
