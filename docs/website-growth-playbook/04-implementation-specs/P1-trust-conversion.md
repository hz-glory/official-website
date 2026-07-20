# P1 实现规格：信任证据升级

---

## P1-1 案例增强数据模型

### 扩展 `CaseStudy`（`web/src/content/types.ts`）
```ts
export type CaseStudy = {
  // 已有字段保留
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string[];
  stage?: { current: 1 | 2 | 3; note: string };
  disclosure: "high" | "medium" | "low";

  // 新增
  audience?: string;          // 适用谁
  duration?: string;          // 周期，如「约 3 个月」
  highlightMetric?: string;   // 首屏高亮指标
  stackSummary?: string;      // 克制的技术概述，可选
  testimonial?: { quote: string; role?: string }; // 无授权则不填
  ctaLabel?: string;
};
```

### UI（`cases/page.tsx`）
- 标题下展示 `highlightMetric`（若有）大号暖橙色
- Meta 行：行业 · 周期 · 披露不影响展示客户名策略
- 结果区保持列表
- 底部 CTA：`讨论类似项目`

### 三个案例最低改写目标（事实由业务确认，不可臆造）

| ID | 最低增强 |
|---|---|
| `housing-fund` | 补周期/角色；成果尽量半量化；保持具名 |
| `taizhou-manufacturing` | 保留 ~30%；补「驻场方式一句话」；适用画像 |
| `cross-border-compliance` | 强化阶段二；补准确率/效率类指标（若可披露） |

**无授权数字：宁可用定性，也不要编。**

---

## P1-2 团队照片

### 资源
- 路径：`web/public/images/team/{id}.jpg`
- 建议 800×800，人脸居中，背景干净
- id：`anshun` `yunyi` `byron` `liuhe` `senxian` `qingfei`

### 数据
`TeamMember` 增加 `photo?: string`；`zh.ts`/`en.ts` 填相对路径。

### UI
替换字首圆点为 `next/image`；无照片时回退字首。

### 文案
- 保持花名对外
- 红熊 AI 可出现（已确认）
- 避免过度堆简历，保留「机构 + 能力定位」

---

## P1-3 首页社会证明条

### 位置
Hero 与痛点区之间，或痛点区之前。

### 内容规则
- **禁止虚构客户 Logo**
- 可用：「服务过的场景类型」芯片：
  - 省市级公共服务平台
  - 制造企业驻场数字化
  - 跨境合规智能化
- 或真实可披露的机构名（仅公积金案例已具名时可谨慎引用「公积金管理平台建设经验」而非乱贴 Logo）

### 组件
`web/src/components/ProofBar.tsx`

---

## P1-4 企业信任区（Trust & Way of Working）

### 建议挂载
About 方法论后，或 Solutions 页底部前。

### 四个要点（双语写入 dictionary）
1. **驻场共建**：工程师进入业务现场，与业务方同一迭代节奏
2. **里程碑门禁**：指标达成再进入下一阶段，而非日期自动推进
3. **指标定义优先**：项目开始先对齐可验证成功标准
4. **数据与权限原则**：最小必要权限、客户数据不用于未授权训练/传播（措辞法务可再审）

不要写政企合作路径细节。

---

## P1-5 「诊断」产品化说明

### 内容块（可做 About 锚点 `#diagnostic` 或 Contact 侧栏）
- 时长：如 1–2 周（业务确认）
- 参与：客户业务负责人 + 我方 FDE/顾问
- 方式：访谈 / 流程走查 / 数据与系统盘点
- 产出：成熟度结论、优先级场景、试点建议、投入节奏建议
- 下一步：可选付费 POC

### CTA
主按钮继续「预约诊断咨询」；副文案解释期望。

---

## P1-6 联系页完整化

### 必填（业务提供）
- 对外邮箱（如 `hello@domain`）
- 响应时效（如「2 个工作日内回复」）

### 选填
- 微信（二维码图片）
- 电话
- 详细地址

### UI
Contact 左侧信息架构：
1. 办公城市
2. 邮箱（可点击 mailto）
3. 响应时效
4. 隐私说明
5. 表单

---

## P1-7 英文润色清单（非直译）

| 原文/现译 | 建议方向 |
|---|---|
| Capability system | Capabilities / What we deliver |
| Product abstraction | Turning validated work into reusable products |
| Institutional digital transformation | Public sector & large-enterprise transformation |
| Lead line | Focus area / Priority industry |
| Internal scale-up | Scaling inside the client’s organization |

修改必须中英同步更新 dictionary，避免结构漂移。
