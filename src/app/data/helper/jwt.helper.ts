import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtHelper {
  async isTokenExpired(token: string): Promise<boolean> {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;

    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
