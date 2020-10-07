import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from 'src/app/shared/services/workspace.service';
import {Workspace} from 'src/app/shared/models/workspace.model';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  workspace: Workspace;

  constructor(private workspaceService: WorkspaceService, private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {
    this.workspaceService.data.subscribe((workspace: Workspace) => {
      this.workspace = workspace;
    });
  }

}
