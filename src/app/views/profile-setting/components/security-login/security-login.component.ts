import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import countrylist from 'src/app/shared/constants/countrylist';
import {AuthService as SocialAuth} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {SocialLoginService} from 'src/app/shared/services/social-login.service';
import {ChangePasswordService} from 'src/app/shared/services/change-password.service';
import {AuthService} from 'src/app/shared/services/auth.service';
import {matchPassword} from 'src/app/shared/validators/password-match.validator';
import {ProfileSettingService} from '../../services/profile-setting.service';
import {UserModel} from '../../../../shared/models/user.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-security-login',
  templateUrl: './security-login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./security-login.component.scss']
})
export class SecurityLoginComponent implements OnInit {
  @ViewChild('twoFactorActivatedModal', {static: false}) tfaActivatedRef: TemplateRef<any>;
  @ViewChild('twoFactorEnableModal', {static: false}) tfaEnableRef: TemplateRef<any>;

  countries = countrylist;
  passwordUpdateForm: FormGroup;
  enableSwitch = false;
  isTwoFactorActivatedForUser = false;

  twoFactorAuthenticationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              private socialAuth: SocialAuth,
              private socialLoginService: SocialLoginService,
              private changePasswordService: ChangePasswordService,
              private authService: AuthService,
              private profileService: ProfileSettingService,
              private toastrService: ToastrService)
{
  }

  get password() {
    return this.passwordUpdateForm.get('newPassword').value;
  }

  ngOnInit() {
    this.passwordUpdateForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchPassword('newPassword')]],
    });

    this.twoFactorAuthenticationForm = this.fb.group({
      enable: [this.enableSwitch],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.socialLoginService.getTwoFactorAuthenticationStatus().subscribe((response: UserModel) => {
      this.enableSwitch = response.twoFactorAuth;
      this.isTwoFactorActivatedForUser = response.twoFactorAuth;

      this.twoFactorAuthenticationForm.patchValue({
        enable: this.enableSwitch
      });
    }, err => {
      console.log(err);
    });

  }

  passwordUpdateFormSubmit() {
    this.changePasswordService.changePassword(this.passwordUpdateForm.value).subscribe(
      res => {
        this.authService.logout();
      },
      err => {
        console.log(err);
      }
    );
  }

  twoFactorAuthenticationFormSubmit() {
    this.authService.enableTwoFactorAuthentication(this.twoFactorAuthenticationForm.value).subscribe(response => {
      this.modalService.dismissAll();
      this.enableSwitch = true;
      this.modalService.open(this.tfaActivatedRef, {windowClass: 'custom-modal', centered: true});
    }, error => {
      this.getDismission();
    });
  }

  twoFactorChanged(event) {
    if (this.twoFactorAuthenticationForm.get('enable').value) {
      if (this.isTwoFactorActivatedForUser) {
        this.profileService.updateProfile({two_factor_auth: true}).subscribe((res: UserModel) => {
          this.modalService.open(this.tfaActivatedRef, {windowClass: 'custom-modal', centered: true});
        }, err => {
          console.log(err);
        });
      } else {
        this.openTwoFactorAuthenticationModal();
      }
    } else {
      this.profileService.updateProfile({two_factor_auth: false}).subscribe((res: UserModel) => {
        this.enableSwitch = res.twoFactorAuth;

        this.twoFactorAuthenticationForm.patchValue({
          enable: this.enableSwitch
        });
      }, err => {
        console.log(err);
      });
    }
  }

  signInWithGoogle() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(response => {
        const token = response.authToken;
        const provider = 'google-oauth2';
        const data = {
          token,
          provider
        };
        this.signUp(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  signInWithFB(): void {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => {
        const token = response.authToken;
        const provider = 'facebook-oauth2';
        const data = {
          token,
          provider
        };
        this.signUp(data);
      },
      error => {
        console.log(error);
      });
  }

  signUp(data) {
    // const datas = {
    //   // 'token' : 'ya29.GlxfB6C6p20wD4Y64zluuegJ5jYwo5t7KNzw5U0jSWCxJSjq7lC_SHaXYSpK7qDTSdw3GZaxMCwkRQjQubuhPwHg0rO-WFyzdQoECu-gyE2wxZQU3We8fftfU3QNAQ',
    //   'token': 'EAAFD105fzr4BADoY1W8OfKsNtK0UtZBlMPHGAaEuF3100BBgDoum7pofgxBE64UmTvZBhVZCIdSVzo95OXGeHZCS29TkdYFq4dUaKSgIm59PbuzFWA8frfZB8uGGGdrqO0MjarELkI5ApYb3Blrtoj4cyKvraZAx73ZAXL4TQZAW3AZDZD',
    //   // 'provider': 'google-oauth2'
    //   'provider': 'facebook'
    // };
    this.socialLoginService.socialSignup(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  allSessionSignout() {
    const deviceId = this.authService.getDeviceId();
    this.profileService.allSessionSignOut(deviceId).subscribe(
      res => {
        this.toastrService.success('Successfully signed out of all sessions');
      },
      err => {
        this.toastrService.error('Unable to sign out. Please try again');
      }
    );
  }

  private openTwoFactorAuthenticationModal() {
    this.modalService.open(this.tfaEnableRef, {windowClass: 'custom-modal', centered: true}).result
      .then(() => {
      }, () => {
        if (!this.enableSwitch) {
          this.getDismission();
        }
      });
  }

  private getDismission() {
    this.twoFactorAuthenticationForm.patchValue({
      enable: false
    });
  }
}
