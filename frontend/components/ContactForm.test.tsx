import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach } from "vitest";
import * as mailtoLib from "@/lib/mailto";
import { SITE_EMAIL } from "@/lib/site";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows an error when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /please complete your name and email/i,
    );
  });

  it("shows an error when subject or message is missing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "ada@test.dev");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      await screen.findByText(/please add a subject and message/i),
    ).toBeInTheDocument();
  });

  it("shows success when the API accepts the message", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, to: SITE_EMAIL }),
      }),
    );

    render(<ContactForm />);
    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "Test message");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Thanks")).toBeInTheDocument();
  });

  it("falls back to mailto when the API is not configured", async () => {
    const user = userEvent.setup();
    const openMailto = vi.spyOn(mailtoLib, "openMailto");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({ fallback: true, to: SITE_EMAIL }),
      }),
    );

    render(<ContactForm />);
    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "Test message");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(openMailto).toHaveBeenCalled());
    expect(await screen.findByRole("alert")).toHaveTextContent(/email app/i);

    openMailto.mockRestore();
  });
});
