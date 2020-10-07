import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GoalService} from '../../../services/goal.service';


@Component({
  selector: 'app-feedback-goal-card',
  templateUrl: './feedback-goal-card.component.html',
  styleUrls: ['./feedback-goal-card.component.scss']
})
export class FeedbackGoalCardComponent implements OnInit {
  @Output() feedbackAdded = new EventEmitter();
  @Input() goal;
  feedbackForm: FormGroup;
  public approveWithCondition = false;
  public approve = false;
  public reject = false;
  index: any;
  noDescription = false;


  constructor(private goalFeedbackService: GoalService) {
  }

  ngOnInit() {
    this.initFeedbackForm();
  }

  initFeedbackForm() {
    this.feedbackForm = new FormGroup({
      status: new FormControl('', []),
      description: new FormControl(''),
      goal: new FormControl(),
    });
  }

  toggleApproveCondition(index) {
    this.index = index;
    this.approveWithCondition = true;
    this.reject = false;
    this.approve = false;
  }

  approveAndRejectClick(approve) {
    if (approve === 'approve') {
      this.approve = true;
      this.reject = false;
    } else {
      this.reject = true;
      this.approve = false;
    }
    this.approveWithCondition = false;
  }

  descriptionChanged() {
    this.noDescription = false;
  }

  submitClick(goalId) {
    if (this.approveWithCondition) {
      this.feedbackForm.patchValue({
        status: 3,
        goal: goalId
      });
      if (!this.feedbackForm.get('description').value) {
          this.noDescription = true;
          return;
      }
    } else {
      this.feedbackForm.patchValue({
        status: this.approve ? 1 : 2,
        goal: goalId,
        description : ''
      });
    }
    this.goalFeedbackService.createAnnualGoalFeedback(this.feedbackForm.value).subscribe(
      res => {
        console.log(res);
        this.approveWithCondition = false;
        this.feedbackAdded.emit();
      },
      err => {
        console.log(err);
      }
    );

  }
}
