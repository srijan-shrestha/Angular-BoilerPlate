import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { Workspace } from 'src/app/shared/models/workspace.model';
import { environment } from 'src/environments/environment';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  workspace: any;
  companyLogo = 'app/assets/images/blaastlogo.svg';
  findWorkspaceLink = '';
  submitting = false;

  workspaceName: string;
  resetMailSent = false;

  constructor(
    private fb: FormBuilder,
    private workSpaceService: WorkspaceService,
    private resetPasswordService: ResetPasswordService,
    private toastrService: ToastrService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.workSpaceService.data.subscribe((workspace: Workspace) => {
      this.workspaceName = workspace.name + '.' + environment.HOST;
      this.workSpaceService.findWorkspace({
        workspace: workspace.name
      }).subscribe(
        (res: any) => {
          this.workspace = res;
          this.companyService.setData({
            color_primary: res.color_primary,
            color_secondary: res.color_secondary,
            nav_color_primary: res.nav_color_primary,
            nav_color_secondary: res.nav_color_secondary,
            id: res.id,
            name: res.name,
            companyLogo: res.companyLogo,
            workspace: res.workspace,
            companyLogoMark: res.company_logo
          });
          if (res.company_logo) {
            this.companyLogo = res.company_logo;
          }
        }, e => {
          window.location.href = '//' + environment.HOST;
        }
      );
    });
  }

  forgotPasswordFormSubmit() {
    this.submitting = true;
    this.resetPasswordService.forgotPassword(
      this.forgotPasswordForm.get('email').value
    ).subscribe(res => {
      this.submitting = false;
      this.resetMailSent = true;
    }, err => {
      this.submitting = false;
      this.toastrService.error('Something went wrong.', 'Oops!');
    });
  }

}
