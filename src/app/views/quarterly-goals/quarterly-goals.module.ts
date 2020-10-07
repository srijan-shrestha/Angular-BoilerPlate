import { NgModule } from '@angular/core';

import { QuarterlyGoalsRoutingModule } from './quarterly-goals-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { QuarterlyGoalsComponent } from './quarterly-goals.component';
import { QuarterlyTeamGoalsComponent } from './quarterly-team-goals/quarterly-team-goals.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuarterlyPlanPreviewComponent } from './quarterly-plan-preview/quarterly-plan-preview.component';
import { DepartmentComponent } from './department/department.component';
import { PersonalComponent } from './personal/personal.component';
import { TeamPlanPreviewComponent } from './quarterly-team-goals/team-plan-preview/team-plan-preview.component';
import { PersonalPlanPreviewComponent } from './personal/personal-plan-preview/personal-plan-preview.component';
import { TeamPlanCreateComponent } from './quarterly-team-goals/team-plan-create/team-plan-create.component';
import { DepartmentPlanPreviewComponent } from './department/department-plan-preview/department-plan-preview.component';
import { DepartmentPlanCreateComponent } from './department/department-plan-create/department-plan-create.component';
import { PersonalPlanCreateComponent } from './personal/personal-plan-create/personal-plan-create.component';
import { DepartmentEmployeeViewComponent } from './department/department-employee-view/department-employee-view.component';
import { TeamEmployeeViewComponent } from './quarterly-team-goals/team-employee-view/team-employee-view.component';


@NgModule({
  declarations: [
    QuarterlyGoalsComponent,
    QuarterlyTeamGoalsComponent,
    QuarterlyPlanPreviewComponent,
    PersonalComponent,
    TeamPlanPreviewComponent,
    PersonalPlanPreviewComponent,
    TeamPlanCreateComponent,
    DepartmentComponent,
    DepartmentPlanPreviewComponent,
    DepartmentPlanCreateComponent,
    PersonalPlanCreateComponent,
    DepartmentEmployeeViewComponent,
    TeamEmployeeViewComponent,
  ],
  imports: [
    SharedModule,
    QuarterlyGoalsRoutingModule,
    NgbModule
  ]
})
export class QuarterlyGoalsModule { }
