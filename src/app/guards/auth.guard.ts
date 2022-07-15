import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../data/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { JwtHelper } from '../data/helper/jwt.helper';
import { TokenStore } from '../data/helper/token.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly jwtHelper: JwtHelper,
    private readonly tokenStore: TokenStore,
  ) {}

  async canActivate() {
    const token = this.tokenStore.readAccessToken();
    if (token && !(await this.jwtHelper.isTokenExpired(token))) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      await this.router.navigate(['auth/sign-in']);
    }

    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = this.tokenStore.readRefreshToken();

    if (!token || !refreshToken) {
      return false;
    }

    let isRefreshSuccess: boolean;
    try {
      const response = await lastValueFrom(
        this.authService.refreshToken({ refreshToken }),
      );

      this.tokenStore.writeAccessToken(response.accessToken);
      this.tokenStore.writeRefreshToken(response.refreshToken);

      isRefreshSuccess = true;
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
