import {BaseModel} from './base.model';

export class CompanyEmailExtensionModel extends BaseModel {
  constructor(
    id: string,
    public emailExtension: string
  ) {
    super(id);
  }

  static adapt(item: any): CompanyEmailExtensionModel {
    return new CompanyEmailExtensionModel(
      item.id,
      item.emailExtension
    );
  }
}
