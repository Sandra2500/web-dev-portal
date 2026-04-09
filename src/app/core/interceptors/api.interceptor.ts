import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Використовуємо відносний шлях через проксі
  if (req.url.startsWith('http')) {
    return next(req);
  }
  
  const apiReq = req.clone({
    url: `/api/${req.url}`
  });
  
  console.log('Request via proxy:', apiReq.url);
  return next(apiReq);
};
