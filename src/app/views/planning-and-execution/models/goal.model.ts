import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';

export class GoalFeedbackModel {
  id: number;
  status: string;
  description: string;
  goal: number;


  constructor(
    id: number,
    status: string,
    description: string,
    goal: number,
  ) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.goal = goal;
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
export class GoalFeedbackAdapter implements Adapter<GoalFeedbackModel> {
  adapt(item: any): GoalFeedbackModel {
    return new GoalFeedbackModel(
      item.id,
      item.status,
      item.description,
      item.annualCompanyInitiatives,
    );
  }
}

export class GoalModel {
  id: number;
  name: string;
  target: string;
  description: string;
  status: string;
  goalFeedBack: GoalFeedbackModel[];

  constructor(
    id: number,
    name: string,
    target: string,
    description: string,
    status: string,
    goalFeedBack: GoalFeedbackModel[]
  ) {
    this.id = id;
    this.name = name;
    this.target = target;
    this.description = description;
    this.status = status;
    this.goalFeedBack = goalFeedBack;
  }

  // static adapt(item: any): GoalModel {
  //   return new GoalModel(
  //     item.id,
  //     item.name,
  //     item.target,
  //     item.description,
  //     item.status
  //   );
  // }
}
@Injectable({
  providedIn: 'root'
})
export class GoalAdapter implements Adapter<GoalModel> {
  constructor(private goalFeedBackAdapter: GoalFeedbackAdapter) {
  }

  adapt(item: any): GoalModel {
    return new GoalModel(
      item.id,
      item.name,
      item.target,
      item.description,
      item.status,
      item.goalFeedback.map(feedback => this.goalFeedBackAdapter.adapt(feedback)),
    );
  }
}

