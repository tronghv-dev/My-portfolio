"use client";

import { useState, useEffect, useCallback } from "react";
import ProjectTable from "@/components/admin/ProjectTable";
import ProjectFormModal from "@/components/admin/ProjectFormModal";
import type { Project } from "@/types/project";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";

const EMPTY_FORM: Project = {
  title: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
  githubUrl: "",
  techStack: [],
  order: 0,
  isVisible: true,
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjects(true);
      setProjects(data);
    } catch {
      setError("Không thể kết nối server. Hãy chắc server đang chạy tại cổng 5000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa dự án này?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Xóa thất bại! Kiểm tra server.");
    }
  };

  const handleSave = async (data: Project) => {
    try {
      if (editingProject?._id) {
        const updated = await updateProject(editingProject._id, data);
        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? updated : p)),
        );
      } else {
        const created = await createProject(data);
        setProjects((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch {
      alert("Lưu thất bại! Kiểm tra server.");
    }
  };

  return (
    <div className="admin__page">
      {/* Header */}
      <div className="admin__page_header">
        <div>
          <h2 className="admin__page_title">Quản lý Dự Án</h2>
          <p className="admin__page_subtitle">{projects.length} dự án</p>
        </div>
        <button
          className="admin__btn admin__btn--primary"
          onClick={openCreateModal}
        >
          + Thêm dự án
        </button>
      </div>

      {/* Stats */}
      <div className="admin__stats">
        <div className="admin__stat_card">
          <p className="admin__stat_label">Tổng dự án</p>
          <p className="admin__stat_value">{projects.length}</p>
        </div>
        <div className="admin__stat_card">
          <p className="admin__stat_label">Đang hiển thị</p>
          <p className="admin__stat_value">
            {projects.filter((p) => p.isVisible).length}
          </p>
        </div>
        <div className="admin__stat_card">
          <p className="admin__stat_label">Đã ẩn</p>
          <p className="admin__stat_value">
            {projects.filter((p) => !p.isVisible).length}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin__loading">⏳ Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="admin__error">
          <p>⚠️ {error}</p>
          <button
            className="admin__btn admin__btn--primary"
            onClick={loadProjects}
          >
            Thử lại
          </button>
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <ProjectFormModal
          initialData={editingProject ?? EMPTY_FORM}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
