export class UserAdministratorNotificationModel {
  constructor(
    public value: boolean,
    public newEmployeeAdded: boolean,
    public userStatusChanges: boolean,
    public securityAlerts: boolean,
    public subscriptionChanges: boolean,
    public billingCharges: boolean,
    public photosUploaded: boolean,
  ) {}

  static adapt(item: any): UserAdministratorNotificationModel {
    return new UserAdministratorNotificationModel(
      item.value,
      item.newEmployeeAdded,
      item.userStatusChanges,
      item.securityAlerts,
      item.subscriptionChanges,
      item.billingCharges,
      item.photosUploaded,
    );
  }
}
