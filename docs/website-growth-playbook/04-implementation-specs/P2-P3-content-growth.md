# P2–P3 实现规格：内容阵地与增长

---

## P2-1 Insights 内容系统

### 路由建议
短期：`/insights` 列表 + `/insights/[slug]` 详情  
文件：
- `web/src/content/insights/zh/*.mdx` 或 TS 对象
- `web/src/app/[locale]/insights/[slug]/page.tsx`

### 首批 3 篇选题（可直接写）
1. **方法论**：为什么 FDE 比交钥匙外包更适合智能化项目  
2. **制造**：智能制造里哪个场景更容易先看见指标  
3. **复盘（脱敏）**：从一个 POC 走到可复用引擎的节奏控制  

### 文章元数据
```ts
{
  slug: string;
  title: string;
  excerpt: string;
  category: "method" | "industry" | "retro";
  publishedAt: string; // ISO
  cover?: string;
  readingMinutes: number;
}
```

### 恢复导航条件
- ≥3 篇已发布
- 列表页无 “Coming soon” 假卡片
- 取消 noindex

---

## P2-2 行业着陆页升级

### 制造 / 政企 页内结构（同一 `industries/page.tsx` 强化即可）
对 `priority === "primary"` 的两项，扩展为：

1. 画像  
2. 3 个场景（痛点一句话 + 我们怎么做一句话）  
3. 关联案例卡（内链 cases#id）  
4. CTA「预约该行业诊断」

### 可选后续
拆 `/industries/manufacturing`、`/industries/public-sector` 独立路由以利 SEO。

---

## P2-3 解决方案商品化

每个 solution item 增加：
```ts
{
  timeline?: string;       // 「通常 4–12 周」
  deliverableSamples?: string[];
  notFor?: string;         // 不适合谁
}
```

UI：在 fit 下方显示 notFor（建立边界感）。

---

## P2-4 Careers JD

### 扩展角色类型
```ts
{
  title: string;
  type: string;
  loc: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  plus?: string[];
}
```

### 投递
Contact intent=career 时额外字段：
- role（select）
- resumeUrl（text）

---

## P2-5 下载资料

### 资源
`web/public/downloads/glorion-onepager-zh.pdf`  
`web/public/downloads/glorion-onepager-en.pdf`

### UI
About 或 Contact：按钮「下载公司介绍（PDF）」  
下载点击进分析事件 `download_onepager`。

### 内容需业务提供
定位、主行业、三案例摘要、合作方式、联系邮箱——**禁止模型虚构财务数据**。

---

## P2-6 JSON-LD

在 locale layout 或首页注入：
- `Organization`（name, url, logo, sameAs?）
- `WebSite`（url, inLanguage）
有 JD 后：`JobPosting`

---

## P3-1 增长实验

### 实验 1：Hero 主 CTA 文案
- A：预约诊断咨询  
- B：申请 2 周现状诊断（更具体）  
记录 `cta_click` 与 `contact_submit_success` 转化率。

### 实验 2：案例排序
制造 vs 政企谁在首页第一位（按来源渠道可不同，先人工配置）。

### 实现
简单：环境变量或 dictionary flag，不必上完整 AB 平台。

---

## P3-2 线索自动化

表单成功后：
1. 邮件通知
2. 同步飞书多维表（intent 分表）
3. 自动回复「已收到，X 日内联系」（可选）

---

## P3-3 内容飞轮

| 来源 | 动作 | 落点 |
|---|---|---|
| 个人 IP 文章 | 脱敏 + 公司视角改写 | Insights |
| 项目复盘 | 客户授权后摘要 | Cases + Insights |
| 诊断中的共性问题 | 方法论文 | Insights |

保持双周至少 1 篇的节奏（业务确认可执行性）。

---

## P3-4 性能与体验

- 图片全部 `next/image` + 合适 sizes（已有则检查）
- 字体子集与 preload 已部分具备，检查英文页 CLS
- Lighthouse 移动端 Performance / SEO / Accessibility ≥ 90 作为目标
