import { NextResponse } from "next/server";
import {
  formatContactEmailBody,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { CONTACT_DELIVERY_EMAIL, SITE_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

async function sendViaFormspree(formId: string, data: ContactPayload) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      _replyto: data.email,
      _subject: `[Portfolio] ${data.subject}`,
      subject: data.subject,
      message: formatContactEmailBody(data),
    }),
  });

  const payload = (await response.json()) as { ok?: boolean; error?: string };

  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || "Form delivery failed.");
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (!formId) {
    return NextResponse.json(
      {
        error: "Contact delivery is not configured.",
        fallback: true,
        to: SITE_EMAIL,
      },
      { status: 503 },
    );
  }

  try {
    await sendViaFormspree(formId, validated.data);
    return NextResponse.json({
      ok: true,
      to: SITE_EMAIL,
      deliveryEmail: CONTACT_DELIVERY_EMAIL,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to send your message.";
    return NextResponse.json({ error: message, fallback: true, to: SITE_EMAIL }, { status: 502 });
  }
}
