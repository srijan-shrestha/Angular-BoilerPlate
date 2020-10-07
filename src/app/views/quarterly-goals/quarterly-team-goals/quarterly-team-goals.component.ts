import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { GoalsService } from "../../../shared/services/goals.service";

@Component({
  selector: 'app-quarterly-team-goals',
  templateUrl: './quarterly-team-goals.component.html',
  styleUrls: ['./quarterly-team-goals.component.scss']
})
export class QuarterlyTeamGoalsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }

}
