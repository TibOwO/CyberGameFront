import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = this.addSecurityHeaders(req);
    
    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              const updatedRequest = cloned.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next.handle(updatedRequest);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  private addSecurityHeaders(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      withCredentials: true,
      setHeaders: {
        'X-Content-Type-Options': 'nosniff',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'self';"
      }
    });
  }
}
