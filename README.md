# Glorion Intelligence Website

光荣智能（Glorion Intelligence）公司官网——中英双语。

## 技术栈

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Cloudflare Workers（OpenNext）/ Vercel

## 本地开发

```bash
cd web
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)，默认跳转至中文站 `/zh`。英文站为 `/en`。

## 常用命令

```bash
cd web
npm run build     # Next.js 生产构建（Vercel 使用）
npm run start     # 本地 Node 生产服务
npm run lint      # ESLint
npm run preview   # OpenNext 构建并在 Workers 运行时本地预览
npm run deploy    # 构建并部署到 Cloudflare Workers
```

## 部署

项目在仓库子目录 `web/`，两边 Root Directory 都必须设为 `web`。

### Vercel

- Framework Preset: Next.js
- Root Directory: `web`
- Build Command: `npm run build`
- Output Directory: 留空

### Cloudflare Workers（推荐用 OpenNext，不要用旧 Pages/next-on-pages）

Workers Builds（连 Git）建议配置：

| 项 | 值 |
|---|---|
| Root directory | `web` |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

或本地：

```bash
cd web
npx wrangler login
npm run deploy
```

可选：按 [OpenNext Caching](https://opennext.js.org/cloudflare/caching) 配置 R2 增量缓存以获得更好的 ISR/缓存表现。

## 内容结构

双语文案位于 `web/src/content/zh.ts` 与 `web/src/content/en.ts`。页面路由在 `web/src/app/[locale]/`。

## 官网增长作战手册

完整审计、受众诊断、路线图与可执行工单见：

[`docs/website-growth-playbook/`](./docs/website-growth-playbook/README.md)
