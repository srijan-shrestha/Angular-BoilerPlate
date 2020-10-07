import { Company } from './company.models';
import { Team } from './team.model';
import { UserModel } from './user.model';
import { Department } from './department.model';
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { AnnualInitiativeModel } from 'src/app/views/planning-and-execution/models/initiative.model';

export class QuarterlyTeamPlan {
  id: number;
  year: number;
  quarter: number;
  title: string;
  data: string;
  annualPlan: AnnualInitiativeModel;
  company: Company;
  team: Team;
  user: UserModel;
  printStatus: number;

  constructor(
    id?: number,
    year?: number,
    quarter?: number,
    title?: string,
    data?: string,
    annualPlan?: AnnualInitiativeModel,
    team?: Team,
    company?: Company,
    user?: UserModel,
    printStatus?: number,
  ) {
    this.id = id;
    this.year = year;
    this.quarter = quarter;
    this.title = title;
    this.data = data;
    this.annualPlan = annualPlan;
    this.team = team;
    this.company = company;
    this.user = user;
    this.printStatus = printStatus;
  }
}

@Injectable({
  providedIn: 'root'
})
export class  QuarterlyTeamPlanAdapter implements Adapter<QuarterlyTeamPlan> {
  adapt(item: any): QuarterlyTeamPlan {
    return new QuarterlyTeamPlan(
      item.id,
      item.year,
      item.quarter,
      item.data,
      item.title,
      item.annualPlan,
      item.team ? item.team : {},
      item.company ? item.company : {},
      item.user ? item.user : {},
      item.printStatus
    );
  }
}

export class QuarterlyDepartMentPlan {
  id: number;
  year: number;
  quarter: number;
  title: string;
  data: string;
  annualPlan: AnnualInitiativeModel;
  company: Company;
  department: Department;
  user: UserModel;
  printStatus: number;

  constructor(
    id?: number,
    year?: number,
    quarter?: number,
    title?: string,
    data?: string,
    annualPlan?: AnnualInitiativeModel,
    department?: Department,
    company?: Company,
    user?: UserModel,
    printStatus?: number,
  ) {
    this.id = id;
    this.year = year;
    this.quarter = quarter;
    this.title = title;
    this.data = data;
    this.annualPlan = annualPlan;
    this.department = department;
    this.company = company;
    this.user = user;
    this.printStatus = printStatus;
  }
}

@Injectable({
  providedIn: 'root'
})
export class  QuarterlyDepartMentPlanAdapter implements Adapter<QuarterlyDepartMentPlan> {
  adapt(item: any): QuarterlyDepartMentPlan {
    return new QuarterlyDepartMentPlan(
      item.id,
      item.year,
      item.quarter,
      item.data,
      item.title,
      item.annualPlan,
      item.department ? item.department : {},
      item.company ? item.company : {},
      item.user ? item.user : {},
      item.printStatus
    );
  }
}

export class QuarterlyPersonalPlan {
  id: number;
  year: number;
  quarter: number;
  title: string;
  data: string;
  annualPlan: AnnualInitiativeModel;
  company: Company;
  user: UserModel;
  printStatus: number;

  constructor(
    id?: number,
    year?: number,
    quarter?: number,
    title?: string,
    data?: string,
    annualPlan?: AnnualInitiativeModel,
    company?: Company,
    user?: UserModel,
    printStatus?: number,
  ) {
    this.id = id;
    this.year = year;
    this.quarter = quarter;
    this.title = title;
    this.data = data;
    this.annualPlan = annualPlan;
    this.company = company;
    this.user = user;
    this.printStatus = printStatus;
  }
}

@Injectable({
  providedIn: 'root'
})
export class  QuarterlyPersonalPlanAdapter implements Adapter<QuarterlyPersonalPlan> {
  adapt(item: any): QuarterlyPersonalPlan {
    return new QuarterlyPersonalPlan(
      item.id,
      item.year,
      item.quarter,
      item.data,
      item.title,
      item.annualPlan,
      item.company ? item.company : {},
      item.user ? item.user : {},
      item.printStatus
    );
  }
}



