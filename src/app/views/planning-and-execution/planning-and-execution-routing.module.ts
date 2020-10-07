import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningAndExecutionWrapperComponent } from './planning-and-execution-wrapper/planning-and-execution-wrapper.component';
import { FeedbackWrapperComponent } from './components/containers/feedback-wrapper/feedback-wrapper.component';
import { ReviewWrapperComponent } from './components/containers/review-wrapper/review-wrapper.component';
import { BlankComponent } from './components/containers/blank/blank.component';
import { PhotosComponent } from './components/containers/photos/photos.component';
import { QuarterlyContractComponent } from './components/containers/quarterly-contract/quarterly-contract.component';
import { WeeklyConversationComponent } from './components/containers/weekly-conversation/weekly-conversation.component';
import { ReportsComponent } from './components/containers/reports/reports.component';
import { GoalCardHomeComponent } from './components/containers/card-container/goal-card-home/goal-card-home.component';

const routes: Routes = [
  {
    path: '',
    component: PlanningAndExecutionWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: GoalCardHomeComponent
      },
      {
        path: 'feedback',
        component: FeedbackWrapperComponent
      },
      {
        path: 'review',
        component: ReviewWrapperComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'quarterly-contract',
        component: QuarterlyContractComponent
      },
      {
        path: 'photos',
        component: PhotosComponent
      },
      {
        path: 'weekly-conversation',
        component: WeeklyConversationComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningAndExecutionRoutingModule {
}
