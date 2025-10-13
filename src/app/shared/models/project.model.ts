export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string; // необов'язкове поле
  githubUrl?: string; // необов'язкове поле
  imageUrl: string;
  completionDate: Date;
  status: 'completed' | 'in-progress' | 'planned';
}