import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Використовуємо /api проксі замість прямої URL
  if (req.url.startsWith('http')) {
    return next(req);
  }
  
  const apiReq = req.clone({
    url: `/api/${req.url}`
  });
  
  console.log('Request to (via proxy):', apiReq.url);
  return next(apiReq);
};
