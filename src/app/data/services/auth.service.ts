import { Injectable } from '@angular/core';
import { of, Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationPayload } from '../model/authentication/authentication-payload';

export type SignInFailure = 'InvalidEmailOrPassword';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly apiService: ApiService) {}

  signIn(payload: {
    email: string;
    password: string;
  }): Observable<AuthenticationPayload> {
    return this.apiService
      .signIn(payload)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  signOut() {
    return this.apiService.signOut().pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  refreshToken(params: {
    refreshToken: string;
  }): Observable<AuthenticationPayload> {
    return this.apiService.refreshToken(params);
  }
}
