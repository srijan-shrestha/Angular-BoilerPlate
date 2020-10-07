import {BaseModel} from './base.model';
import {UserEmailAlertNotificationModel} from './user-email-alert-notification.model';
import {UserAdministratorNotificationModel} from './user-administrator-notification.model';

export class UserPreferenceSettings extends BaseModel {
  constructor(
    id: string,
    public setting: {
      emailAlertNotification: UserEmailAlertNotificationModel,
      adminNotification: UserAdministratorNotificationModel
    }
  ) {
    super(id);
  }

  static adapt(item: any): UserPreferenceSettings {
    return new UserPreferenceSettings(
      item.id,
      item.setting
    );
  }
}
