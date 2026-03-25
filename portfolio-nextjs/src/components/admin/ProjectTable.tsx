import type { Project } from "@/types/project";
import Image from "next/image";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
};

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  if (projects.length === 0) {
    return (
      <div className="admin__empty">
        <p>📂 Chưa có dự án nào.</p>
        <p>Nhấn &ldquo;Thêm dự án&rdquo; để bắt đầu.</p>
      </div>
    );
  }

  return (
    <div className="admin__table_wrapper">
      <table className="admin__table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên dự án</th>
            <th>Công nghệ</th>
            <th>Thứ tự</th>
            <th>Hiển thị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                {project.imageUrl &&
                /^(https?:\/\/.+|\/[^\s].*)/.test(project.imageUrl) ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={64}
                    height={64}
                    className="admin__table_img"
                  />
                ) : (
                  <div className="admin__table_img_placeholder">📷</div>
                )}
              </td>
              <td>
                <p className="admin__table_title">{project.title}</p>
                <p className="admin__table_subtitle">{project.subtitle}</p>
              </td>
              <td>
                <div className="admin__tags">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="admin__tag">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="admin__tag">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td>{project.order}</td>
              <td>
                <span
                  className={`admin__badge ${project.isVisible ? "admin__badge--on" : "admin__badge--off"}`}
                >
                  {project.isVisible ? "Hiện" : "Ẩn"}
                </span>
              </td>
              <td>
                <div className="admin__actions">
                  <button
                    className="admin__btn admin__btn--edit"
                    onClick={() => onEdit(project)}
                  >
                    Sửa
                  </button>
                  <button
                    className="admin__btn admin__btn--delete"
                    onClick={() => onDelete(project._id!)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
