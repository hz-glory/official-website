import { formatComputeInquirySections, formatComputeInquiryText } from "./compute-inquiry";
import type { ContactChannel, ContactPayload } from "./types";

const INTENT_LABEL: Record<ContactPayload["intent"], { zh: string; en: string }> = {
  client: { zh: "客户合作", en: "Client partnership" },
  compute: { zh: "算力与模型服务", en: "Compute & model APIs" },
  career: { zh: "招聘沟通", en: "Careers" },
  invest: { zh: "投资合作", en: "Investment" },
};

function intentLabel(payload: ContactPayload) {
  const labels = INTENT_LABEL[payload.intent];
  return payload.locale === "en" ? labels.en : labels.zh;
}

function formatHeaderLines(payload: ContactPayload, markdown: boolean) {
  const dash = markdown ? "- " : "";
  const wrap = (value: string) => (markdown ? `\`${value}\`` : value);
  const lines = [
    markdown ? "**光荣智能官网咨询**" : "【光荣智能官网咨询】",
    `${dash}类型: ${intentLabel(payload)} (${wrap(payload.intent)})`,
    payload.rfqId ? `${dash}编号: ${wrap(payload.rfqId)}` : null,
    `${dash}姓名: ${payload.name}`,
    `${dash}邮箱: ${payload.email}`,
    `${dash}公司: ${payload.company || "-"}`,
    `${dash}语言: ${payload.locale}`,
    payload.from ? `${dash}来源: ${payload.from}` : null,
    payload.pagePath ? `${dash}页面: ${payload.pagePath}` : null,
  ];
  return lines.filter((line) => line !== null);
}

function formatText(payload: ContactPayload) {
  const inquiry = payload.computeInquiry
    ? formatComputeInquiryText(payload.computeInquiry, payload.rfqId || "-", "zh")
    : ["留言:", payload.message].join("\n");
  return [...formatHeaderLines(payload, false), "", inquiry].join("\n");
}

function formatMarkdown(payload: ContactPayload) {
  if (!payload.computeInquiry) {
    return [...formatHeaderLines(payload, true), "", payload.message].join("\n");
  }
  return [
    ...formatHeaderLines(payload, true),
    "",
    formatComputeInquiryText(payload.computeInquiry, payload.rfqId || "-", "zh"),
  ].join("\n");
}

function feishuCardTitle(payload: ContactPayload) {
  if (payload.computeInquiry && payload.rfqId) {
    return `算力采购需求 ${payload.rfqId}`;
  }
  return "光荣智能官网咨询";
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`webhook_failed:${res.status}:${text.slice(0, 200)}`);
  }
}

async function sendFeishu(url: string, payload: ContactPayload) {
  const header = {
    title: { tag: "plain_text", content: feishuCardTitle(payload) },
    template: "orange" as const,
  };

  const elements: Array<Record<string, unknown>> = [
    {
      tag: "div",
      text: {
        tag: "lark_md",
        content: formatHeaderLines(payload, true).join("\n"),
      },
    },
  ];

  if (payload.computeInquiry) {
    for (const section of formatComputeInquirySections(payload.computeInquiry, "zh")) {
      elements.push({ tag: "hr" });
      elements.push({
        tag: "div",
        text: {
          tag: "lark_md",
          content: `**${section.title}**\n${section.body}`,
        },
      });
    }
  } else {
    elements.push({
      tag: "div",
      text: {
        tag: "lark_md",
        content: payload.message,
      },
    });
  }

  await postJson(url, {
    msg_type: "interactive",
    card: { header, elements },
  });
}

async function sendDingTalk(url: string, payload: ContactPayload) {
  await postJson(url, {
    msgtype: "markdown",
    markdown: {
      title: "光荣智能官网咨询",
      text: formatMarkdown(payload),
    },
  });
}

async function sendWecom(url: string, payload: ContactPayload) {
  await postJson(url, {
    msgtype: "markdown",
    markdown: {
      content: formatMarkdown(payload),
    },
  });
}

