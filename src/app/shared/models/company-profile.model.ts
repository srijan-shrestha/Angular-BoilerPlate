import {BaseModel} from './base.model';
import {StateModel} from './state.model';
import {TimezoneModel} from './timezone.model';

export class CompanyProfileModel extends BaseModel {
  constructor(
    id: string,
    public timezone: TimezoneModel,
    public phoneNumber: string,
    public address1: string,
    public address2: string,
    public city: string,
    public state: StateModel,
    public postalCode: number,
    public colorPrimary: string,
    public colorSecondary: string,
    public navColorPrimary: string,
    public navColorSecondary: string
  ) {
    super(id);
  }

  static adapt(item: any): CompanyProfileModel {
    return new CompanyProfileModel(
      item.id,
      item.timezone,
      item.phone_number,
      item.address1,
      item.address2,
      item.city,
      item.state,
      item.postalCode,
      item.colorPrimary,
      item.colorSecondary,
      item.navColorPrimary,
      item.navColorSecondary,

    );
  }
}
