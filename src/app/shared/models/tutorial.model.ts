export interface Tutorial {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // в хвилинах
  author: string;
  publishDate: Date;
  tags: string[];
}