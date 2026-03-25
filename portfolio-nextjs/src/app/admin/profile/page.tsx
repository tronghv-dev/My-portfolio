"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/types/profile";
import { fetchProfile, updateProfile } from "@/lib/api";

const DEFAULT: Profile = {
  name: "",
  avatarUrl: "",
  badges: [],
  jobPosition: "",
  email: "",
  phone: "",
  aboutMe: "",
  cvUrl: "",
};

export default function ProfilePage() {
  const [form, setForm] = useState<Profile>(DEFAULT);
  const [badgeInput, setBadgeInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setForm(data);
        setPreview(data.avatarUrl || "");
      })
      .catch(() => showToast("error", "Không thể tải thông tin"))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setForm((prev) => ({ ...prev, avatarUrl: json.url }));
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Upload thất bại",
      );
      setPreview(form.avatarUrl || "");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addBadge = () => {
    const b = badgeInput.trim();
    if (b && !form.badges.includes(b)) {
      setForm((prev) => ({ ...prev, badges: [...prev.badges, b] }));
    }
    setBadgeInput("");
  };

  const removeBadge = (b: string) =>
    setForm((prev) => ({
      ...prev,
      badges: prev.badges.filter((x) => x !== b),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      showToast("success", "Đã lưu thông tin thành công!");
    } catch {
      showToast("error", "Lưu thất bại! Kiểm tra server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="admin__loading">⏳ Đang tải thông tin...</div>;

  return (
    <div className="admin__page">
      {toast && (
        <div className={`admin__toast admin__toast--${toast.type}`}>
          {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}

      <div className="admin__page_header">
        <div>
          <h2 className="admin__page_title">Cấu hình Profile</h2>
          <p className="admin__page_subtitle">
            Thông tin hiển thị trên trang chủ
          </p>
        </div>
        <button
          className="admin__btn admin__btn--primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
        </button>
      </div>

      <form className="profile__form" onSubmit={handleSubmit}>
        {/* Avatar */}
        <div className="profile__section">
          <h3 className="profile__section_title">Ảnh đại diện</h3>
          <div className="profile__avatar_row">
            <div
              className="admin__upload_area profile__avatar_upload"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="avatar"
                  className="profile__avatar_img"
                />
              ) : (
                <div className="admin__upload_placeholder">
                  <span className="admin__upload_icon">👤</span>
                  <span>
                    {uploading ? "Đang tải lên..." : "Chọn ảnh đại diện"}
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="admin__form_group" style={{ flex: 1 }}>
              <label>Hoặc dán URL ảnh</label>
              <input
                name="avatarUrl"
                value={form.avatarUrl}
                onChange={(e) => {
                  handleChange(e);
                  setPreview(e.target.value);
                }}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Thông tin cơ bản */}
        <div className="profile__section">
          <h3 className="profile__section_title">Thông tin cơ bản</h3>
          <div className="admin__form_row">
            <div className="admin__form_group">
              <label>Họ và tên</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="admin__form_group">
              <label>Vị trí ứng tuyển</label>
              <input
                name="jobPosition"
                value={form.jobPosition}
                onChange={handleChange}
                placeholder="Intern developer"
              />
            </div>
          </div>

          <div className="admin__form_group">
            <label>Badge / Chuyên môn</label>
            <div className="admin__tech_input">
              <input
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addBadge())
                }
                placeholder="VD: Fullstack developer (Enter để thêm)"
              />
              <button
                type="button"
                className="admin__btn admin__btn--secondary"
                onClick={addBadge}
              >
                Thêm
              </button>
            </div>
            <div className="admin__tags" style={{ marginTop: "8px" }}>
              {form.badges.map((b) => (
                <span key={b} className="admin__tag admin__tag--removable">
                  {b}
                  <button type="button" onClick={() => removeBadge(b)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="profile__section">
          <h3 className="profile__section_title">Thông tin liên hệ</h3>
          <div className="admin__form_row">
            <div className="admin__form_group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="admin__form_group">
              <label>Số điện thoại</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxx"
              />
            </div>
          </div>
          <div className="admin__form_group">
            <label>Link CV (tải xuống)</label>
            <input
              name="cvUrl"
              value={form.cvUrl}
              onChange={handleChange}
              placeholder="/assets/CV.pdf hoặc https://..."
            />
          </div>
        </div>

        {/* Giới thiệu bản thân */}
        <div className="profile__section">
          <h3 className="profile__section_title">Giới thiệu bản thân</h3>
          <div className="admin__form_group">
            <label>Nội dung</label>
            <textarea
              name="aboutMe"
              value={form.aboutMe}
              onChange={handleChange}
              rows={5}
              placeholder="Mô tả về bản thân..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
