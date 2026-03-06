import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {
  transform(value: string): string {
    const lowerValue = value?.toLowerCase() || '';
    
    // Для статусів проектів
    if (lowerValue === 'active' || lowerValue === 'активний') {
      return '#2ecc71'; // зелений
    }
    if (lowerValue === 'completed' || lowerValue === 'завершений') {
      return '#3498db'; // синій
    }
    if (lowerValue === 'archived' || lowerValue === 'архівний') {
      return '#95a5a6'; // сірий
    }
    
    // Для рівнів складності туторіалів
    if (lowerValue === 'beginner' || lowerValue === 'початковий') {
      return '#27ae60'; // зелений
    }
    if (lowerValue === 'intermediate' || lowerValue === 'середній') {
      return '#f39c12'; // оранжевий
    }
    if (lowerValue === 'advanced' || lowerValue === 'просунутий') {
      return '#e74c3c'; // червоний
    }
    
    // Для категорій статей
    switch(lowerValue) {
      case 'технології':
      case 'technology':
      case 'tech':
        return '#3498db'; // синій
      case 'наука':
      case 'science':
        return '#2ecc71'; // зелений
      case 'мистецтво':
      case 'art':
        return '#e74c3c'; // червоний
      case 'бізнес':
      case 'business':
        return '#f39c12'; // оранжевий
      case 'освіта':
      case 'education':
        return '#9b59b6'; // фіолетовий
      default:
        return '#95a5a6'; // сірий
    }
  }
}