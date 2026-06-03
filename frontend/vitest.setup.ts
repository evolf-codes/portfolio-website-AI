import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

function loadPublicSiteEmailFromEnvLocal() {
  try {
    const envPath = resolve(import.meta.dirname, ".env.local");
    const contents = readFileSync(envPath, "utf8");
    for (const line of contents.split("\n")) {
      const match = line.match(/^NEXT_PUBLIC_SITE_EMAIL=(.+)$/);
      if (match) {
        process.env.NEXT_PUBLIC_SITE_EMAIL = match[1].trim();
        return;
      }
    }
  } catch {
    // .env.local optional in CI
  }
}

loadPublicSiteEmailFromEnvLocal();

afterEach(() => {
  cleanup();
});
