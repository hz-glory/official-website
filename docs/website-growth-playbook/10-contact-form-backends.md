# 10 · 联系表单接收方案（已实现）

> 代码：`web/src/app/api/contact/route.ts` + `web/src/lib/contact/*`  
> 前端：`web/src/components/ContactForm.tsx`  
> **状态（2026-08-09）**：飞书 Webhook 通道已配置完成并可用。

除了邮箱，官网已支持多种「零存储/低运维」接收方式。**任选一种配置环境变量即可**；也可多通道并行（成功一路即算成功）。

---

## 方案对比（方便程度）

| 方案 | 适合谁 | 上手难度 | 是否需要域名邮箱 | 推荐指数 |
|---|---|---|---|---|
| **飞书自定义机器人 Webhook** | 国内团队默认首选 | 低 | 否 | ★★★★★ |
| **钉钉机器人 Webhook** | 已用钉钉的团队 | 低 | 否 | ★★★★★ |
| **企业微信群机器人** | 已用企微的团队 | 低 | 否 | ★★★★★ |
| **Telegram Bot** | 个人/海外沟通 | 低 | 否 | ★★★★ |
| **Formspree** | 想最快、可接受第三方 | 很低 | 否（他们代收） | ★★★★ |
| **通用 Webhook** | 自建 CRM / 飞书多维表中间层 | 中 | 否 | ★★★★ |
| **Resend 邮件** | 已有企业邮箱/域名 | 中 | 是 | ★★★ |

**最推荐：飞书群机器人。** 2 分钟可配好，线索直接进群，手机也能看。

---

## 怎么配（以飞书为例）

1. 建一个飞书群（如「官网线索」）
2. 群设置 → 机器人 → 添加 **自定义机器人**
3. 复制 Webhook 地址
4. 在 Vercel / Cloudflare 环境变量中设置：

```bash
CONTACT_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx
```

5. 重新部署  
6. 打开 `/zh/contact` 提交一条测试

钉钉 / 企微同理，把 URL 填进同一个 `CONTACT_WEBHOOK_URL` 即可（会按域名自动识别）。  
若识别不准，再加：

```bash
CONTACT_WEBHOOK_TYPE=feishu   # 或 dingtalk / wecom / webhook
```

---

## 其他通道环境变量

见 `web/.env.example`：

- Telegram：`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`
- 邮件：`RESEND_API_KEY` + `CONTACT_TO_EMAIL`（可选 `CONTACT_FROM_EMAIL`）
- Formspree：`CONTACT_FORMSPREE_URL`
- 通用 JSON Webhook：`CONTACT_WEBHOOK_URL` + `CONTACT_WEBHOOK_TYPE=webhook`

---

## Vercel / Cloudflare 都要配

两边各自的 Project Environment Variables 都需要写入同一套变量，否则一边能收线索、一边 503。

---

## 安全与行为

- Honeypot 字段 `website`：机器人填写则静默成功、不投递
- 简单 IP 频率限制：约 10 分钟 8 次
- 未配置任何通道：接口返回 503，前端显示「未配置」提示（**不会假成功**）
- 多通道时：一路成功即返回 ok；全部失败才 502

---

## 本地验证

```bash
cd web
cp .env.example .env.local
# 填入 CONTACT_WEBHOOK_URL
npm run dev
# 打开 http://localhost:3000/zh/contact 提交
```

也可用 curl：

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H 'content-type: application/json' \
  -d '{"intent":"client","name":"测试","email":"a@b.com","message":"hello","locale":"zh"}'
```
