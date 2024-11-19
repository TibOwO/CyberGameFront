// src/app/core/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && localStorage.getItem('refresh_token')) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('token');
              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(clonedRequest);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
