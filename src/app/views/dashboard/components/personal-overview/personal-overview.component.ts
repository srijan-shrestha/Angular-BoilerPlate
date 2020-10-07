import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-overview',
  templateUrl: './personal-overview.component.html',
  styleUrls: ['./personal-overview.component.scss']
})
export class PersonalOverviewComponent implements OnInit {
  personalArray = [222, 28];
  personalTitle = 'Personal';

  teamsArray = [390, 610];
  teamsTitle = 'Teams';

  departmentsArray = [1200, 800];
  departmentsTitle = 'Departments';

  companyArray = [8650, 1350];
  companyTitle = 'Company';

  constructor() { }

  ngOnInit() {
  }

}
