import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workspace-login',
  templateUrl: './workspace-login.component.html',
  styleUrls: ['./workspace-login.component.scss']
})
export class WorkspaceLoginComponent implements OnInit {

  workspaceLoginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private workSpaceService: WorkspaceService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.workspaceLoginForm = this.fb.group({
      workspace: ['', [Validators.required]],
    });

  }

  workspaceLoginFormSubmit(workspace) {
    window.location.href = '//' + workspace + '.' + environment.HOST;
  }

  onSubmit() {
    this.workSpaceService.findWorkspace(this.workspaceLoginForm.value).subscribe(
      (res: any) => {
        const workspace = res.workspace;
        this.workspaceLoginFormSubmit(workspace);
      }, e => {
        if (e.error && e.error.error) {
          this.toastrService.error(e.error.error, 'Oops!');
        } else {
          this.toastrService.error('Something went wrong.', 'Oops!');
        }
      }
    );
  }
}
