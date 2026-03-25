"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Project } from "@/types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => {});
  }, []);

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
          {projects.map((project) => (
            <div key={project._id} className="projects__cards">
              <div className="projects__cards_wrapper">
                <Image
                  src={
                    project.imageUrl &&
                    /^(https?:\/\/.+|\/[^\s].*)/.test(project.imageUrl)
                      ? project.imageUrl
                      : "/assets/project1.jpg"
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
                      href={project.projectUrl}
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
