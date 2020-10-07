export class UserEmailAlertNotificationModel {
  constructor(
    public value: boolean,
    public playbookPublished: boolean,
    public dateReminders: {
      value: boolean,
      oneWeekBeforeDue: boolean,
      twoWeeksBeforeDue: boolean,
      threeWeeksBeforeDue: boolean,
    },
  ) {}

  static adapt(item: any): UserEmailAlertNotificationModel {
    return new UserEmailAlertNotificationModel(
      item.value,
      item.playbookPublished,
      item.dateReminders
    );
  }
}
