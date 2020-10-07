import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchPassword} from 'src/app/shared/validators/password-match.validator';
import {Router, ActivatedRoute} from '@angular/router';
import {ResetPasswordService} from 'src/app/shared/services/reset-password.service';
import {WorkspaceService} from 'src/app/shared/services/workspace.service';
import {Workspace} from 'src/app/shared/models/workspace.model';
import {environment} from 'src/environments/environment';
import {ToastrService} from 'ngx-toastr';
import {CompanyService} from 'src/app/shared/services/company.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup;
  private userId: any;
  private token: any;
  registerUser = false;
  workspace: any;
  workspaceName: string;
  companyLogo = 'app/assets/images/blaastlogo.svg';
  submitting = false;

  get password() {
    return this.passwordResetForm.get('new_password').value;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private passwordReset: ResetPasswordService,
              private workSpaceService: WorkspaceService,
              private toastrService: ToastrService,
              private companyService: CompanyService,
              private router: Router) {
    if (this.router.url.includes('register')) {
      this.registerUser = true;
    }
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.token = this.route.snapshot.paramMap.get('token');

    this.passwordResetForm = this.fb.group({
      uid: [this.userId, [Validators.required]],
      token: [this.token, [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required, matchPassword('new_password')]],
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

  passwordResetFormSubmit() {
    this.submitting = true;

    if (this.registerUser) {
      this.passwordReset.registerUser(this.passwordResetForm.value, this.userId, this.token).subscribe(
        res => {
          this.submitting = false;
          this.toastrService.success('Password was set successfully. Please login to continue.', 'Welcome!');
          this.router.navigateByUrl('');
        },
        err => {
          this.submitting = false;
          this.toastrService.error('Something went wrong.', 'Oops!');
          // this.router.navigateByUrl('login');
        }
      );
    } else {
      this.passwordReset.resetPassword(this.passwordResetForm.value).subscribe(
        res => {
          this.submitting = false;
          this.toastrService.success('Password was reset successfully. Please login to continue.', 'Reset successful');
          this.router.navigateByUrl('');
        },
        err => {
          this.submitting = false;
          this.toastrService.error('Something went wrong.', 'Oops!');
        }
      );
    }
  }
}
