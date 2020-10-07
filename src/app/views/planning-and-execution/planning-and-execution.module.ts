import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanningAndExecutionRoutingModule} from './planning-and-execution-routing.module';
import {PlanningAndExecutionWrapperComponent} from './planning-and-execution-wrapper/planning-and-execution-wrapper.component';
import {GoalCardComponent} from './components/create/goal-card/goal-card.component';
import {ComponentsModule} from '../../shared/components/components.module';
import {SharedModule} from '../../shared/shared.module';
import {GoalCardHomeComponent} from './components/containers/card-container/goal-card-home/goal-card-home.component';
import {FeedbackWrapperComponent} from './components/containers/feedback-wrapper/feedback-wrapper.component';
import {FeedbackGoalCardComponent} from './components/feedback/feedback-goal-card/feedback-goal-card.component';
import {FeedbackInitiativeCardComponent} from './components/feedback/feedback-initiative-card/feedback-initiative-card.component';
import {ReviewWrapperComponent} from './components/containers/review-wrapper/review-wrapper.component';
import {ReviewCardComponent} from './components/review/review-card/review-card.component';
import {BlankComponent} from './components/containers/blank/blank.component';
import {PhotosComponent} from './components/containers/photos/photos.component';
import {QuarterlyContractComponent} from './components/containers/quarterly-contract/quarterly-contract.component';
import {WeeklyConversationComponent} from './components/containers/weekly-conversation/weekly-conversation.component';
import {ReportsComponent} from './components/containers/reports/reports.component';


@NgModule({
  declarations: [
    PlanningAndExecutionWrapperComponent,
    GoalCardHomeComponent,
    GoalCardComponent,
    FeedbackWrapperComponent,
    FeedbackGoalCardComponent,
    FeedbackInitiativeCardComponent,
    ReviewWrapperComponent,
    ReviewCardComponent,
    BlankComponent,
    PhotosComponent,
    QuarterlyContractComponent,
    WeeklyConversationComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    PlanningAndExecutionRoutingModule,
  ],
  entryComponents: [GoalCardComponent],
})
export class PlanningAndExecutionModule {
}
