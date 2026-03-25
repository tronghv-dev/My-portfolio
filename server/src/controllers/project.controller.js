import { Project } from "../models/project.model.js";

// GET /api/projects — lấy tất cả dự án (thêm ?all=true để lấy cả dự án ẩn)
export const getAllProjects = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { isVisible: true };
    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// GET /api/projects/:id — lấy 1 dự án theo id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Không tìm thấy dự án" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// POST /api/projects — tạo dự án mới
export const createProject = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
      techStack,
      order,
    } = req.body;

    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: "title, description và imageUrl là bắt buộc" });
    }

    const project = new Project({
      title,
      subtitle,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
      techStack,
      order,
    });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// PUT /api/projects/:id — cập nhật dự án
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project)
      return res.status(404).json({ message: "Không tìm thấy dự án" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// DELETE /api/projects/:id — xóa dự án
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Không tìm thấy dự án" });
    res.json({ message: "Xóa dự án thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
