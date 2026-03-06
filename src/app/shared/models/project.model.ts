export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  githubUrl?: string;
  demoUrl?: string;
}