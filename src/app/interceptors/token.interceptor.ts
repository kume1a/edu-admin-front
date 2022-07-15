import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../data/services/auth.service';
import { TokenStore } from '../data/helper/token.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly tokenService: TokenStore,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let authReq = req;
    const token = this.tokenService.readAccessToken();
    if (token != null) {
      authReq = AuthInterceptor.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('Authentication/SignIn') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.readRefreshToken();
      if (token)
        return this.authService.refreshToken({ refreshToken: token }).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.writeAccessToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(
              AuthInterceptor.addTokenHeader(request, token.accessToken),
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.tokenService.signOut();
            this.router.navigate(['/auth/sign-in']).then();
            return throwError(err);
          }),
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) =>
        next.handle(AuthInterceptor.addTokenHeader(request, token)),
      ),
    );
  }

  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
