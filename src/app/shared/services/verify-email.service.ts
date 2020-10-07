import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {WorkspaceService} from './workspace.service';
import {Workspace} from '../models/workspace.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {
  private apiBaseURL: string;
  private workspace: Workspace;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private workspaceService: WorkspaceService,
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

  verifyEmail({userId, token}) {
    const http = new HttpClient(this.handler);
    return http.get(`${this.apiBaseURL}/verify-email/${userId}/${token}/`);
  }
}
