import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserRoleModel} from '../models/user-role.model';
import {Workspace} from '../models/workspace.model';
import {environment} from '../../../environments/environment';
import {WorkspaceService} from './workspace.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  token: string;
  private apiBaseURL: string;
  private workspace: Workspace;

  constructor(
    private workspaceService: WorkspaceService,
    private authService: AuthService,
    private http: HttpClient,
    private handler: HttpBackend,
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

  getRoles() {
    return this.http.get('/roles/').pipe(
      map((data: any) => data.map(UserRoleModel.adapt))
    );
  }

  getCurrentUserRoles() {
    const http = new HttpClient(this.handler);

    this.token = this.authService.getAccessToken();
    return http.get(`${this.apiBaseURL}/user-roles/`, {
      headers: new HttpHeaders({
        Authorization: `Token ${this.token}`,
        Accept: `application/json ; version= ${environment.VERSION}`
      })
    });
  }

}
