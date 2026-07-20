# 09 · 对外话术与禁用词（Messaging Kit）

全站文案、销售邮件、PPT 对外页，统一遵循本手册。  
代码落点：优先改 `web/src/content/zh.ts` 与 `en.ts`。

---

## 1. 定位句（标准版）

### 中文
光荣智能是一家采用前置部署工程师（FDE）模式的 AI 与数字化转型伙伴——深入客户业务与技术现场，共同定义问题、共同交付结果，以经营指标的提升作为成功标准。

### English
Glorion Intelligence is an AI and digital transformation partner built on the Forward Deployed Engineer (FDE) model—embedded with clients, jointly defining problems, and accountable for measurable business outcomes.

### 短标语
- 中文：深入现场，交付结果  
- English：Embedded on site. Accountable for results.

---

## 2. 首次出现 FDE 时的白话解释（必须附着）

### 中文
前置部署工程师（FDE）：不是远程交功能模块，而是工程师深入业务现场，把咨询与交付合在一起，用可验证的业务指标推进项目。

### English
Forward Deployed Engineers (FDEs) don’t just ship features remotely—they work on site with operators, combining consulting and delivery, and advancing work against verifiable business metrics.

---

## 3. 推荐关键词（可复用）

FDE / 深入现场 / 业务指标驱动 / 从诊断到落地 / 驻场共建 / 里程碑门禁 / 智能制造数字化转型 / 政企数字化转型 / 智能体驱动流程自动化（IPA） / 跨境贸易智能合规 / 项目验证到产品化 / 开放共建

---

## 4. 禁用或慎用（对外）

| 类型 | 示例 | 处理 |
|---|---|---|
| 内部经营口径 | 主线、支线、观察型支线、资源不加码 | 改为「重点方向 / 核心场景 / 延展能力」 |
| 内部人名项目 | 柳总项目、森贤导流（非人名职务） | 不出现；人名仅用于团队花名展示 |
| 渠道黑话 | Upwork 获客 | 不写；可写「国际化项目经验」若必要 |
| 未授权客户 | 任何未批准名称 | 匿名或删除 |
| 融资硬广 | 估值、BP、本轮金额 | 不展示 |
| 政企路径 | 具体合作路径细节 | 统一「直接服务」表述 |
| AI 陈词滥调视觉文案 | 赋能、元宇宙式空洞词堆砌 | 改成具体场景与结果 |

---

## 5. 三类受众语气

| 受众 | 语气 | 少说 | 多说 |
|---|---|---|---|
| 客户 | 清晰、可执行、有边界 | 愿景口号 | 诊断如何开始、案例结果、协作方式 |
| 投资人 | 克制、结构化、开放 | 煽情与估值 | 成长模型、可复制性、合作态度 |
| 候选人 | 诚实、具体、有挑战 | 「大家庭」空话 | 驻场现实、学习机制、岗位要求 |

---

## 6. CTA 标准库

见 `05-page-by-page-briefs.md` 文末表。不要同一页堆超过 2 组主次 CTA。

---

## 7. 案例书写公式

1. 背景：行业 + 核心约束（1–2 句）  
2. 介入：FDE 如何发生（诊断/驻场/节奏）  
3. 方案：能力类型，不写机密细节  
4. 结果：优先量化；否则具体定性（避免「全面提升」）  
5. 阶段：若适用三阶段，标注当前点  
6. CTA：讨论类似项目  

---

## 8. 英文润色对照（强制替换建议）

| Avoid | Prefer |
|---|---|
| Capability system | Capabilities |
| Product abstraction | Reusable product capabilities |
| Lead lines | Focus areas |
| Institutional digital transformation | Public-sector & large-enterprise transformation |
| Demo theater | Slideware demos / PoCs that never reach production |
| Scale-up & product abstraction | Scale inside the client; package what repeats |

---

## 9. 变更流程

1. 先改本 Messaging Kit（若涉及新口径）  
2. 再改 `zh.ts` / `en.ts`  
3. PR 说明写明口径来源（例如「CEO 确认邮箱」「案例披露级别」）  
4. 禁止只改中文不改英文（或反之）
