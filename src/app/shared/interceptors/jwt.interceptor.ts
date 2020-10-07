import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WorkspaceService} from '../services/workspace.service';
import {Workspace} from '../models/workspace.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {finalize, mergeMap, tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {RoleService} from '../services/roles.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  token: any;
  private workspace: Workspace;

  constructor(
    private workspaceService: WorkspaceService,
    private authService: AuthService,
    private roleService: RoleService,
    private jwtHelperService: JwtHelperService,
  ) {
    this.workspaceService.data.subscribe((workspace: Workspace) => {
      this.workspace = workspace;
    });
    this.token = this.authService.getAccessToken();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.authService.getAccessToken();
    const started = Date.now();
    let ok: string;

    if (this.jwtHelperService.isTokenExpired(this.token)) {
      return this.authService.requestRefreshToken().pipe(mergeMap((res: any) => {
        this.authService.setAccessToken(res.token);
        this.token = res.token;
        request = this.authorization(request);
        return next.handle(request).pipe(
          tap(
            (event: HttpEvent<any>) => ok = event instanceof HttpResponse ? 'succeeded' : '',
            (error: HttpErrorResponse) => ok = 'failed'
          ),
          // Log when response observable either completes or errors
          finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
            console.log(msg);
          }));
      }));
    }

    request = this.authorization(request);
    return next.handle(request);
  }

  authorization(request) {
    return request.clone({
      url: environment.PROTOCOL + '//' + (this.workspace.name ? this.workspace.name + '.' : '') + environment.API_HOST + request.url,
      headers: new HttpHeaders({
        Authorization: `Token ${this.token}`,
        Accept: `application/json ; version= ${environment.VERSION}`
      })
    });
  }

}

