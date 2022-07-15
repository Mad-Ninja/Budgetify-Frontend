import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      const jwt = localStorage.getItem('idToken');
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwt}`),
      });
      return next.handle(cloned);
    }
    this.authService.logOut();
    this.router.navigateByUrl('/login');
    return next.handle(request);
  }
}
