export class GoalFeedbackModel {
  id: number;
  approved: boolean;
  condition: string;
  rejected: boolean;

  constructor(
    id: number,
    approved: boolean,
    condition: string,
    rejected: boolean,
  ) {
    this.id = id;
    this.approved = approved;
    this.condition = condition;
    this.rejected = rejected;
  }

  static adapt(item: any): GoalFeedbackModel {
    return new GoalFeedbackModel(
      item.id,
      item.approved,
      item.condition,
      item.rejected,
    );
  }
}
