import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workspace } from '../models/workspace.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private dataSource = new BehaviorSubject<Workspace>(new Workspace());

  data = this.dataSource.asObservable();
  apiBaseURL: string;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend) {
    this.apiBaseURL = environment.PROTOCOL + '//' + environment.API_HOST;
  }

  setData(data: Workspace) {
    if (data && data.name !== 'login') {
      this.dataSource.next(data);
    } else {
      this.dataSource.next(undefined);
    }
  }

  extractWorkspace(host: string) {
    // tenant1.blast.com => 'tenant1'
    // blast.com => ''

    const workspace = host.replace('.' + environment.HOST, '');
    return workspace === environment.HOST ? '' : workspace;
  }

  findWorkspace(params) {
    const http = new HttpClient(this.handler);
    return http.get(`${this.apiBaseURL}/find-workspace/`, {
      params: { ...params}
    });
  }
}
