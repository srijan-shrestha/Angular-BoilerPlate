import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {ProfileSettingComponent} from './profile-setting.component';
import {SecurityLoginComponent} from './components/security-login/security-login.component';
import {PreferenceSettingComponent} from './components/preference-setting/preference-setting.component';


const routes: Routes = [{
  path: '',
  component: ProfileSettingComponent,
  children: [
    { path: '', redirectTo: 'my-profile', pathMatch: 'full' },
    {
      path: 'my-profile',
      component: MyProfileComponent
    },
    {
      path: 'security-login',
      component: SecurityLoginComponent
    },
    {
      path: 'preference-settings',
      component: PreferenceSettingComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSettingRoutingModule { }
