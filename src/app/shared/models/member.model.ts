import { DesignationModel } from './designation.models';
import {BaseModel} from './base.model';

export class MemberModel extends BaseModel {
  constructor(
    id: string,
    public name: string,
    public profilePicture: string,
    public designation: DesignationModel,
    public email: string,
    public created: Date | string,
  ) {
    super(id);
  }
  static adapt(item: any): MemberModel {
    return new MemberModel(
      item.id,
      item.fullName,
      item.profilePicture,
      item.designation,
      item.email,
      item.createdAt
    );
  }
}
