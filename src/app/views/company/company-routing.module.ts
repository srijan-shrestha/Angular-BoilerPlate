import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyContainerComponent } from './company-container/company-container.component';
import { LetterToEditorComponent } from './components/letter-to-editor/letter-to-editor.component';
import { EmployeeDirectoryComponent } from './components/employee-directory/employee-directory.component';
import { MissionValuesComponent } from './components/mission-values/mission-values.component';
import { AnnualGoalsComponent } from './components/annual-goals/annual-goals.component';
import { BlankComponent } from './components/blank/blank.component';
import { CompanyMembersComponent } from '../company-profile-setting/components/company-members/company-members.component';
import {CreateThemeComponent} from './components/create-theme/create-theme.component';
import {AdminGuard} from '../../shared/guards/admin.guard';


const routes: Routes = [{
  path: '',
  component: CompanyContainerComponent,
  children: [
    {
      path: 'letter-to-editor',
      component: LetterToEditorComponent
    },
    {
      path: 'employee-directory',
      component: EmployeeDirectoryComponent
    },
    {
      path: 'mission-values',
      component: MissionValuesComponent
    },
    {
      path: 'annual-goals/employee/:type',
      component: AnnualGoalsComponent
    },
    {
      path: 'annual-goals/admin/:type',
      component: AnnualGoalsComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'quarterly-goals',
      component: AnnualGoalsComponent
    },
    {
      path: 'celebrate',
      component: AnnualGoalsComponent
    },
    {
      path: 'blank',
      component: BlankComponent
    },
    {
      path: 'my-team-plans',
      component: BlankComponent
    },
    {
      path: 'my-team-photos',
      component: BlankComponent
    },
    {
      path: 'my-department-photos',
      component: BlankComponent
    },
    {
      path: 'quarterly-contract',
      component: BlankComponent
    },
    {
      path: 'weekly-conversation',
      component: BlankComponent
    },
    {
      path: 'photo-manager/blank',
      component: BlankComponent
    },
    {
      path: 'letter-from-editor',
      component: BlankComponent
    },
    {
      path: 'annual-theme',
      component: BlankComponent
    },
    {
      path: 'quarterly-theme',
      component: BlankComponent
    },
    {
      path: 'employee-directories',
      component: CompanyMembersComponent
    },
    {
      path: ':theme_type/themes/:type',
      component: CreateThemeComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
