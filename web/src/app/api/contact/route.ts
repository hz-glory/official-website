import { dispatchContact, listConfiguredChannels } from "@/lib/contact/dispatch";
import { hitRateLimit } from "@/lib/contact/rate-limit";
import { parseContactPayload } from "@/lib/contact/validate";

export const runtime = "nodejs";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (listConfiguredChannels().length === 0) {
    return Response.json(
      {
        ok: false,
        error: "not_configured",
        message:
          "No contact delivery channel configured. Set CONTACT_WEBHOOK_URL or another supported env var.",
      },
      { status: 503 },
    );
  }

  const limited = hitRateLimit(`contact:${clientKey(request)}`);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "rate_limited", retryAfterSec: limited.retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseContactPayload(json);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not retry smarter.
  if (parsed.data.website) {
    return Response.json({ ok: true, delivered: ["honeypot"] });
  }

  try {
    const result = await dispatchContact(parsed.data);
    return Response.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[contact]", error);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
