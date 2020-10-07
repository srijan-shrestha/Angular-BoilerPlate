import {BaseModel} from './base.model';

export class UserRoleModel extends BaseModel {
  constructor(
    id: string,
    public name: string,
    public code: string,
  ) {
    super(id);
  }
  static adapt(item: any): UserRoleModel {
    return new UserRoleModel(
      item.id,
      item.name,
      item.code
    );
  }
}
