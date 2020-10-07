import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-filter-dialog',
  templateUrl: './member-filter-dialog.component.html',
  styleUrls: ['./member-filter-dialog.component.scss']
})
export class MemberFilterDialogComponent implements OnInit {
  public hoveredDate: NgbDate;
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public displayed = false;
  public filterForm: FormGroup;
  public displayDate = '';
  // departments = [
  //   {key: 'department1', value: 'Department1'},
  //   {key: 'department2', value: 'Department2'},
  //   {key: 'department3', value: 'Department3'}
  // ];

  constructor(public activeModal: NgbActiveModal,
              private calendar: NgbCalendar,
              private modalService: NgbModal,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = null;
  }

  ngOnInit() {
    this.validateFilterForm();
  }

  validateFilterForm() {
    this.filterForm = new FormGroup({
      // department: new FormControl('', {}),
      jobTitle: new FormControl('', {}),
      fromDate: new FormControl('', {}),
      toDate: new FormControl('', {})
    });
  }

  submitFilter() {
    this.filterForm.patchValue({
      fromDate: this.fromDate ? new Date(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day) : undefined,
      toDate: this.toDate ? new Date(this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day + 'T23:59:59Z') : undefined
    });
    this.modalService.dismissAll(this.filterForm.value);
  }

  onDateSelection(date) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate && this.toDate) {
      this.displayDate = (this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year)
        + ' - ' +
        (this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  datePickerToggle() {
    this.displayed = !this.displayed;
  }

  clearFilter() {
    this.filterForm.reset();
    this.displayDate = '';
  }
}
