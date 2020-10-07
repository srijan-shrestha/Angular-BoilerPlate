import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {WorkspaceService} from './workspace.service';
import {Workspace} from '../models/workspace.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;
  private userRole = new BehaviorSubject<object>(null);
  private isUserAdmin = new BehaviorSubject<any>('');
  private apiBaseURL: string;
  private workspace: Workspace;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private handler: HttpBackend,
    private http: HttpClient
  ) {
    this.workspaceService.data.subscribe((workspace: Workspace) => {
      this.workspace = workspace;

      this.apiBaseURL = environment.PROTOCOL + '//' +
        (this.workspace.name
          ? this.workspace.name + '.'
          : '') +
        environment.API_HOST;
    });
  }

  requestAccessToken(loginData) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/auth/login/`, loginData);
  }

  getNotifications() {
    const http = new HttpClient(this.handler);
    return http.get(`${this.apiBaseURL}/notifications/`);
  }

  requestRefreshToken() {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/auth/refresh/`, {
      refresh_token: this.getRefreshToken()
    });
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

  getDeviceId(): string {
    return this.rememberMe() ? localStorage.getItem('device') : sessionStorage.getItem('device');
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

  resetUserRoleAndRedirection() {
    this.userRole.next(null);
    this.redirectUrl = '';
  }

  setUserRole(roles) {
    const {user_role, org_role} = roles;
    this.userRole.next(roles);

    const isUserAdmin = (user_role === 'company_admin' || user_role === 'super_admin');
    this.isUserAdmin.next(isUserAdmin);

    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }

    // if (user_role === 'general_user') {
    //   this.userRole.next(org_role);
    // } else {
    //   this.userRole.next(user_role);
    // }
  }

  setDeviceId(value: string) {
    if (this.rememberMe()) {
      localStorage.setItem('device', value);
    } else {
      sessionStorage.setItem('device', value);
    }
  }

  logout() {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('device');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('device');
    this.router.navigateByUrl('/');
  }

  isAdmin() {
    return this.isUserAdmin;
  }

  enableTwoFactorAuthentication(twoFactorData) {
    return this.http.post(`/enable-two-factor/`, twoFactorData);
  }

  verifyTwoFAPasscode(value) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/auth/otp/verify/`, value);
  }

  private rememberMe() {
    return localStorage.getItem('rememberMe') === 'true';
  }
}
