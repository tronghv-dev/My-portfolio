"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchProfile } from "@/lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((p) => {
        setAvatarUrl(p.avatarUrl || "");
        setName(p.name || "");
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin__layout">
      <aside className="admin__sidebar">
        <div className="admin__sidebar_logo">
          <div
            className="admin__sidebar_avatar"
            style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : {}}
          >
            {!avatarUrl && <span>👤</span>}
          </div>
          <div>
            <h1>{name || "Admin Panel"}</h1>
            <p className="admin__sidebar_role">Administrator</p>
          </div>
        </div>
        <nav className="admin__nav">
          <Link
            href="/admin"
            className={`admin__nav_item${pathname === "/admin" ? " admin__nav_item--active" : ""}`}
          >
            <span>📁</span> Dự án
          </Link>
          <Link
            href="/admin/profile"
            className={`admin__nav_item${pathname === "/admin/profile" ? " admin__nav_item--active" : ""}`}
          >
            <span>👤</span> Profile
          </Link>
        </nav>
        <div className="admin__sidebar_footer">
          <Link href="/" className="admin__nav_item admin__back_btn">
            <span>←</span> Về trang chủ
          </Link>
          <button
            className="admin__nav_item admin__logout_btn"
            onClick={handleLogout}
          >
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>
      <main className="admin__main">{children}</main>
    </div>
  );
}
