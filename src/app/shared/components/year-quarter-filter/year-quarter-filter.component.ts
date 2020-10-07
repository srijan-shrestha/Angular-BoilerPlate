import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-year-quarter-filter',
  templateUrl: './year-quarter-filter.component.html',
  styleUrls: ['./year-quarter-filter.component.scss']
})
export class YearQuarterFilterComponent implements OnInit {
  @Input() quarter;
  @Input() year;

  localQuarter: number;
  localYear: number;

  // @Output() quarterOutput = new EventEmitter();
  @Output() selectedYearQuarter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.localQuarter = this.quarter;
    this.localYear = this.year;
  }

  selectedYear(val) {
    this.localYear = val;
    this.updateSelected();
  }

  selectedQuarter(val) {
    this.localQuarter = val;
    this.updateSelected();
  }

  updateSelected() {
    // this.quarter = this.localQuarter;
    // this.year = this.localYear;
    this.selectedYearQuarter.emit({
      year: this.localYear,
      quarter: this.localQuarter
    });
    // console.log(a);
  }
}
