import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LoginWrapperComponent} from './login-wrapper.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: LoginWrapperComponent,
    children: [
      // {path: '', redirectTo: '/login', pathMatch: 'full'},
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register/:userId/:token',
        component: PasswordResetComponent,
      },
      {
        path: 'reset-password/:userId/:token',
        component: PasswordResetComponent
      },
      {
        path: 'verify-email/:userId/:token',
        component: VerifyEmailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginWrapperRoutingModule { }
