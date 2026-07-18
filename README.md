# Glorion Intelligence Website

光荣智能（Glorion Intelligence）公司官网——中英双语。

## 技术栈

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## 本地开发

```bash
cd web
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)，默认跳转至中文站 `/zh`。英文站为 `/en`。

## 常用命令

```bash
npm run build   # 生产构建
npm run start   # 启动生产服务
npm run lint    # ESLint
```

## 内容结构

双语文案位于 `web/src/content/zh.ts` 与 `web/src/content/en.ts`。页面路由在 `web/src/app/[locale]/`。
