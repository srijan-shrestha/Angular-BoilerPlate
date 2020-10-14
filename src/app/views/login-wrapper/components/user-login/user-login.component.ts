import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  invalidLogin = false;
  loading = false;

  @ViewChild('elLoginForm', {static: false}) elLoginForm: ElementRef;

  workspaceName: string;
  validate = false; // set to true once user clicks submit.

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  rememberMe = new FormControl(false);
  // forgotEmailLink = '//' + environment.HOST + '/forgot-email';
  twoFAForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });
  enableTwoFactorSignIn = false;
  session: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {

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
  }

  setSession() {
    const data = this.session;
    this.authService.setAccessToken(data.token, this.rememberMe.value);
    this.authService.setDeviceId(data.device_id);
    this.authService.setRefreshToken(data.refresh_token);

  }

  signInWithGoogle() {
    this.socialLogin();
  }


  signInWithFB(): void {
    this.socialLogin();
  }


  socialLogin() {
    const data = {
      token: 'token', // Token from respective social login platform
      provider: 'provider' // Nmae of respective social login site (facebook, google, twitter etc..)
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

