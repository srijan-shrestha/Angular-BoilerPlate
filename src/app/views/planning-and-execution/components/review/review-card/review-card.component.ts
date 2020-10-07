import {Component, OnInit} from '@angular/core';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  providers: [NgbPopoverConfig]
})
export class ReviewCardComponent implements OnInit {
  review = [
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'},
    {department: 'accounts', feedback: 'Approve With Conditions'}
  ];
  reviewColumns = [
    'department',
    'feedback',
  ];
  private popupArr: any = null;

  constructor(private popoverConfig: NgbPopoverConfig) {
    popoverConfig.placement = 'bottom';
  }

  ngOnInit() {
  }

  openPopover(popover) {
    if (this.popupArr) {
      this.popupArr.close();
      this.popupArr = null;
    }
    this.popupArr = popover;
    popover.open();
  }

  closePopover() {
    console.log(this.popupArr);
    this.popupArr.close();
    this.popupArr = null;
  }
}
