export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 5000;

function trimField(value: unknown, maxLength: number): string {
  return String(value ?? "").trim().slice(0, maxLength);
}

export function validateContactPayload(body: unknown): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const input = body as Record<string, unknown>;
  const firstName = trimField(input.firstName, MAX_FIELD_LENGTH);
  const lastName = trimField(input.lastName, MAX_FIELD_LENGTH);
  const email = trimField(input.email, MAX_FIELD_LENGTH);
  const subject = trimField(input.subject, MAX_FIELD_LENGTH);
  const message = trimField(input.message, MAX_MESSAGE_LENGTH);

  if (!firstName || !lastName || !email) {
    return { ok: false, error: "Please complete your name and email." };
  }
  if (!subject || !message) {
    return { ok: false, error: "Please add a subject and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return {
    ok: true,
    data: { firstName, lastName, email, subject, message },
  };
}

export function formatContactEmailBody(data: ContactPayload): string {
  return [
    `Name: ${data.firstName} ${data.lastName}`,
    `Reply-to: ${data.email}`,
    "",
    data.message,
  ].join("\n");
}
