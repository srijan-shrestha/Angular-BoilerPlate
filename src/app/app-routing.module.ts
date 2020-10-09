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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
