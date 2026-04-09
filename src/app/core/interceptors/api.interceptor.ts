import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Не додаємо нічого, використовуємо відносні шляхи
  console.log('Original request:', req.url);
  return next(req);
};
