# 07 · 验收标准（Definition of Done）

---

## P0 验收

### 转化
- [x] 从 `/zh/contact` 与 `/en/contact` 提交 client/career/invest 各至少 1 次，接收端收到完整字段（飞书通道已通）
- [x] 非法邮箱无法成功提交；错误提示可见
- [x] 成功前提交按钮有 loading；禁止「假成功」
- [ ] About/Solutions/Industries/Cases/Careers 页尾有 CTA，移动端可点

### Insights
- [ ] 主导航不再出现空壳 Insights，**或**页面为诚实 Coming Soon 且无假文章
- [ ] 若路由保留但无内容：metadata `noindex`

### SEO
- [ ] `/sitemap.xml` 可访问且含主要 locale 路由
- [ ] `/robots.txt` 可访问并指向 sitemap
- [ ] 关键页有 OG title/description（可用默认图）
- [ ] 配置 `NEXT_PUBLIC_SITE_URL` 后 canonical 正确

### 体验 / 无障碍
- [ ] `prefers-reduced-motion: reduce` 下内容立即可见
- [ ] 禁用 JS（或模拟 Reveal 未执行）时正文仍可读（若已按规格改默认可见）

### 分析
- [ ] 至少能看到 PV；CTA 点击与表单成功事件有记录（工具自选）

### 回归
- [ ] `cd web && npm run lint && npm run build` 通过
- [ ] Vercel / Cloudflare 预览打开首页与联系页正常

---

## P1 验收

- [ ] 三个案例均有 audience 或 duration 或 highlightMetric 至少两项增强
- [ ] 案例页与首页案例卡可点击到联系表单且带 from 参数
- [ ] 团队区在有照片素材时展示照片；无素材时优雅回退
- [ ] Contact 页展示对外邮箱与响应时效
- [ ] About 或 Solutions 出现信任区四要点
- [ ] 英文关键标题无明显直译腔（抽检 Capability system 等已替换）

---

## P2 验收

- [ ] Insights ≥3 篇真文章，可打开详情
- [ ] 导航恢复 Insights（若 P0 隐藏）
- [ ] 制造与政企区块内链到对应案例
- [ ] 至少一个岗位含 responsibilities + requirements
- [ ] 若提供 PDF：下载链路可开，事件可追踪

---

## P3 验收（滚动）

- [ ] 至少完成 1 次 Hero CTA 文案对比并记录结果
- [ ] 线索进入统一表格/群通知
- [ ] 移动端 Lighthouse SEO ≥ 90；Accessibility 无严重项

---

## 内容正确性红线（任何阶段）

- [ ] 无内部术语「主线/支线」对外展示
- [ ] 无未授权客户名与数字
- [ ] 无融资金额/估值公开展示（除非另行批准）
- [ ] 政企表述符合「直接服务」口径，无路径细节
