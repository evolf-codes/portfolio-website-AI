import { describe, expect, it } from "vitest";
import { buildContactMailto } from "./mailto";
import { SITE_EMAIL } from "./site";

describe("buildContactMailto", () => {
  it("builds a mailto URL with encoded subject and body", () => {
    const url = buildContactMailto({
      to: "cv@example.com",
      firstName: "Ada",
      lastName: "Lovelace",
      fromEmail: "ada@clientsite.test",
      subject: "Hello & welcome",
      message: "Line one\nLine two",
    });

    expect(url.startsWith("mailto:cv@example.com?")).toBe(true);
    const qs = url.slice("mailto:cv@example.com?".length);
    const params = new URLSearchParams(qs);
    expect(params.get("subject")).toBe("Hello & welcome");
    expect(params.get("body")).toContain("Name: Ada Lovelace");
    expect(params.get("body")).toContain("Reply-to: ada@clientsite.test");
    expect(params.get("body")).toContain("Line one\nLine two");
  });

  it("trims whitespace from fields", () => {
    const url = buildContactMailto({
      to: "cv@example.com",
      firstName: "  Ada ",
      lastName: " Lovelace ",
      fromEmail: " ada@site.test ",
      subject: "  Subj ",
      message: "  Msg body  ",
    });
    const params = new URLSearchParams(url.split("?")[1] ?? "");
    expect(params.get("subject")).toBe("Subj");
    expect(params.get("body")).toContain("Name: Ada Lovelace");
    expect(params.get("body")).toContain("Msg body");
  });

  it("uses the portfolio contact address by default", () => {
    const url = buildContactMailto({
      to: SITE_EMAIL,
      firstName: "Test",
      lastName: "User",
      fromEmail: "visitor@example.com",
      subject: "Hello",
      message: "Message body",
    });

    expect(url.startsWith(`mailto:${SITE_EMAIL}?`)).toBe(true);
    expect(SITE_EMAIL).toBe("58_bent.sleigh@icloud.com");
  });
});
