export type ContactMailtoFields = {
  to: string;
  firstName: string;
  lastName: string;
  fromEmail: string;
  subject: string;
  message: string;
};

export function buildContactMailto(fields: ContactMailtoFields): string {
  const to = fields.to.trim();
  const body = [
    `Name: ${fields.firstName.trim()} ${fields.lastName.trim()}`,
    `Reply-to: ${fields.fromEmail.trim()}`,
    "",
    fields.message.trim(),
  ].join("\n");

  const params = new URLSearchParams({
    subject: fields.subject.trim(),
    body,
  });

  return `mailto:${to}?${params.toString()}`;
}

/** Opens the user's mail client via a synthetic link click (more reliable than location.href). */
export function openMailto(url: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
