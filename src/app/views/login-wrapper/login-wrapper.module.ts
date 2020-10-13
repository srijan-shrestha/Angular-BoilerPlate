import { NgModule } from '@angular/core';

import { LoginWrapperRoutingModule } from './login-wrapper-routing.module';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import {LoginWrapperComponent} from './login-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    WorkspaceLoginComponent,
    UserLoginComponent,
    LoginComponent,
    LoginWrapperComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    VerifyEmailComponent
  ],
  imports: [
    LoginWrapperRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule
  ]
})
export class LoginWrapperModule { }
