import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyProfileSettingComponent} from './company-profile-setting.component';
import {CompanyProfileComponent} from './components/company-profile/company-profile.component';
import {StructureComponent} from './components/structure/structure.component';
import {SecurityInvitesComponent} from './components/security-invites/security-invites.component';
import {BillingComponent} from './components/billing/billing.component';
import { CompanyMembersComponent } from './components/company-members/company-members.component';
import { CompanyMissionValuesComponent } from './components/company-mission-values/company-mission-values.component';


const routes: Routes = [{
  path: '',
  component: CompanyProfileSettingComponent,
  children: [
    { path: '', redirectTo: 'company-profile', pathMatch: 'full' },
    {
      path: 'company-profile',
      component: CompanyProfileComponent
    },
    {
      path: 'mission-values',
      component: CompanyMissionValuesComponent
    },
    {
      path: 'structure',
      component: StructureComponent
    },
    {
      path: 'security-invites',
      component: SecurityInvitesComponent
    },
    {
      path: 'billing',
      component: BillingComponent
    },
    {
      path : 'members',
      component : CompanyMembersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileSettingRoutingModule { }
