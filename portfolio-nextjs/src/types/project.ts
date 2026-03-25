export type Project = {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  techStack: string[];
  order: number;
  isVisible: boolean;
};
