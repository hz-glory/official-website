# P0 实现规格：止血与转化闭环

面向工程师 / LLM。所有路径相对仓库根目录。

---

## P0-1 联系表单真实提交

### 现状
`web/src/components/ContactForm.tsx`：`onSubmit` 仅 `preventDefault` + 本地 success。

### 目标
提交后将线索发送到公司可跟进渠道；失败时明示错误，禁止假成功。

### 推荐实现（选一，按易用性）

#### 方案 A：API Route + 邮件（Resend / SMTP）【推荐】
1. 新增 `web/src/app/api/contact/route.ts`
2. `ContactForm` 改为 `fetch('/api/contact', { method:'POST', body: JSON })`
3. 服务端校验字段：intent, name, email, company?, message
4. 发送邮件到 `CONTACT_TO_EMAIL`
5. 环境变量：
   - `CONTACT_TO_EMAIL`
   - `RESEND_API_KEY`（或 SMTP_*）
   - `CONTACT_FROM_EMAIL`

#### 方案 B：飞书/钉钉 Webhook
- 服务端 POST 到 Webhook，卡片消息包含意图与字段
- 环境变量：`CONTACT_WEBHOOK_URL`

#### 方案 C：第三方表单（Formspree 等）
- 适合最快上线；仍建议经 API Route 以免暴露 endpoint 策略

### 请求体约定
```ts
type ContactPayload = {
  intent: "client" | "career" | "invest";
  name: string;
  email: string;
  company?: string;
  message: string;
  locale: "zh" | "en";
  pagePath?: string;
  // honeypot
  website?: string; // 机器人填了则静默丢弃
};
```

### UI 要求
- loading 态禁用按钮
- 成功：现有 success 文案
- 失败：双语错误提示 + 保留表单内容
- 增加 honeypot 隐藏域
- 可选：简单 rate limit（IP + 时间窗）

### 验收
- 本地与生产各测 3 意图均能收到
- 空邮箱/非法邮箱被拒
- 机器人 honeypot 不发信

---

## P0-2 全站尾部 CTA 组件

### 新增组件
`web/src/components/SectionCTA.tsx`

Props：
```ts
{
  locale: Locale;
  title: string;
  sub?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}
```

### 挂载页面（在 `</>` 结束前）
- `about/page.tsx`
- `solutions/page.tsx`
- `industries/page.tsx`
- `cases/page.tsx`
- `careers/page.tsx`（主 CTA 投递）
- `insights/page.tsx`（若仍可见）

### 文案位置
在 `zh.ts` / `en.ts` 增加 `sectionCta` 通用字典，或各页 `cta` 字段。

### 案例页额外要求
每个案例卡片底部增加链接：
- 中文：`讨论类似项目 →` → `/contact?intent=client&from=case-{id}`
- 英文：`Discuss a similar project →`

---

## P0-3 Insights 导航与页面策略

### 决策（默认采用策略 1）
1. **策略 1（推荐）**：导航暂时移除 Insights；页路由保留但 noindex
2. 策略 2：导航保留，页面改为单一 Coming Soon + 订阅/联系，删除假文章卡片

### 代码改动
- `zh.ts` / `en.ts` 的 `nav` 数组删除 insights 项（策略 1）
- `insights/page.tsx` metadata robots: `noindex`（策略 1）
- Footer 若有 insights 链接同步处理
- 真文章上线后恢复导航并取消 noindex

---

## P0-4 SEO 基础

### 新增文件
1. `web/src/app/sitemap.ts`  
   - 输出 zh/en 全部静态路由  
   - contact 可纳入  
   - insights 若 noindex 可排除
2. `web/src/app/robots.ts`  
   - allow `/`  
   - sitemap URL 指向生产域
3. 根 layout 或 locale layout：
   - `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!)`
   - 每页 `alternates.languages = { zh: '...', en: '...' }`
   - `alternates.canonical`
   - `openGraph` + `twitter`

### 环境变量
- `NEXT_PUBLIC_SITE_URL`（如 `https://www.example.com`）

### OG 图
- 新增 `web/public/og/default.png`（1200×630）  
  若暂无设计：用品牌色 +「光荣智能 / Glorion Intelligence」字标生成静态图

### html lang
- 将 `web/src/app/layout.tsx` 的 `<html lang="zh">` 改为由 locale 决定  
  推荐：把 fonts/metadata 留在 root，把 `<html lang>` 移到 `[locale]/layout.tsx`（Next 允许在 locale layout 设 html？需验证）  
  **可行做法**：root layout 接收不了 locale 时，用 middleware 或在 `[locale]/layout` 中确认 Next.js 16 对嵌套 html 的限制。  
  **稳妥实现**：middleware 设置 header 不行；采用 `app/[locale]/layout.tsx` 作为带 `<html>` 的真正根——或在 root `layout` 用 headers/cookie。  
  **推荐落地**：增加 `middleware.ts` 仅重写；在 `[locale]/layout.tsx` 使用：
  ```tsx
  // Next.js App Router: set lang on <html> via root layout params if restructure
  ```
  实践方案：重构为 `app/[locale]/layout.tsx` 包含 `<html lang={locale}>`，root `app/layout.tsx` 只透传 children（若框架要求 root 有 html，则 root 用默认 zh，并在 metadata 中强调 en；**更好**：查 Next 文档 — 常见模式是 root 有 html，locale layout 不重复 html，用：
  ```tsx
  // root layout.tsx
  export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return children; // 某些版本不允许
  }
  ```
  **本项目可执行方案**：在 `web/src/app/[locale]/layout.tsx` 增加：
  ```tsx
  <script dangerouslySetInnerHTML={{__html: `document.documentElement.lang='${raw}'`}} />
  ```
  或使用 `useEffect` 客户端设 lang（SEO 不完美）。  
  **最佳**：重构路由，使 `app/[locale]/layout.tsx` 输出 html/body（Next 官方 i18n 示例常见做法）。

**工程师执行时**：优先采用 Next 官方 `[lang]/layout.tsx` 持有 `<html lang={lang}>` 的结构；若改动面大，P0 先做 metadata hreflang，P0.1 再改 html lang。

---

## P0-5 分析埋点

### 选型（选一）
- Vercel Analytics + 自建事件
- Plausible / Umami / GA4

### 最小事件
| 事件名 | 触发 |
|---|---|
| `cta_click` | 所有主 CTA |
| `case_view` | 案例页锚点进入 |
| `contact_submit_success` | 表单成功 |
| `contact_submit_error` | 表单失败 |
| `lang_switch` | 语言切换 |

实现：`web/src/lib/analytics.ts` 统一封装，组件调用。

---

## P0-6 Reveal 无障碍

### CSS
```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### 组件
- 若 `window.matchMedia('(prefers-reduced-motion: reduce)')` 为真，直接加 `is-visible`
- 考虑 SSR：默认可见，mount 后再决定是否隐藏动画（避免无 JS 永久隐藏）  
  **推荐改法**：默认 `opacity:1`，仅在支持动画且 JS 启用时先隐藏再 reveal。

---

## P0-7 字典扩展字段（示例）

在 `types.ts` 增加：
```ts
sectionCta?: { title: string; sub: string; primary: string; secondary?: string };
contact: { ...; privacyNote: string; error: string; sending: string };
```

双语同步写入 `zh.ts` / `en.ts`。
