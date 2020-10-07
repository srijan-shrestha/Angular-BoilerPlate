import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {WorkspaceService} from 'src/app/shared/services/workspace.service';
import {Workspace} from 'src/app/shared/models/workspace.model';
import {environment} from 'src/environments/environment';
import {FormService} from 'src/app/shared/services/form.service';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {AuthService as SocialAuth} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {SocialLoginService} from 'src/app/shared/services/social-login.service';
import {CompanyService} from 'src/app/shared/services/company.service';
import {ToastrService} from 'ngx-toastr';
import { RoleService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  invalidLogin = false;
  workspace: any;
  companyLogo = 'app/assets/images/blaastlogo.svg';
  loading = false;

  @ViewChild('elLoginForm', {static: false}) elLoginForm: ElementRef;

  workspaceName: string;
  validate = false; // set to true once user clicks submit.

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  rememberMe = new FormControl(false);
  forgotEmailLink = '//' + environment.HOST + '/forgot-email';

  twoFAForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });
  enableTwoFactorSignIn = false;
  session: any;

  constructor(
    private workSpaceService: WorkspaceService,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private socialAuth: SocialAuth,
    private socialSignup: SocialLoginService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.workSpaceService.data.subscribe((workspace: Workspace) => {
      this.workspaceName = workspace.name + '.' + environment.HOST;
      if (!workspace) {
        return;
      }
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

  onTwoFASubmit() {
    this.authService.verifyTwoFAPasscode({otp: this.twoFAForm.value.otp}).subscribe(res => {
      this.session = res;
      this.setSession();
      this.router.navigateByUrl('dashboard');
    }, err => {
      this.toastrService.error('Login unsuccessful. Invalid code.');
    });
  }

  onSubmit() {
    this.validate = true;

    if (!this.formService.isValid(this.loginForm, this.elLoginForm)) {
      return false;
    }
    this.loading = true;
    this.authService.requestAccessToken(this.loginForm.value).subscribe(
      (res: any) => {
        this.loading = false;

        if (res.user.two_factor_auth) {
          this.enableTwoFactorSignIn = true;
        } else {
          this.session = res;
          this.setSession();
          this.router.navigateByUrl('dashboard').then(() => location.reload());
        }
      },
      err => {
        this.invalidLogin = true;
        this.loading = false;
        this.loginForm.patchValue({
          password: ''
        });
        console.log(err);
      }
    );

  }

  setSession() {
    const data = this.session;
    this.authService.setAccessToken(data.token, this.rememberMe.value);
    this.authService.setDeviceId(data.device_id);
    this.authService.setRefreshToken(data.refresh_token);

  }

  signInWithGoogle() {
    this.socialLogin();
    // this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(response => {
    //   const token = response['authToken'];
    //   const provider = 'google-oauth2';
    //   const data = {
    //     'token': token,
    //     'provider' : provider
    //   };
    //   this.signUp(data);
    // },
    // error => {
    //   console.log(error);
    // }
    // );
  }


  signInWithFB(): void {
    this.socialLogin();
    // this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => {
    //   const token = response['authToken'];
    //   const provider = 'facebook-oauth2';
    //   const data = {
    //     'token' : token,
    //     'provider' : provider
    //   };
    //   this.signUp(data);
    // },
    // error => {
    //   console.log(error);
    // });
  }


  socialLogin() {
    const data = {
      // 'token' : 'ya29.GlxfB6C6p20wD4Y64zluuegJ5jYwo5t7KNzw5U0jSWCxJSjq7lC_SHaXYSpK7qDTSdw3GZaxMCwkRQjQubuhPwHg0rO-WFyzdQoECu-gyE2wxZQU3We8fftfU3QNAQ',
      // 'provider' : 'google-oauth2'
      'token': 'EAAFD105fzr4BADoY1W8OfKsNtK0UtZBlMPHGAaEuF3100BBgDoum7pofgxBE64UmTvZBhVZCIdSVzo95OXGeHZCS29TkdYFq4dUaKSgIm59PbuzFWA8frfZB8uGGGdrqO0MjarELkI5ApYb3Blrtoj4cyKvraZAx73ZAXL4TQZAW3AZDZD',
      // 'provider': 'google-oauth2'
      'provider': 'facebook'
    };
    this.authService.requestAccessToken(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}

