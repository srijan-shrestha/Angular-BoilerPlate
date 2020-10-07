import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuarterlyGoalsComponent } from './quarterly-goals.component';
import { QuarterlyTeamGoalsComponent } from './quarterly-team-goals/quarterly-team-goals.component';
import { DepartmentComponent } from './department/department.component';
import { PersonalComponent } from './personal/personal.component';
import { DepartmentPlanPreviewComponent } from './department/department-plan-preview/department-plan-preview.component';
import { TeamPlanPreviewComponent } from './quarterly-team-goals/team-plan-preview/team-plan-preview.component';
import { PersonalPlanPreviewComponent } from './personal/personal-plan-preview/personal-plan-preview.component';
import { DepartmentPlanCreateComponent } from './department/department-plan-create/department-plan-create.component';
import { TeamPlanCreateComponent } from './quarterly-team-goals/team-plan-create/team-plan-create.component';
import { PersonalPlanCreateComponent } from './personal/personal-plan-create/personal-plan-create.component';
import { DepartmentEmployeeViewComponent } from './department/department-employee-view/department-employee-view.component';
import { TeamEmployeeViewComponent } from './quarterly-team-goals/team-employee-view/team-employee-view.component';


const routes: Routes = [{
  path: '',
  component: QuarterlyGoalsComponent,
  resolve: {},
  children: [
    /*{ path: '', redirectTo: 'my-profile', pathMatch: 'full' },*/
    // {
    //   path: 'quarterly-goals/team',
    //   component: QuarterlyTeamGoalsComponent
    // },
    {
      path: 'quarterly-goals/team',
      component: QuarterlyTeamGoalsComponent,
      children: [
        {
          path: '',
          redirectTo: 'create',
          pathMatch: 'full'
        },
        {
          path: 'create',
          component: TeamPlanCreateComponent,
          data : {type: 'team'}
        },
        {
          path: 'preview',
          component: TeamPlanPreviewComponent,
          data : {type: 'team'}

        },
        {
          path: 'view-team-member-plans',
          component: PersonalPlanPreviewComponent,
          data : {previewType: 'members',
                  type: 'personal'}
        },
      ]
    },
    {
      path: 'quarterly-goals/myteam',
      component: TeamEmployeeViewComponent,
      children: [
        {
          path: '',
          redirectTo: 'preview',
          pathMatch: 'full',
        },
        {
          path: 'preview',
          component: TeamPlanPreviewComponent,
          data: {type: 'team'}
        },
        {
          path: 'view-team-member-plans',
          component: PersonalPlanPreviewComponent,
          data : {previewType: 'members', type: 'personal'}
        },
      ]
    },
    {
      path: 'quarterly-goals/department',
      component: DepartmentComponent,
      children: [
        {
          path: '',
          redirectTo: 'create',
          pathMatch: 'full'
        },
        {
          path: 'create',
          component: DepartmentPlanCreateComponent,
          data: {type: 'department'}
        },
        {
          path: 'preview',
          component: DepartmentPlanPreviewComponent,
          data: {type: 'department'}

        },
        {
          path: 'view-team-plans',
          component: TeamPlanPreviewComponent,
          data: {type: 'team'}
        },
      ]
    },
    {
      path: 'quarterly-goals/mydepartment',
      component: DepartmentEmployeeViewComponent,
      children: [
        {
          path: '',
          redirectTo: 'preview',
          pathMatch: 'full'
        },
        {
          path: 'preview',
          component: DepartmentPlanPreviewComponent,
          data: {type: 'department'}

        },
        {
          path: 'view-team-plans',
          component: TeamPlanPreviewComponent,
          data: {type: 'team'}
        },
      ]
    },
    {
      path: 'quarterly-goals/personal',
      component:  PersonalComponent,
      children: [
        {
          path: '',
          redirectTo: 'create',
          pathMatch: 'full'
        },
        {
          path: 'create',
          component: PersonalPlanCreateComponent,
          data: {type: 'personal'}
        },
        {
          path: 'preview',
          component: PersonalPlanPreviewComponent,
          data : {previewType: 'personal', type: 'personal'}
        },
        {
          path: 'view-team-plans',
          component: TeamPlanPreviewComponent,
          data: {type: 'team'}
        },
        {
          path: 'view-department-plans',
          component: DepartmentPlanPreviewComponent,
          data: {type: 'department'}
        },
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuarterlyGoalsRoutingModule { }
