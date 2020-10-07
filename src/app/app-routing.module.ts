import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from './shared/layouts/blank/blank.component';
import {FullComponent} from './shared/layouts/full/full.component';
import {AdminGuard} from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', loadChildren: './views/login-wrapper/login-wrapper.module#LoginWrapperModule'},
      {
        path: 'onboarding',
        loadChildren: './views/onboarding/onboarding.module#OnboardingModule'
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    resolve: {},
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: []
      },
      {
        path: 'admin',
        loadChildren: './views/admin-company/admin-company.module#AdminCompanyModule',
        canActivate: []
      },
      {
        path: 'my-settings',
        loadChildren: './views/profile-setting/profile-setting.module#ProfileSettingModule',
      },
      {
        path: 'playbooks',
        loadChildren: './views/playbooks/playbooks-wrapper.module#PlaybooksWrapperModule',
        canActivate: [],
      },
      {
        path: 'company-settings',
        loadChildren: './views/company-profile-setting/company-profile-setting.module#CompanyProfileSettingModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'employee-directory',
        loadChildren: './views/company-profile-setting/company-profile-setting.module#CompanyProfileSettingModule',
      },
      {
        path: 'company',
        loadChildren: './views/company/company.module#CompanyModule',
      },
      {
        path: 'planning-execution',
        loadChildren: './views/planning-and-execution/planning-and-execution.module#PlanningAndExecutionModule',
      },
      {
        path: 'cultural-photos',
        loadChildren: './views/cultural-photos/cultural-photos.module#CulturalPhotosModule',
      },
      {
        path: '',
        loadChildren: './views/quarterly-goals/quarterly-goals.module#QuarterlyGoalsModule',
      },
      {
        path: 'department-team-execution',
        loadChildren: './views/company/company.module#CompanyModule',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
