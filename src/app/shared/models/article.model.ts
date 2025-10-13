export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: Date;
  category: string;
  readTime: number; // в хвилинах
  tags: string[];
}