import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="serif text-4xl font-semibold">404</p>
      <p className="text-[var(--ink-soft)]">页面不存在 / Page not found</p>
      <Link href="/zh" className="btn btn-primary">
        返回首页 / Home
      </Link>
    </div>
  );
}
