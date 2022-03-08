import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    if (this.authService.getToken()) {
      req = request.clone(  {
        setHeaders: {
          Token: `${this.authService.getToken()}`
        }
      });
    }

    return next.handle(req);
  }
}
