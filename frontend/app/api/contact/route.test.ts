import { describe, expect, it, vi, afterEach } from "vitest";
import { POST } from "./route";

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.FORMSPREE_FORM_ID;
  });

  it("returns 400 for invalid payloads", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: "Jane" }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("returns 503 with fallback when Formspree is not configured", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          subject: "Hello",
          message: "Body",
        }),
      }),
    );

    const data = await response.json();
    expect(response.status).toBe(503);
    expect(data.fallback).toBe(true);
    expect(data.to).toBe("eric.volfson@gmail.com");
  });

  it("returns ok when Formspree accepts the submission", async () => {
    process.env.FORMSPREE_FORM_ID = "test-form-id";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, next: "/thanks" }),
      }),
    );

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          subject: "Hello",
          message: "Body",
        }),
      }),
    );

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://formspree.io/f/test-form-id",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
