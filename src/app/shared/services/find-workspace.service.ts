import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { WorkspaceService } from './workspace.service';
import { Router } from '@angular/router';
import { Workspace } from '../models/workspace.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindWorkspaceService {
  private apiBaseURL: string;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private router: Router
  ) {
    this.apiBaseURL = environment.PROTOCOL + '//' + environment.API_HOST;
  }

  listWorkspace(token: string) {
    const http = new HttpClient(this.handler);
    return http.get(`${this.apiBaseURL}/list-workspace/?token=${token}`);
  }

  findWorkspaceByEmail(email: string) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/find-workspace-by-email/`, {
      email
    });
  }

  forgotEmail(email: string) {
    const http = new HttpClient(this.handler);
    return http.post(`${this.apiBaseURL}/forgot-email/`, {
      email
    });
  }

}
