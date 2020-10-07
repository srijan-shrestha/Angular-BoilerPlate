import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InitiativeService} from '../../../services/initiative.service';

@Component({
  selector: 'app-feedback-initiative-card',
  templateUrl: './feedback-initiative-card.component.html',
  styleUrls: ['./feedback-initiative-card.component.scss']
})
export class FeedbackInitiativeCardComponent implements OnInit {

  @Input() initiative;
  @Output() getInitiatives = new EventEmitter();

  feedbackForm: FormGroup;
  public conditionIndex = -1;
  public approveBtn = false;
  public conditionBtn = false;
  public rejectBtn = false;

  constructor(private initiativeService: InitiativeService) {
  }

  ngOnInit() {
    this.initFeedbackForm();
  }

  initFeedbackForm() {
    this.feedbackForm = new FormGroup({
      status: new FormControl('', {}),
      description: new FormControl('', {}),
    });
  }

  toggleApproveCondition(index) {
    this.conditionIndex = index;
    this.feedbackForm.controls.status.setValue(3);
    this.conditionBtn = !this.conditionBtn;
  }

  approveAndRejectClick(condition) {
    if (condition === 'approve') {
      this.feedbackForm.controls.status.setValue(1);
      this.approveBtn = true;
      this.rejectBtn = false;
    } else {
      this.feedbackForm.controls.status.setValue(2);
      this.approveBtn = false;
      this.rejectBtn = true;
    }
    this.conditionBtn = false;
    this.feedbackForm.controls.description.setValue('');
  }

  submitFeedback(initiativeId) {
    const data = {
      ...this.feedbackForm.value,
      annual_company_initiatives: initiativeId
    };
    this.initiativeService.createAnnualInitiativeFeedback(data).subscribe(response => {
      if (response) {
        this.conditionBtn = false;
        this.getInitiatives.emit();
      }
    });
  }
}
