import { describe, expect, it } from "vitest";
import { formatContactEmailBody, validateContactPayload } from "./contact";

describe("validateContactPayload", () => {
  it("accepts valid input", () => {
    const result = validateContactPayload({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      subject: "Hello",
      message: "Interested in QA roles.",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe("jane@example.com");
    }
  });

  it("rejects missing subject", () => {
    const result = validateContactPayload({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      subject: "",
      message: "Hi",
    });

    expect(result).toEqual({
      ok: false,
      error: "Please add a subject and message.",
    });
  });

  it("rejects invalid email", () => {
    const result = validateContactPayload({
      firstName: "Jane",
      lastName: "Doe",
      email: "not-an-email",
      subject: "Hi",
      message: "Body",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/valid email/i);
    }
  });
});

describe("formatContactEmailBody", () => {
  it("includes name, reply-to, and message", () => {
    const body = formatContactEmailBody({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test body",
    });

    expect(body).toContain("Jane Doe");
    expect(body).toContain("jane@example.com");
    expect(body).toContain("Test body");
  });
});
