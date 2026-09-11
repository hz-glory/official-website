export const CONTACT_INTENTS = ["client", "compute", "career", "invest"] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

export type ContactPayload = {
  intent: ContactIntent;
  name: string;
  email: string;
  company?: string;
  message: string;
  locale: "zh" | "en";
  pagePath?: string;
  from?: string;
  /** Honeypot — bots fill this; humans leave it empty */
  website?: string;
  rfqId?: string;
  computeInquiry?: import("./compute-inquiry").ComputeInquiry;
};

export type ContactChannel =
  | "feishu"
  | "dingtalk"
  | "wecom"
  | "telegram"
  | "webhook"
  | "resend"
  | "formspree";
