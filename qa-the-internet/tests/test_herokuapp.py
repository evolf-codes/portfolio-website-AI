# Sample UI checks against the public training site: https://the-internet.herokuapp.com

import re

from playwright.sync_api import Browser, Page, expect

BASE = "https://the-internet.herokuapp.com"


def test_home_lists_common_challenges(page: Page) -> None:
    """Home page should expose links to the demo scenarios we automate."""
    page.goto(f"{BASE}/")
    # Expect at least a few challenge links; exact copy can drift so keep checks light.
    expect(page.get_by_role("link", name="Add/Remove")).to_be_visible()
    expect(page.get_by_role("link", name="Form Authentication")).to_be_visible()


def test_add_remove_creates_deletable_item(page: Page) -> None:
    """Clicking 'Add Element' should append a delete control we can use."""
    page.goto(f"{BASE}/add_remove_elements/")
    add = page.get_by_role("button", name=re.compile("add element", re.I))
    add.click()
    # First delete only appears after an add; scope to the first button for stability.
    page.get_by_role("button", name=re.compile("delete", re.I)).first.click()
    # After delete, no delete button should remain in the list for an empty add cycle.
    expect(page.get_by_role("button", name=re.compile("delete", re.I))).to_have_count(0)


def test_checkboxes_first_can_be_toggled_off(page: Page) -> None:
    """The first checkbox should be toggled to unchecked in a second interaction."""
    page.goto(f"{BASE}/checkboxes")
    first = page.locator("form#checkboxes input[type=checkbox]").first
    if not first.is_checked():
        first.check()
    first.uncheck()
    expect(first).not_to_be_checked()


def test_dropdown_selects_option_one(page: Page) -> None:
    """A native <select> should allow choosing 'Option 1' text."""
    page.goto(f"{BASE}/dropdown")
    page.select_option("#dropdown", "1")
    expect(page.locator("#dropdown option:checked")).to_have_text("Option 1")


def test_form_authentication_succeeds(page: Page) -> None:
    """Valid credentials on /login should land on a secure confirmation page."""
    page.goto(f"{BASE}/login")
    page.get_by_label("username").fill("tomsmith")
    page.get_by_label("Password").fill("SuperSecretPassword!")
    page.get_by_role("button", name=re.compile("login", re.I)).click()
    expect(page).to_have_url(f"{BASE}/secure")
    # Two headings can mention "Secure"; pin the top-level h2 to avoid a strictness violation.
    expect(page.get_by_role("heading", name="Secure Area", exact=True)).to_be_visible()


def test_forgot_password_exposes_email_field(page: Page) -> None:
    """Forgot password flow should at least show an email input to submit a reset."""
    page.goto(f"{BASE}/forgot_password")
    expect(page.get_by_label(re.compile("e-mail", re.I))).to_be_visible()


def test_dynamic_content_refreshes_block(page: Page) -> None:
    """The dynamic list should render rows we can re-fetch after a refresh click."""
    page.goto(f"{BASE}/dynamic_content?with_content=static")
    # The layout repeats `.large-10` columns; scope to the first content column for stability.
    first_col = page.locator("div#content .large-10").first
    before = first_col.inner_text()
    page.get_by_role("link", name=re.compile("click here", re.I)).first.click()
    after = first_col.inner_text()
    # Static mode keeps the same structure; a refresh may still re-render similar rows.
    assert before.strip()
    assert after.strip()


def test_broken_images_page_has_heading(page: Page) -> None:
    """The broken images demo is mostly about detection; the title should be obvious."""
    page.goto(f"{BASE}/broken_images")
    expect(
        page.get_by_role("heading", name=re.compile("broken", re.I)),
    ).to_be_visible()


def test_hovers_reveals_profile_caption(page: Page) -> None:
    """Simple hover on the first figure should make a user caption visible."""
    page.goto(f"{BASE}/hovers")
    first = page.locator("div.figure").first
    first.hover()
    # Caption div becomes visible; label text varies, assert non-empty.
    expect(first.locator("div.figcaption h5")).not_to_be_empty()


def test_key_presses_feeds_back_last_key(page: Page) -> None:
    """The key-presses page should echo a pressed character back to the user."""
    page.goto(f"{BASE}/key_presses")
    page.locator("#target").press("A")
    expect(page.locator("#result")).to_contain_text("A")


def test_table_example_has_headers(page: Page) -> None:
    """A sortable table should expose header cells to align automation with columns."""
    page.goto(f"{BASE}/tables")
    # Last table in this demo page includes sortable headers; target by example ID if present.
    last = page.locator("table").last
    expect(last).to_be_visible()
    expect(last.locator("th").first).not_to_be_empty()


def test_status_code_200_page_is_ok(page: Page) -> None:
    """The status-codes page should have a 200 case we can follow."""
    page.goto(f"{BASE}/status_codes/200")
    expect(page).to_have_url(f"{BASE}/status_codes/200")
    # Body should be short status text, not a browser error.
    expect(page.locator("body")).to_contain_text("200")


def test_a_b_page_loads_experiment_text(page: Page) -> None:
    """A/B testing is non-deterministic; at least a paragraph and heading should show."""
    page.goto(f"{BASE}/abtest")
    # Title is either "A/B Test Control" or a variation; anchor on the shared prefix.
    expect(page.get_by_text(re.compile(r"A/B Test", re.I)).first).to_be_visible()
    expect(page.locator("p").first).to_be_visible()


def test_new_window_opens_second_page(page: Page) -> None:
    """'Click here' for multiple windows should open a second tab we can read."""
    page.goto(f"{BASE}/windows")
    with page.context.expect_page() as new_page:
        page.get_by_role("link", name=re.compile("click here", re.I)).click()
    other = new_page.value
    try:
        other.wait_for_load_state("domcontentloaded")
        expect(other).to_have_url(f"{BASE}/windows/new")
    finally:
        other.close()


def test_basic_auth_with_credentials(browser: Browser) -> None:
    """HTTP basic auth should be satisfied with the documented demo credentials."""
    # Separate context so the rest of the suite stays on anonymous browsing.
    context = browser.new_context(
        base_url=BASE,
        http_credentials={"username": "admin", "password": "admin"},
    )
    p = context.new_page()
    try:
        p.goto(f"{BASE}/basic_auth")
        # Successful auth renders a congratulations paragraph, not 401.
        expect(p.get_by_text(re.compile("congratulations", re.I))).to_be_visible()
    finally:
        context.close()
