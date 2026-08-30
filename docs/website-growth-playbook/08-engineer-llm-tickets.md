# 08 · 工程师 / 大模型可执行工单

使用方式：复制单个 TICKET 给工程师或大模型；要求完成后勾选并更新 PR 描述。  
约束：不编造客户数据；双语同步；改动集中在 `web/`；遵循 `09-messaging-kit.md`。

---

## TICKET-P0-01 · 接通联系表单后端 ✅

**优先级**：P0 阻断  
**状态**：已完成（代码已合并；飞书通道 2026-08-09 业务确认可用）  
**规格**：`04-implementation-specs/P0-critical-fixes.md` §P0-1 / `10-contact-form-backends.md`

**完成定义**：三种 intent 实测可达；`npm run build` 通过。

---

## TICKET-P0-02 · SectionCTA 并挂到子页

**优先级**：P0  
**规格**：P0-2  
**涉及文件**：
- `web/src/components/SectionCTA.tsx`（新建）
- `about|solutions|industries|cases|careers/page.tsx`
- dictionary

**完成定义**：五页底部均有主 CTA；移动端可见。

---

## TICKET-P0-03 · 案例卡内「讨论类似项目」

**优先级**：P0  
**涉及文件**：`cases/page.tsx`、dictionary、可选首页案例卡  
**链接格式**：`/contact?intent=client&from=case-{id}`  
**完成定义**：三个案例均有出口链接。

---

## TICKET-P0-04 · Insights 空壳治理

**优先级**：P0  
**规格**：P0-3  
**默认方案**：导航与 Footer 移除 Insights；`insights/page.tsx` 设 `robots: { index: false }`；删除或替换假文章卡片为单一 Coming Soon。  
**完成定义**：新访客从导航点不到空壳文章。

---

## TICKET-P0-05 · SEO 基础件

**优先级**：P0  
**规格**：P0-4  
**新建**：`web/src/app/sitemap.ts`、`web/src/app/robots.ts`  
**修改**：各页 `generateMetadata` 补 `alternates`/`openGraph`；root 补 `metadataBase`  
**环境变量**：`NEXT_PUBLIC_SITE_URL`  
**完成定义**：预览环境可打开 `/sitemap.xml`、`/robots.txt`；分享卡片字段非空。

---

## TICKET-P0-06 · 分析封装与关键事件

**优先级**：P0  
**新建**：`web/src/lib/analytics.ts`  
**埋点**：CTA、表单成功/失败、语言切换  
**完成定义**：文档说明如何在所选分析工具中看到事件；无工具时至少 `console` 在 dev 可观测且 prod 安全 no-op。

---

## TICKET-P0-07 · Reveal 无障碍修复

**优先级**：P0  
**规格**：P0-6  
**涉及**：`Reveal.tsx`、`globals.css`  
**完成定义**：reduced-motion 下无隐藏；刷新首屏关键标题可见。

---

## TICKET-P0-08 · html lang / 标题模板双语

**优先级**：P0  
**问题**：root `layout.tsx` 固定 `lang="zh"`；title template 含中文后缀影响英文页  
**完成定义**：英文页 `document.documentElement.lang === 'en'`（或等价 SSR）；英文 title 不再强制「· 光荣智能」或改为「· Glorion Intelligence」。

---

## TICKET-P1-01 · CaseStudy 模型扩展与 UI

**优先级**：P1  
**规格**：P1-1  
**完成定义**：类型扩展；UI 展示新字段；双语数据写入（无数据的字段可省略，不留「TBD」脏文案）。

---

## TICKET-P1-02 · 团队照片接入

**优先级**：P1（有素材后）  
**规格**：P1-2  
**完成定义**：有图显示图，无图回退字首；布局不抖动。

---

## TICKET-P1-03 · ProofBar

**优先级**：P1  
**规格**：P1-3  
**完成定义**：首页 Hero 下出现场景类型证明条；无虚构 Logo。

---

## TICKET-P1-04 · 信任区 + 诊断说明

**优先级**：P1  
**规格**：P1-4 / P1-5  
**完成定义**：About（或 Solutions）可见四要点；诊断说明有锚点可从 CTA 链入。

---

## TICKET-P1-05 · 联系页信息架构

**优先级**：P1（依赖对外邮箱）  
**规格**：P1-6  
**完成定义**：邮箱 mailto 可用；隐私句与响应时效展示。

---

## TICKET-P1-06 · 英文文案去直译

**优先级**：P1  
**规格**：P1-7、`09-messaging-kit.md`  
**完成定义**：抽检首页/解决方案/成长模型英文，无附录黑名单词组。

---

## TICKET-P2-01 · Insights MD/TS 文章系统

**优先级**：P2  
**规格**：P2-1  
**完成定义**：≥3 篇详情可开；列表无 Coming soon 假卡；导航恢复。

---

## TICKET-P2-02 · 行业主区块着陆化

**优先级**：P2  
**规格**：P2-2  
**完成定义**：制造/政企含案例内链 + CTA。

---

## TICKET-P2-03 · Solutions 边界字段

**优先级**：P2  
**规格**：P2-3  
**完成定义**：至少一个方案展示 notFor 与 timeline。

---

## TICKET-P2-04 · JD 结构化

**优先级**：P2  
**规格**：P2-4  
**完成定义**：三个岗位均有职责与要求；投递可带岗位。

---

## TICKET-P2-05 · JSON-LD Organization

**优先级**：P2  
**规格**：P2-6  
**完成定义**：首页源码含 Organization JSON-LD；Rich Results 测试无致命错误。

---

## 给大模型的通用 System 提示（可粘贴）

```text
你在维护光荣智能（Glorion Intelligence）官网（Next.js，路径 web/）。
请严格按 docs/website-growth-playbook/ 中指定 TICKET 与 implementation-specs 实施。
必须：中英双语同步；不编造客户名/指标/融资数据；不恢复内部「主线/支线」口径；
完成后运行 lint/build；用简短中文说明改了哪些文件与如何验收。
```
