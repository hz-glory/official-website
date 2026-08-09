import {
  CONTACT_INTENTS,
  type ContactIntent,
  type ContactPayload,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseContactPayload(input: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "invalid_body" };
  }

  const body = input as Record<string, unknown>;
  const intent = asString(body.intent, 32) as ContactIntent;
  const name = asString(body.name, 80);
  const email = asString(body.email, 120).toLowerCase();
  const company = asString(body.company, 120) || undefined;
  const message = asString(body.message, 4000);
  const locale = asString(body.locale, 8) === "en" ? "en" : "zh";
  const pagePath = asString(body.pagePath, 200) || undefined;
  const from = asString(body.from, 80) || undefined;
  const website = asString(body.website, 200) || undefined;

  if (!CONTACT_INTENTS.includes(intent)) {
    return { ok: false, error: "invalid_intent" };
  }
  if (name.length < 1) {
    return { ok: false, error: "invalid_name" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid_email" };
  }
  if (message.length < 2) {
    return { ok: false, error: "invalid_message" };
  }

  return {
    ok: true,
    data: { intent, name, email, company, message, locale, pagePath, from, website },
  };
}
