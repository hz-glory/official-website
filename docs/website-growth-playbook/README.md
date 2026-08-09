# 光荣智能官网增长作战手册（Website Growth Playbook）

> 目录用途：把官网从「能上线」升级为「可获客、可背书、可转化」的公司宣传阵地。  
> 使用对象：创始人 / 市场 / 交付负责人 / 工程师 / 后续协作的大模型。  
> 产出日期：2026-07-20  
> 站点现状：Vercel + Cloudflare Workers 均已部署成功。

---

## 一句话结论

官网已经具备清晰的 FDE 定位与完整信息架构，**叙事骨架合格，但尚未成为真正的获客与信任转化阵地**。  
当前更像「公司介绍册的网页版」——能讲清我们是谁，但还不足以让客户「现在就预约诊断」、让投资人「留下联系方式深入聊」、让候选人「认真投递」。

**优先级排序：先修转化链路与信任证据，再扩内容与 SEO，最后做体验精修与增长实验。**

---

## 本目录怎么用

| 文件 | 给谁看 | 作用 |
|---|---|---|
| [00-executive-summary.md](./00-executive-summary.md) | 老板 / 决策者 | 评分、结论、投入优先级 |
| [01-current-state-audit.md](./01-current-state-audit.md) | 全员 | 现状盘点（页面/内容/技术） |
| [02-audience-attractiveness.md](./02-audience-attractiveness.md) | 市场 / 销售 / IR | 三类受众吸引力诊断 |
| [03-improvement-roadmap.md](./03-improvement-roadmap.md) | 项目负责人 | 分阶段路线图（P0–P3） |
| [04-implementation-specs/](./04-implementation-specs/) | 工程师 / LLM | 可直接开工的实现规格 |
| [05-page-by-page-briefs.md](./05-page-by-page-briefs.md) | 文案 / 设计 / 工程 | 逐页改造说明 |
| [06-content-asset-checklist.md](./06-content-asset-checklist.md) | 业务侧 | 需要补齐的素材清单 |
| [07-acceptance-criteria.md](./07-acceptance-criteria.md) | QA / 负责人 | 验收标准 |
| [08-engineer-llm-tickets.md](./08-engineer-llm-tickets.md) | 工程师 / LLM | 拆好的工单（可直接复制开干） |
| [09-messaging-kit.md](./09-messaging-kit.md) | 文案 / 全员 | 统一话术与禁用词 |
| [10-contact-form-backends.md](./10-contact-form-backends.md) | 工程 / 运营 | 表单多通道接收方案（飞书等） |

---

## 建议执行节奏（不含日历估时，按技术依赖排序）

1. **P0 止血**：表单真提交、Insight 占位处理、SEO 基础、转化 CTA、分析埋点  
2. **P1 信任**：案例证据升级、团队照片、企业信任区、联系方式完整化  
3. **P2 内容阵地**：洞察栏目、行业深页、下载资料、招聘 JD 深化  
4. **P3 增长**：多触点获客、AB 测试、个性化入口、持续内容飞轮  

详细见 `03-improvement-roadmap.md` 与 `08-engineer-llm-tickets.md`。

---

## 代码锚点（当前仓库）

- 双语文案：`web/src/content/zh.ts`、`web/src/content/en.ts`
- 类型：`web/src/content/types.ts`
- 页面：`web/src/app/[locale]/**`
- 组件：`web/src/components/**`
- 样式：`web/src/app/globals.css`
- 静态图：`web/public/images/**`

---

## 更新约定

- 每完成一批工单，在本 README「变更日志」追加一行。
- 业务侧补齐素材后，更新 `06-content-asset-checklist.md` 勾选状态。
- 文案口径变更，先改 `09-messaging-kit.md`，再同步 `zh.ts` / `en.ts`。

### 变更日志

| 日期 | 变更 | 作者 |
|---|---|---|
| 2026-07-20 | 初版作战手册入库 | Cloud Agent |
| 2026-07-27 | 联系表单多通道实现 + `10-contact-form-backends.md` | Cloud Agent |
