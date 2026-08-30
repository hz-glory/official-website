type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
  }
}

export function track(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, { props: payload });
      return;
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", event, payload);
    }
  } catch {
    // never break UX for analytics
  }
}
