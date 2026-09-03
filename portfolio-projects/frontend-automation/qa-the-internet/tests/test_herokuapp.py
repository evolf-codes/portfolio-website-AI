# Fifteen focused UI checks against https://the-internet.herokuapp.com
# Goal: show clear, stable Playwright patterns a hiring manager can skim quickly.

import re

from playwright.sync_api import Browser, Page, expect

BASE = "https://the-internet.herokuapp.com"


def test_home_lists_common_challenges(page: Page) -> None:
    """Home page should list the demo scenarios we automate."""
    page.goto(f"{BASE}/")
    # Keep assertions light: link labels can drift slightly on this training site.
    expect(page.get_by_role("link", name="Add/Remove")).to_be_visible()
    expect(page.get_by_role("link", name="Form Authentication")).to_be_visible()


def test_add_remove_creates_deletable_item(page: Page) -> None:
    """Add Element should create a Delete control that removes that item."""
    page.goto(f"{BASE}/add_remove_elements/")
    page.get_by_role("button", name=re.compile("add element", re.I)).click()
    # Scope to .first so we only remove the item we just added.
    page.get_by_role("button", name=re.compile("delete", re.I)).first.click()
    expect(page.get_by_role("button", name=re.compile("delete", re.I))).to_have_count(0)


def test_checkboxes_first_can_be_toggled_off(page: Page) -> None:
    """The first checkbox should end unchecked after an explicit uncheck."""
    page.goto(f"{BASE}/checkboxes")
    first = page.locator("form#checkboxes input[type=checkbox]").first
    # Normalize state first so the assertion is deterministic.
    if not first.is_checked():
        first.check()
    first.uncheck()
    expect(first).not_to_be_checked()


def test_dropdown_selects_option_one(page: Page) -> None:
    """Native select should accept Option 1 by value."""
    page.goto(f"{BASE}/dropdown")
    page.select_option("#dropdown", "1")
    expect(page.locator("#dropdown option:checked")).to_have_text("Option 1")


def test_form_authentication_succeeds(page: Page) -> None:
    """Valid demo credentials should land on the secure area."""
    page.goto(f"{BASE}/login")
    page.get_by_label("username").fill("tomsmith")
    page.get_by_label("Password").fill("SuperSecretPassword!")
    page.get_by_role("button", name=re.compile("login", re.I)).click()
    expect(page).to_have_url(f"{BASE}/secure")
    # Exact h2 avoids matching other "Secure" text on the page.
    expect(page.get_by_role("heading", name="Secure Area", exact=True)).to_be_visible()


def test_forgot_password_exposes_email_field(page: Page) -> None:
    """Forgot-password page should expose an email field for reset."""
    page.goto(f"{BASE}/forgot_password")
    expect(page.get_by_label(re.compile("e-mail", re.I))).to_be_visible()


def test_dynamic_content_refreshes_block(page: Page) -> None:
    """Dynamic content should still render after a refresh click."""
    page.goto(f"{BASE}/dynamic_content?with_content=static")
    # Scope to the first content column; the layout repeats .large-10 elsewhere.
    first_col = page.locator("div#content .large-10").first
    before = first_col.inner_text()
    page.get_by_role("link", name=re.compile("click here", re.I)).first.click()
    after = first_col.inner_text()
    # Static mode keeps structure; we only require non-empty content before/after.
    assert before.strip()
    assert after.strip()


def test_broken_images_page_has_heading(page: Page) -> None:
    """Broken-images demo should load with a clear heading."""
    page.goto(f"{BASE}/broken_images")
    expect(page.get_by_role("heading", name=re.compile("broken", re.I))).to_be_visible()


def test_hovers_reveals_profile_caption(page: Page) -> None:
    """Hovering the first figure should reveal its caption."""
    page.goto(f"{BASE}/hovers")
    first = page.locator("div.figure").first
    first.hover()
    # Caption text can vary; assert the caption node is populated.
    expect(first.locator("div.figcaption h5")).not_to_be_empty()


def test_key_presses_feeds_back_last_key(page: Page) -> None:
    """Key-presses page should echo the last character typed."""
    page.goto(f"{BASE}/key_presses")
    page.locator("#target").press("A")
    expect(page.locator("#result")).to_contain_text("A")


def test_table_example_has_headers(page: Page) -> None:
    """Example tables should expose readable column headers."""
    page.goto(f"{BASE}/tables")
    last = page.locator("table").last
    expect(last).to_be_visible()
    expect(last.locator("th").first).not_to_be_empty()


def test_status_code_200_page_is_ok(page: Page) -> None:
    """Status-codes/200 should render a successful 200 page body."""
    page.goto(f"{BASE}/status_codes/200")
    expect(page).to_have_url(f"{BASE}/status_codes/200")
    expect(page.locator("body")).to_contain_text("200")


def test_a_b_page_loads_experiment_text(page: Page) -> None:
    """A/B page should load experiment copy even when the variant changes."""
    page.goto(f"{BASE}/abtest")
    # Title may be Control or Variation; share the "A/B Test" prefix.
    expect(page.get_by_text(re.compile(r"A/B Test", re.I)).first).to_be_visible()
    expect(page.locator("p").first).to_be_visible()


def test_new_window_opens_second_page(page: Page) -> None:
    """Click Here should open a second window with the new-page URL."""
    page.goto(f"{BASE}/windows")
    with page.context.expect_page() as new_page:
        page.get_by_role("link", name=re.compile("click here", re.I)).click()
    other = new_page.value
    try:
        other.wait_for_load_state("domcontentloaded")
        expect(other).to_have_url(f"{BASE}/windows/new")
    finally:
        # Always close the extra tab so later tests stay on one page.
        other.close()


def test_basic_auth_with_credentials(browser: Browser) -> None:
    """HTTP basic auth should succeed with the documented demo credentials."""
    # Separate browser context so the rest of the suite stays anonymous.
    context = browser.new_context(
        base_url=BASE,
        http_credentials={"username": "admin", "password": "admin"},
    )
    p = context.new_page()
    try:
        p.goto(f"{BASE}/basic_auth")
        expect(p.get_by_text(re.compile("congratulations", re.I))).to_be_visible()
    finally:
        context.close()
