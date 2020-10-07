import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoalService} from '../../../services/goal.service';
import {GoalModel} from '../../../models/goal.model';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  public goalForm: FormGroup;
  public editable = false;
  @Input() goal: GoalModel;
  @Output() valueChange = new EventEmitter<boolean>();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
  ) {
  }

  ngOnInit() {
    this.initGoalForm();
  }

  initGoalForm() {
    this.goalForm = this.fb.group({
      name: ['', [Validators.required]],
      target: ['', [Validators.required]],
      description: ['', [Validators.required]],
      goalPrefix: ['$', []],
      goalInfix: ['%', []],
    });
  }

  submitGoal() {
    this.loading = true;
    this.goalService.createAnnualGoal(this.goalForm.value).subscribe(response => {
      if (response) {
        this.loading = false;
        this.valueChange.emit(true);
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  removeGoalCard() {
    this.valueChange.emit(false);
  }

  editGoal() {
    this.editable = !this.editable;
  }
}
