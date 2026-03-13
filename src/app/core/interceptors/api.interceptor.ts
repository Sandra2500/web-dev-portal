import { HttpInterceptorFn } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:3000/';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${API_BASE_URL}${req.url}`
  });

  return next(apiReq);
};
