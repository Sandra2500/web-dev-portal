export interface Tutorial {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // в хвилинах
  steps: string[];
  prerequisites: string[];
  category: string;
}
