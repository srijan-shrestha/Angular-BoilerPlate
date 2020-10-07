import {BaseModel} from './base.model';

export class StateModel extends BaseModel {
  constructor(
    id: string,
    public abbreviation: string,
    public name: string,
  ) {
    super(id);
  }
  static adapt(item: any): StateModel {
    return new StateModel(
      item.id,
      item.abbrevation,
      item.name
    );
  }
}
