"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { buildContactMailto, openMailto } from "@/lib/mailto";
import { SITE_EMAIL } from "@/lib/site";

type SubmitState = "idle" | "sending" | "sent" | "fallback";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    formRef.current?.setAttribute("data-client-ready", "true");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    if (!payload.firstName.trim() || !payload.lastName.trim() || !payload.email.trim()) {
      setError("Please complete your name and email.");
      setSubmitState("idle");
      return;
    }
    if (!payload.subject.trim() || !payload.message.trim()) {
      setError("Please add a subject and message.");
      setSubmitState("idle");
      return;
    }

    setError(null);
    setSubmitState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fallback?: boolean;
        to?: string;
      };

      if (response.ok && result.ok) {
        setSubmitState("sent");
        return;
      }

      if (result.fallback) {
        const mailto = buildContactMailto({
          to: result.to ?? SITE_EMAIL,
          firstName: payload.firstName,
          lastName: payload.lastName,
          fromEmail: payload.email,
          subject: payload.subject,
          message: payload.message,
        });
        openMailto(mailto);
        setSubmitState("fallback");
        if (result.error) {
          setError(result.error);
        }
        return;
      }

      setSubmitState("idle");
      setError(result.error ?? "Unable to send your message. Please try again.");
    } catch {
      const mailto = buildContactMailto({
        to: SITE_EMAIL,
        firstName: payload.firstName,
        lastName: payload.lastName,
        fromEmail: payload.email,
        subject: payload.subject,
        message: payload.message,
      });
      openMailto(mailto);
      setSubmitState("fallback");
      setError("Could not reach the server. Your email app was opened as a backup.");
    }
  }

  const isSending = submitState === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form"
      noValidate
    >
      <div className="contact-form__row contact-form__row--split">
        <label className="contact-form__label">
          First name
          <input
            className="contact-form__input"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            disabled={isSending}
          />
        </label>
        <label className="contact-form__label">
          Last name
          <input
            className="contact-form__input"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            disabled={isSending}
          />
        </label>
      </div>
      <label className="contact-form__label">
        Email address
        <input
          className="contact-form__input"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSending}
        />
      </label>
      <label className="contact-form__label">
        Subject
        <input
          className="contact-form__input"
          name="subject"
          type="text"
          required
          disabled={isSending}
        />
      </label>
      <label className="contact-form__label">
        Message
        <textarea
          className="contact-form__input contact-form__input--area"
          name="message"
          required
          disabled={isSending}
        />
      </label>
      {error ? (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          {error}
        </p>
      ) : null}
      {submitState === "fallback" ? (
        <p className="contact-form__feedback" role="alert">
          Online delivery is unavailable. Your email app should open with a draft to{" "}
          <a className="text-link font-medium" href={`mailto:${SITE_EMAIL}`}>
            {SITE_EMAIL}
          </a>
          .
        </p>
      ) : null}
      <div className="contact-form__actions">
        <button
          type="submit"
          className="btn-primary contact-form__submit"
          disabled={isSending || submitState === "sent"}
          aria-busy={isSending}
        >
          {isSending ? "Sending…" : "Submit"}
        </button>
        {submitState === "sent" ? (
          <p className="contact-form__thanks" aria-live="polite">
            Thanks
          </p>
        ) : null}
      </div>
    </form>
  );
}
