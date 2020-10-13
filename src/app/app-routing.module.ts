import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from './shared/layouts/blank/blank.component';
import {FullComponent} from './shared/layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', loadChildren: './views/login-wrapper/login-wrapper.module#LoginWrapperModule'},
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
