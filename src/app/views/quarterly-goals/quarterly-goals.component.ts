import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentGoalsService } from 'src/app/shared/services/department-goals.service';
import { PersonalGoalsService } from 'src/app/shared/services/personal-goals.service';
import { GoalsService } from 'src/app/shared/services/goals.service';


@Component({
  selector: 'app-quarterly-goals',
  templateUrl: './quarterly-goals.component.html',
  styleUrls: ['./quarterly-goals.component.scss']
})
export class QuarterlyGoalsComponent implements OnInit, OnDestroy {

  constructor(private teamPlanService: GoalsService,
              private departmentPlanService: DepartmentGoalsService,
              private persoanllPlanService: PersonalGoalsService) {}

  ngOnInit() {

  }

  ngOnDestroy() {
    this.teamPlanService.resetYearQuarterData();
    this.departmentPlanService.resetYearQuarterData();
    this.persoanllPlanService.resetYearQuarterData();
    this.teamPlanService.resetYearQuarterDataForCompanyAdmin();
    this.departmentPlanService.resetYearQuarterDataForCompanyAdmin();
  }

}
