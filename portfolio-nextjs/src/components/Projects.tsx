import Image from "next/image";
import type { Project } from "@/types/project";

const API_BASE = process.env.EXPRESS_API_URL || "http://localhost:5000";

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="projects__section" id="ProjectContainer">
      <div className="container projects_container">
        {/* header */}
        <div className="section__header">
          <h1 className="section__title">Đồ Án Thực Chiến</h1>
          <p className="section__description">
            Bộ sưu tập dự án thực tập tại trường này giúp em củng cố và hoàn
            thiện những kỹ năng cũng như khả năng giải quyết vấn đề một cách
            sáng tạo!
          </p>
        </div>

        {/* cards */}
        <div className="project__cards_container">
          {projects.length === 0 && (
            <p className="projects__empty">Hiện chưa có dự án để hiển thị.</p>
          )}
          {projects.map((project) => (
            <div key={project._id} className="projects__cards">
              <div className="projects__cards_wrapper">
                <Image
                  src={
                    project.imageUrl &&
                    /^(https?:\/\/.+|\/[^\s].*)/.test(project.imageUrl)
                      ? project.imageUrl
                      : "/assets/404page.jpg"
                  }
                  alt={project.title}
                  className="projects__cards_img"
                  width={284}
                  height={284}
                />
              </div>
              <div className="projects__cards_titles">
                <div className="projects__cards_info">
                  <h4>{project.subtitle}</h4>
                  <h3>{project.title}</h3>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="projects__tech_stack">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="projects__tech_badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="projects__cards_links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__link projects__link--github"
                    >
                      GitHub
                    </a>
                  )}
                  {project.projectUrl && (
                    <a
                      href={`/api/demo?url=${encodeURIComponent(project.projectUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__link projects__link--demo"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
