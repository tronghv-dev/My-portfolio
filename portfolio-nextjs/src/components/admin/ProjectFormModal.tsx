"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/types/project";

type Props = {
  initialData: Project;
  onSave: (data: Project) => void | Promise<void>;
  onClose: () => void;
};

type FormErrors = Partial<Record<keyof Project | "techStack", string>>;

const URL_RE = /^(https?:\/\/.+|\/.*)/;

function validate(form: Project): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Tên dự án không được để trống";
  else if (form.title.trim().length < 2)
    errors.title = "Tên dự án ít nhất 2 ký tự";

  if (!form.description.trim())
    errors.description = "Mô tả không được để trống";
  else if (form.description.trim().length < 10)
    errors.description = "Mô tả ít nhất 10 ký tự";

  if (!form.imageUrl.trim()) errors.imageUrl = "URL ảnh không được để trống";
  else if (!URL_RE.test(form.imageUrl.trim()))
    errors.imageUrl =
      "URL ảnh không hợp lệ (phải bắt đầu bằng http/https hoặc /)";

  if (form.githubUrl && !URL_RE.test(form.githubUrl.trim()))
    errors.githubUrl = "Link GitHub không hợp lệ";

  if (form.projectUrl && !URL_RE.test(form.projectUrl.trim()))
    errors.projectUrl = "Link Demo không hợp lệ";

  if (form.techStack.length === 0)
    errors.techStack = "Thêm ít nhất 1 công nghệ";

  return errors;
}

export default function ProjectFormModal({
  initialData,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<Project>(initialData);
  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(initialData.imageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview tức thì
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
      if (!res.ok) throw new Error(json.error || "Upload thất bại");
      setForm((prev) => ({ ...prev, imageUrl: json.url }));
      setErrors((prev) => ({ ...prev, imageUrl: undefined }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: err instanceof Error ? err.message : "Upload thất bại",
      }));
      setPreview(form.imageUrl || "");
    } finally {
      setUploading(false);
      // reset input để có thể chọn lại cùng file
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newVal =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: newVal }));
    // xóa lỗi khi user bắt đầu sửa
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const addTech = () => {
    const tech = techInput.trim();
    if (tech && !form.techStack.includes(tech)) {
      setForm((prev) => ({ ...prev, techStack: [...prev.techStack, tech] }));
      setErrors((prev) => ({ ...prev, techStack: undefined }));
    }
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  const isEditing = !!initialData._id;

  return (
    <div className="admin__modal_overlay" onClick={onClose}>
      <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin__modal_header">
          <h3>{isEditing ? "Chỉnh sửa dự án" : "Thêm dự án mới"}</h3>
          <button className="admin__modal_close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="admin__form" onSubmit={handleSubmit}>
          <div className="admin__form_row">
            <div className="admin__form_group">
              <label>Tên dự án *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="VD: Todo App"
                className={errors.title ? "admin__input--error" : ""}
              />
              {errors.title && (
                <span className="admin__field_error">{errors.title}</span>
              )}
            </div>
            <div className="admin__form_group">
              <label>Phụ đề</label>
              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="VD: dự án 1"
              />
            </div>
          </div>

          <div className="admin__form_group">
            <label>Mô tả *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả ngắn về dự án..."
              className={errors.description ? "admin__input--error" : ""}
            />
            {errors.description && (
              <span className="admin__field_error">{errors.description}</span>
            )}
          </div>

          <div className="admin__form_group">
            <label>Ảnh thumbnail *</label>
            <div
              className={`admin__upload_area ${errors.imageUrl ? "admin__input--error" : ""}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="admin__upload_preview">
                  <Image
                    src={preview}
                    alt="preview"
                    width={120}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    unoptimized={preview.startsWith("blob:")}
                  />
                  <span className="admin__upload_change">
                    {uploading ? "Đang tải lên..." : "Nhấn để đổi ảnh"}
                  </span>
                </div>
              ) : (
                <div className="admin__upload_placeholder">
                  <span className="admin__upload_icon">🖼️</span>
                  <span>
                    {uploading ? "Đang tải lên..." : "Nhấn để chọn ảnh"}
                  </span>
                  <span className="admin__upload_hint">
                    JPG, PNG, WebP, GIF — tối đa 5 MB
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </div>
            {/* fallback nhập URL thủ công */}
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={(e) => {
                handleChange(e);
                setPreview(e.target.value);
              }}
              placeholder="Hoặc dán URL ảnh trực tiếp..."
              className={`admin__upload_url_input ${errors.imageUrl ? "admin__input--error" : ""}`}
            />
            {errors.imageUrl && (
              <span className="admin__field_error">{errors.imageUrl}</span>
            )}
          </div>

          <div className="admin__form_row">
            <div className="admin__form_group">
              <label>Link GitHub</label>
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className={errors.githubUrl ? "admin__input--error" : ""}
              />
              {errors.githubUrl && (
                <span className="admin__field_error">{errors.githubUrl}</span>
              )}
            </div>
            <div className="admin__form_group">
              <label>Link Demo</label>
              <input
                name="projectUrl"
                value={form.projectUrl}
                onChange={handleChange}
                placeholder="https://..."
                className={errors.projectUrl ? "admin__input--error" : ""}
              />
              {errors.projectUrl && (
                <span className="admin__field_error">{errors.projectUrl}</span>
              )}
            </div>
          </div>

          <div className="admin__form_row">
            <div className="admin__form_group">
              <label>Thứ tự hiển thị</label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="admin__form_group admin__form_group--checkbox">
              <label>
                <input
                  name="isVisible"
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={handleChange}
                />
                Hiển thị trên trang chủ
              </label>
            </div>
          </div>

          <div className="admin__form_group">
            <label>Công nghệ sử dụng</label>
            <div className="admin__tech_input">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTech())
                }
                placeholder="VD: React (Enter để thêm)"
              />
              <button
                type="button"
                className="admin__btn admin__btn--secondary"
                onClick={addTech}
              >
                Thêm
              </button>
            </div>
            {errors.techStack && (
              <span className="admin__field_error">{errors.techStack}</span>
            )}
            <div className="admin__tags" style={{ marginTop: "8px" }}>
              {form.techStack.map((tech) => (
                <span key={tech} className="admin__tag admin__tag--removable">
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="admin__form_actions">
            <button
              type="button"
              className="admin__btn admin__btn--ghost"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="admin__btn admin__btn--primary"
              disabled={saving}
            >
              {saving
                ? "Đang lưu..."
                : isEditing
                  ? "Lưu thay đổi"
                  : "Thêm dự án"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
