import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InitiativeService} from '../../../planning-and-execution/services/initiative.service';
import {CompanyProfileService} from '../../../company-profile-setting/services/company-profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-annual-goal-detail',
  templateUrl: './annual-goal-detail.component.html',
  styleUrls: ['./annual-goal-detail.component.scss']
})
export class AnnualGoalDetailComponent implements OnInit, OnChanges {
  @Output() actionEvent = new EventEmitter();
  @Output() selectedIdEvent = new EventEmitter();
  companyName = null;
  initiatives: Array<object> = [];
  selectedYear = null;
  status = 2;
  action = null;
  goalYearCollection = [];
  initiativeForm: FormGroup;
  startYear = 2020;
  selectedId = null;

  @Input() set inputData(value) {
    if (value) {
      this.initiatives = value.initiativeData;
      this.selectedYear = value.year ? value.year : null;
      this.status = value.status;
      this.action = value.action;
      this.selectedId = value.id;
      this.selectedIdEvent.emit(this.selectedId);
    }
  }

  constructor(private initiativeService: InitiativeService,
              private companyService: CompanyProfileService,
              private fb: FormBuilder,
              private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.initiativeForm = this.fb.group({
      year: ['', [Validators.required]],
    });
    this.companyService.data.subscribe(
      res => {
        if (res) {
          this.companyName = res.name;
        }
      }
    );
    if (this.selectedYear) {
      this.initiativeForm.patchValue({year: this.selectedYear});
      if (this.initiatives.length) {
        this.initiativeForm.patchValue({year: this.selectedYear});
        this.selectedIdEvent.emit(this.selectedId);
      } else {
        this.getInitiativeBySelectedYear();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData && changes.inputData.currentValue && changes.inputData.currentValue.year) {
      this.selectedYear = changes.inputData.currentValue.year;
      this.status = +(changes.inputData.currentValue.status);
      this.action = changes.inputData.currentValue.action;
      this.selectedId = changes.inputData.currentValue.id;
      this.selectedIdEvent.emit(this.selectedId);
    }
    this.getGoalYearLists();
  }

  saveData(action) {
    const initiativeData = this.initiatives;
    this.actionEvent.emit({
      action,
      year: this.selectedYear,
      id: this.selectedId,
      initiativeData: this.initiatives
    });
  }

  getInitiativeBySelectedYear() {
    this.initiatives = [];
    this.initiativeService.getAnnualInitiative(this.selectedYear).subscribe((resp: any) => {
      if (!!resp === true) {
        const length = Object.keys(resp).length;
        for (let i = 0; i < length; i++) {
          const item = resp[i];
          this.initiatives.push({icon: item.icon, title: item.title, description: item.description});
          this.status = +(item.status);
          this.selectedId = +(item.id);
        }
        this.selectedIdEvent.emit(this.selectedId);
      } else {
        this.initiatives = [];
      }
    });
  }

  onYearChange(year) {
    this.selectedYear = year;
    this.initiativeForm.patchValue({year: this.selectedYear});
    this.getInitiativeBySelectedYear();
  }

  getGoalYearLists() {
    this.goalYearCollection = [];
    let startYear = this.startYear;
    const  currentYear = +(new Date()).getFullYear();
    const endYear = (+currentYear) + 5;
    this.initiativeService.getAnnualGoalYearWiseStatus().subscribe(response => {
      const publishedYearList: any = response;
      const yearLists = [];
      publishedYearList.forEach((value) => {
        if (value.status === this.status) {
          yearLists.push(value.year);
        }
      });
      while (startYear <= endYear) {
        if (yearLists.includes(startYear)) {
          if (!!this.selectedYear === false && !this.goalYearCollection.includes(this.selectedYear)) {
            this.selectedYear = startYear;
            this.initiativeForm.patchValue({year: this.selectedYear});
            if (this.initiatives.length === 0) {
              this.getInitiativeBySelectedYear();
            }
          }
          this.goalYearCollection.push(startYear);
        }
        startYear++;
      }
      if (this.goalYearCollection.length === 0) {
        this.toastrService.info('No Goals has been published yet.', 'Data not found');
      }
    }, error => {
      console.log(error);
    });
  }
}
