import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { WorkspaceService } from './workspace.service';
import { Router } from '@angular/router';
import { Workspace } from '../models/workspace.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private apiBaseURL: string;
  private workspace: Workspace;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private workspaceService: WorkspaceService,
    private router: Router
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

  resetPassword(data) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/reset-password/`, data);
  }

  forgotPassword(email: string) {
    const http = new HttpClient(this.handler);
    return http.get(`${this.apiBaseURL}/reset-password/`, {
      params: {
        email
      }
    });
  }

  registerUser(data, userId, token) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/register/${userId}/${token}/`, data);
  }

}
