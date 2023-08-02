import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const lang =localStorage.getItem('lang') || 'en';
      req=req.clone({
        setHeaders:
          {
              'content-type': 'application/json',
              'accept-language':localStorage.getItem('lang')||'en'
          }
      })
      return next.handle(req);
  }
}
