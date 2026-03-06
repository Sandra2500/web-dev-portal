import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Валідатор для заборони певних слів
export function forbiddenWordsValidator(forbiddenWords: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const value = control.value.toLowerCase();
    const foundWord = forbiddenWords.find(word => value.includes(word.toLowerCase()));
    
    return foundWord ? { forbiddenWords: { word: foundWord } } : null;
  };
}

// Валідатор для перевірки унікальності назви (опціонально)
export function uniqueTitleValidator(existingTitles: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const isDuplicate = existingTitles.some(
      title => title.toLowerCase() === control.value.toLowerCase()
    );
    
    return isDuplicate ? { uniqueTitle: true } : null;
  };
}