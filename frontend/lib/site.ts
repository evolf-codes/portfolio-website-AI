/** Public contact details. Override email with NEXT_PUBLIC_SITE_EMAIL. */
export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_SITE_EMAIL ?? "eric.volfson@gmail.com";

/** Inbox Formspree notifies (may differ from SITE_EMAIL when using an alias). */
export const CONTACT_DELIVERY_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_DELIVERY_EMAIL ??
  process.env.CONTACT_DELIVERY_EMAIL ??
  SITE_EMAIL;

export const SITE_LOCATION = "Ontario, Canada";
export const SITE_LINKEDIN = "https://www.linkedin.com/in/eric-v-aa45ab79/";

export const SITE_TITLE = "Sr. QA Engineer | QA Manager | Capital Markets";
export const SITE_TAGLINE =
  "Thirteen years delivering quality in capital markets, crypto trading, and high-volume platforms.";
