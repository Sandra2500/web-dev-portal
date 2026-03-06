import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { forbiddenWordsValidator } from '../../shared/validators/custom.validators';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './article-form.html',
  styleUrls: ['./article-form.css']
})
export class ArticleFormComponent implements OnInit {
  articleForm!: FormGroup;
  
  // Список категорій для select
  categories = ['FRONTEND', 'BACKEND', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue'];
  
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(3),
        forbiddenWordsValidator(['spam', 'viagra', 'казино', 'лохотрон', 'клікбейт'])
      ]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      author: ['', Validators.required],
      category: ['', Validators.required],
      readTime: [5, [Validators.required, Validators.min(1), Validators.max(60)]],
      tags: [[]]
    });
  }

  // Геттери для зручного доступу до полів
  get title() { return this.articleForm.get('title'); }
  get description() { return this.articleForm.get('description'); }
  get content() { return this.articleForm.get('content'); }
  get author() { return this.articleForm.get('author'); }
  get category() { return this.articleForm.get('category'); }
  get readTime() { return this.articleForm.get('readTime'); }

  onSubmit(): void {
    // Позначаємо всі поля як touched, щоб показати помилки
    this.markAllAsTouched();
    
    if (this.articleForm.valid) {
      const newArticle = {
        ...this.articleForm.value,
        publishDate: new Date(),
        tags: this.articleForm.value.tags || []
      };
      
      this.articleService.addArticle(newArticle);
      this.router.navigate(['/articles']);
    }
  }

  // Додайте цей метод для позначення всіх полів як touched
  markAllAsTouched(): void {
    Object.keys(this.articleForm.controls).forEach(key => {
      const control = this.articleForm.get(key);
      control?.markAsTouched();
    });
  }
}