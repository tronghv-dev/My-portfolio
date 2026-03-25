import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";

const BASE = "/api/projects";
const PROFILE_BASE = "/api/profile";

export async function fetchProjects(all = false): Promise<Project[]> {
  const res = await fetch(`${BASE}${all ? "?all=true" : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Lỗi khi tải dự án");
  return res.json();
}

export async function createProject(data: Project): Promise<Project> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi tạo dự án");
  return res.json();
}

export async function updateProject(
  id: string,
  data: Project,
): Promise<Project> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật dự án");
  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Lỗi khi xóa dự án");
}

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(PROFILE_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Lỗi khi tải thông tin");
  return res.json();
}

export async function updateProfile(data: Profile): Promise<Profile> {
  const res = await fetch(PROFILE_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật thông tin");
  return res.json();
}
