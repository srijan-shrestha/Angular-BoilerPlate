import {Component, OnInit} from '@angular/core';
import {GoalService} from '../../../services/goal.service';
import {GoalModel} from '../../../models/goal.model';

@Component({
  selector: 'app-review-wrapper',
  templateUrl: './review-wrapper.component.html',
  styleUrls: ['./review-wrapper.component.scss']
})
export class ReviewWrapperComponent implements OnInit {
  public goals: GoalModel[];

  constructor(private goalService: GoalService) {
  }

  ngOnInit() {
    this.getGoals();
  }

  getGoals() {
    this.goalService.getAnnualGoal().subscribe((goals: any) => {
      this.goals = goals;
    });
  }

}
