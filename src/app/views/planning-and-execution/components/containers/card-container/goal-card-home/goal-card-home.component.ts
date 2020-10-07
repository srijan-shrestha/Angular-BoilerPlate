import {Component, OnInit} from '@angular/core';
import {GoalService} from '../../../../services/goal.service';
import {GoalModel} from '../../../../models/goal.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-goal-card-home',
  templateUrl: './goal-card-home.component.html',
  styleUrls: ['./goal-card-home.component.scss']
})
export class GoalCardHomeComponent implements OnInit {

  public goals: GoalModel[];
  public newCard = false;

  constructor(private goalService: GoalService, private router: Router
  ) {

  }

  ngOnInit() {
    this.getGoals();
  }

  getGoals() {
    this.goalService.getAnnualGoal().subscribe((resp: any) => {
      this.goals = resp;
    });
  }

  addGoalCard() {
    this.newCard = true;
  }

  cardEvent(data) {
    if (data) {
      this.getGoals();
      this.newCard = false;
    } else {
      this.newCard = false;
    }
  }

}
