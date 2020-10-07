import {BaseModel} from './base.model';
import {UserRoleModel} from './user-role.model';
import {UserProfileModel} from './user-profile.model';

export class UserModel extends BaseModel {
  constructor(
    id: string,
    public email: string,
    public createdAt: string,
    public fullName: string,
    public mobile: string,
    public role: UserRoleModel,
    public profile: UserProfileModel,
    public profilePic: string,
    public twoFactorAuth: boolean,
  ) {
    super(id);
  }

  static adapt(item: any): UserModel {
    return new UserModel(
      item.id,
      item.email,
      item.createdAt,
      item.fullName,
      item.mobile,
      item.role,
      item.profile,
      item.profilePic,
      item.twoFactorAuth,
    );
  }
}
