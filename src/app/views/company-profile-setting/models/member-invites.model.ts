import {BaseModel} from '../../../shared/models/base.model';
import {UserRoleModel} from '../../../shared/models/user-role.model';

export class MemberInvitesModel extends BaseModel {
  constructor(
    id: string,
    public name: string,
    public email: string,
    public inviteDate: Date | string,
    public role: UserRoleModel,
    public isActive: boolean
  ) {
    super(id);
  }

  static adapt(items: any): MemberInvitesModel {
    return new MemberInvitesModel(
      items.id,
      items.fullName,
      items.email,
      items.createdAt,
      items.role,
      items.isActive
    );
  }
}
