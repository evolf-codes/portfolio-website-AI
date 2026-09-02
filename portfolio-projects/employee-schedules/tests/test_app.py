"""Contract tests for the server-rendered review page."""

from app import render_page


def test_page_has_semantic_headings_and_status_text():
    """Risk information remains available without relying on color."""
    page = render_page()
    assert '<html lang="en">' in page
    assert 'aria-labelledby="timeline-heading"' in page
    assert "Review required" in page
    assert "Coverage gap: 16:00–16:30" in page


def test_page_declares_mobile_viewport_and_fixture_context():
    """The demo communicates responsive intent and data limitations."""
    page = render_page()
    assert 'name="viewport"' in page
    assert "No employee data is stored" in page
    assert "America/Toronto" in page
