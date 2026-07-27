"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
  defaultIntent?: string;
  defaultFrom?: string;
};

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict, defaultIntent, defaultFrom }: Props) {
  const intents = dict.contact.form.intents;
  const initial = useMemo(() => {
    if (defaultIntent && intents.some((i) => i.value === defaultIntent)) {
      return defaultIntent;
    }
    return intents[0]?.value ?? "client";
  }, [defaultIntent, intents]);

  const [intent, setIntent] = useState(initial);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="panel grid gap-4 p-6 sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (state === "sending") return;

        const form = e.currentTarget;
        const data = new FormData(form);

        setState("sending");
        setError(null);

        try {
          const locale = document.documentElement.lang === "en" ? "en" : "zh";
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              intent: String(data.get("intent") || intent),
              name: String(data.get("name") || ""),
              email: String(data.get("email") || ""),
              company: String(data.get("company") || ""),
              message: String(data.get("message") || ""),
              website: String(data.get("website") || ""),
              locale,
              pagePath: window.location.pathname,
              from: defaultFrom || undefined,
            }),
          });

          const json = (await res.json().catch(() => null)) as
            | { ok?: boolean; error?: string }
            | null;

          if (!res.ok || !json?.ok) {
            const code = json?.error || `http_${res.status}`;
            setError(
              code === "not_configured"
                ? dict.contact.form.notConfigured
                : dict.contact.form.error,
            );
            setState("error");
            return;
          }

          setState("success");
          form.reset();
          setIntent(initial);
        } catch {
          setError(dict.contact.form.error);
          setState("error");
        }
      }}
    >
      {state === "success" ? (
        <p className="text-[var(--teal)]">{dict.contact.form.success}</p>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="intent">{dict.contact.form.intent}</label>
            <select
              id="intent"
              name="intent"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              disabled={state === "sending"}
            >
              {intents.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="form-field">
              <label htmlFor="name">{dict.contact.form.name}</label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                disabled={state === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">{dict.contact.form.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={state === "sending"}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="company">{dict.contact.form.company}</label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              disabled={state === "sending"}
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">{dict.contact.form.message}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={state === "sending"}
            />
          </div>

          {/* Honeypot — keep visually hidden from humans */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {error ? <p className="text-sm text-[var(--orange-deep)]">{error}</p> : null}

          <p className="text-xs leading-relaxed text-[var(--ink-muted)]">
            {dict.contact.form.privacyNote}
          </p>

          <button
            type="submit"
            className="btn btn-primary w-fit"
            disabled={state === "sending"}
          >
            {state === "sending" ? dict.contact.form.sending : dict.contact.form.submit}
          </button>
        </>
      )}
    </form>
  );
}
