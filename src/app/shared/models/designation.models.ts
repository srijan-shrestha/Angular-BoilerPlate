import {BaseModel} from './base.model';

export class DesignationModel extends BaseModel {
  constructor(
    id: string,
    public name: string
  ) {
    super(id);
  }
  static adapt(item: any): DesignationModel {
    return new DesignationModel(
      item.id,
      item.name
    );
  }
}
