import {Component, OnInit} from '@angular/core';
import {GoalService} from '../../../services/goal.service';
import {InitiativeService} from '../../../services/initiative.service';
import {GoalModel} from '../../../models/goal.model';

@Component({
  selector: 'app-feedback-wrapper',
  templateUrl: './feedback-wrapper.component.html',
  styleUrls: ['./feedback-wrapper.component.scss']
})
export class FeedbackWrapperComponent implements OnInit {
  public goals: GoalModel;
  public initiatives: any;

  constructor(private goalService: GoalService, private initiativeService: InitiativeService) {
  }

  ngOnInit() {
    this.getGoals();
    this.getInitiatives();
  }

  getGoals() {
    this.goalService.getAnnualGoal().subscribe((goals: any) => {
      this.goals = goals;
    });
  }

  getInitiatives() {
    this.initiativeService.getAnnualInitiatives().subscribe(initiatives => {
      this.initiatives = initiatives;
    });
  }

}
