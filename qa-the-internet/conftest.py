import pytest
from playwright.sync_api import Browser, Page, Playwright, sync_playwright

BASE = "https://the-internet.herokuapp.com"


@pytest.fixture(scope="session")
def playwright_instance() -> Playwright:
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="session")
def browser(playwright_instance: Playwright) -> Browser:
    try:
        br = playwright_instance.chromium.launch(headless=True)
    except Exception as exc:  # pragma: no cover
        err = str(exc)
        if "Executable doesn't exist" in err or "BrowserType.launch" in err:
            pytest.fail(
                "Playwright browser binaries are not installed for this venv. "
                "From qa-the-internet with .venv active, run:\n"
                "  python -m playwright install chromium\n"
                f"(underlying error: {err})"
            )
        raise
    yield br
    br.close()


@pytest.fixture
def page(browser: Browser) -> Page:
    context = browser.new_context()
    page = context.new_page()
    page.set_default_timeout(30_000)
    yield page
    context.close()
