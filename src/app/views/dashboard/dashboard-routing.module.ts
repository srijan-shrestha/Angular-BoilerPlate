import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalOverviewComponent } from './components/personal-overview/personal-overview.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children : [
      {
        path: '',
        component: PersonalOverviewComponent
      },
      {
        path: 'personal',
        component: PersonalOverviewComponent
      },
      {
        path: 'team-dashboard',
        component: PersonalOverviewComponent
      },
      {
        path: 'department-dashboard',
        component: PersonalOverviewComponent
      },
      {
        path: 'department-goal',
        component: PersonalOverviewComponent
      },
      {
        path: 'team-goal',
        component: PersonalOverviewComponent
      },
      {
        path: 'reports',
        component: PersonalOverviewComponent
      },
      {
        path: 'department-plan',
        component: PersonalOverviewComponent
      },
      {
        path: 'team-plan',
        component: PersonalOverviewComponent
      },
      {
        path: 'add-team-member',
        component: PersonalOverviewComponent
      },
      
      // {
      //   path: 'company',
      //   component: PersonalOverviewComponent,
      //   canActivate: []
      // },
      // {
      //   path: 'weekly-checkin',
      //   component: PersonalOverviewComponent,
      //   canActivate: []
      // },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
