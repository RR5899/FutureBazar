import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access_token'); 
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
    return next.handle(authReq);
  }
}
