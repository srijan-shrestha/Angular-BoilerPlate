import {BaseModel} from './base.model';

export class TimezoneModel extends BaseModel {
  constructor(
    id: string,
    public name: string,
    public offset: string
  ) {
    super(id);
  }
  static adapt(item: any): TimezoneModel {
    return new TimezoneModel(
      item.id,
      item.name,
      item.offset
    );
  }
}
