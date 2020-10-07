export class BaseModel {
  constructor(public id: string) {}
  static adapt(item: any) {
    return new BaseModel(
      item.id
    );
  }
}
