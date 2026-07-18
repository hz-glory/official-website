"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
  defaultIntent?: string;
};

export function ContactForm({ dict, defaultIntent }: Props) {
  const intents = dict.contact.form.intents;
  const initial = useMemo(() => {
    if (defaultIntent && intents.some((i) => i.value === defaultIntent)) {
      return defaultIntent;
    }
    return intents[0]?.value ?? "client";
  }, [defaultIntent, intents]);

  const [intent, setIntent] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="panel grid gap-4 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
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
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="email">{dict.contact.form.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="company">{dict.contact.form.company}</label>
            <input id="company" name="company" autoComplete="organization" />
          </div>

          <div className="form-field">
            <label htmlFor="message">{dict.contact.form.message}</label>
            <textarea id="message" name="message" rows={5} required />
          </div>

          <button type="submit" className="btn btn-primary w-fit">
            {dict.contact.form.submit}
          </button>
        </>
      )}
    </form>
  );
}
