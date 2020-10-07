import { NgModule } from '@angular/core';

import { LoginWrapperRoutingModule } from './login-wrapper-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { WorkspaceLoginComponent } from './components/workspace-login/workspace-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { FindWorkspaceComponent } from './components/find-workspace/find-workspace.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import {LoginWrapperComponent} from './login-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import { ListWorkspaceComponent } from './components/list-workspace/list-workspace.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    WorkspaceLoginComponent,
    UserLoginComponent,
    LoginComponent,
    FindWorkspaceComponent,
    LoginWrapperComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    ListWorkspaceComponent,
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
