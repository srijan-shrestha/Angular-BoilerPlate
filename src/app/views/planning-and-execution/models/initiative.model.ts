import {Injectable} from '@angular/core';
import {Adapter} from '../../../core/adapter';

export class InitiativeFeedbackModel {
  id: number;
  status: string;
  description: string;
  annualCompanyInitiatives: number;

  constructor(
    id: number,
    status: string,
    description: string,
    annualCompanyInitiatives: number,
  ) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.annualCompanyInitiatives = annualCompanyInitiatives;
  }

  // static adapt(item: any): InitiativeFeedbackModel {
  //   console.log(item);
  //   return new InitiativeFeedbackModel(
  //     item.id,
  //     item.status,
  //     item.description,
  //     item.annualCompanyInitiatives,
  //   );
  // }
}

@Injectable({
  providedIn: 'root'
})
export class InitiativeFeedbackAdapter implements Adapter<InitiativeFeedbackModel> {
  adapt(item: any): InitiativeFeedbackModel {
    return new InitiativeFeedbackModel(
      item.id,
      item.status,
      item.description,
      item.annualCompanyInitiatives,
    );
  }
}


export class InitiativeModel {
  id: number;
  name: string;
  detail: string;
  description: string;
  status: string;
  initiativeFeedback: InitiativeFeedbackModel[];

  constructor(
    id: number,
    name: string,
    detail: string,
    description: string,
    status: string,
    initiativeFeedback: InitiativeFeedbackModel[],
  ) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.description = description;
    this.status = status;
    this.initiativeFeedback = initiativeFeedback;
  }
}

@Injectable({
  providedIn: 'root'
})
export class InitiativeAdapter implements Adapter<InitiativeModel> {
  constructor(private initiativeFeedbackAdapter: InitiativeFeedbackAdapter) {
  }

  adapt(item: any): InitiativeModel {
    return new InitiativeModel(
      item.id,
      item.name,
      item.detail,
      item.description,
      item.status,
      item.initiativeFeedback.map(feedback => this.initiativeFeedbackAdapter.adapt(feedback)),
    );
  }
}


export class AnnualInitiativeModel {
  id: number;
  year: string;
  icon: string;
  title: string;
  description: string;
  status: string;
  constructor(
    id: number,
    year: string,
    icon: string,
    title: string,
    description: string,
    status: string,
  ) {
    this.id = id;
    this.year = year;
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnnualInitiativeAdapter implements Adapter<AnnualInitiativeModel> {
  constructor() {
  }

  adapt(item: any) {
    if (!!item === false) {
      return null;
    }
    return item.details.map(el => {
      return new AnnualInitiativeModel(
        item.id,
        item.year,
        el.icon,
        el.title,
        el.description,
        item.status,
      );
    });
  }
}