async function sendTelegram(payload: ContactPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("telegram_not_configured");
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await postJson(url, {
    chat_id: chatId,
    text: formatText(payload),
  });
}

async function sendGenericWebhook(url: string, payload: ContactPayload) {
  await postJson(url, {
    source: "glorion-website",
    receivedAt: new Date().toISOString(),
    ...payload,
    website: undefined,
  });
}

async function sendResend(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey || !to) {
    throw new Error("resend_not_configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: payload.rfqId
        ? `[算力采购] ${payload.rfqId} · ${payload.name}`
        : `[官网咨询] ${intentLabel(payload)} · ${payload.name}`,
      text: formatText(payload),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`resend_failed:${res.status}:${text.slice(0, 200)}`);
  }
}

async function sendFormspree(url: string, payload: ContactPayload) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      intent: payload.intent,
      name: payload.name,
      email: payload.email,
      company: payload.company || "",
      message: payload.message,
      locale: payload.locale,
      pagePath: payload.pagePath || "",
      from: payload.from || "",
      rfqId: payload.rfqId || "",
      computeInquiry: payload.computeInquiry || null,
      _subject: payload.rfqId
        ? `[Glorion RFQ] ${payload.rfqId} · ${payload.name}`
        : `[Glorion] ${payload.intent} · ${payload.name}`,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`formspree_failed:${res.status}:${text.slice(0, 200)}`);
  }
}

function detectWebhookType(url: string): ContactChannel {
  const explicit = process.env.CONTACT_WEBHOOK_TYPE?.toLowerCase();
  if (
    explicit === "feishu" ||
    explicit === "dingtalk" ||
    explicit === "wecom" ||
    explicit === "webhook"
  ) {
    return explicit;
  }
  if (url.includes("open.feishu.cn") || url.includes("open.larksuite.com")) {
    return "feishu";
  }
  if (url.includes("oapi.dingtalk.com")) {
    return "dingtalk";
  }
  if (url.includes("qyapi.weixin.qq.com")) {
    return "wecom";
  }
  return "webhook";
}

export function listConfiguredChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];
  if (process.env.CONTACT_WEBHOOK_URL) {
    channels.push(detectWebhookType(process.env.CONTACT_WEBHOOK_URL));
  }
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    channels.push("telegram");
  }
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    channels.push("resend");
  }
  if (process.env.CONTACT_FORMSPREE_URL) {
    channels.push("formspree");
  }
  return channels;
}

export async function dispatchContact(payload: ContactPayload) {
  const channels = listConfiguredChannels();
  if (channels.length === 0) {
    throw new Error("no_channel_configured");
  }

  const results = await Promise.allSettled(
    channels.map(async (channel) => {
      switch (channel) {
        case "feishu":
          await sendFeishu(process.env.CONTACT_WEBHOOK_URL!, payload);
          return channel;
        case "dingtalk":
          await sendDingTalk(process.env.CONTACT_WEBHOOK_URL!, payload);
          return channel;
        case "wecom":
          await sendWecom(process.env.CONTACT_WEBHOOK_URL!, payload);
          return channel;
        case "webhook":
          await sendGenericWebhook(process.env.CONTACT_WEBHOOK_URL!, payload);
          return channel;
        case "telegram":
          await sendTelegram(payload);
          return channel;
        case "resend":
          await sendResend(payload);
          return channel;
        case "formspree":
          await sendFormspree(process.env.CONTACT_FORMSPREE_URL!, payload);
          return channel;
        default:
          return channel;
      }
    }),
  );

  const fulfilled = results.filter((r) => r.status === "fulfilled");
  if (fulfilled.length === 0) {
    const reason = results
      .map((r) => (r.status === "rejected" ? String(r.reason) : ""))
      .filter(Boolean)
      .join(" | ");
    throw new Error(reason || "all_channels_failed");
  }

  return {
    delivered: fulfilled.map((r) => (r as PromiseFulfilledResult<ContactChannel>).value),
  };
}
