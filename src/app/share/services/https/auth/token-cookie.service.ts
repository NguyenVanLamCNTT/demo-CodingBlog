import { Injectable } from '@angular/core';


const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class TokenCookieService {

  constructor() { }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  signOut(): void {
    window.sessionStorage.clear();
  }
}
