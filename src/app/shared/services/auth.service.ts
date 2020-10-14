import { tokenName } from '@angular/compiler';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;
  private userRole = new BehaviorSubject<object>(null);
  private isUserAdmin = new BehaviorSubject<any>('');
  private apiBaseURL: string;


  constructor(
    private router: Router,
  ) {
  }

  requestAccessToken(loginData) {
    const token = '';
    return token;
  }

  requestRefreshToken() {

  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }

  getAccessToken(): string {
    return this.rememberMe() ? localStorage.getItem('accessToken') : sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string {
    return this.rememberMe() ? localStorage.getItem('refreshToken') : sessionStorage.getItem('refreshToken');
  }

  getUserRole() {
    return this.userRole;
  }

  setAccessToken(value: string, rememberMe = false) {
    localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
    if (rememberMe) {
      localStorage.setItem('accessToken', value);
    } else {
      sessionStorage.setItem('accessToken', value);
    }
  }

  setRefreshToken(value: string) {
    if (this.rememberMe()) {
      localStorage.setItem('refreshToken', value);
    } else {
      sessionStorage.setItem('refreshToken', value);
    }
  }

  logout() {
    this.router.navigateByUrl('/');
  }

  isAdmin() {
    return this.isUserAdmin;
  }
  private rememberMe() {
    return localStorage.getItem('rememberMe') === 'true';
  }
}
