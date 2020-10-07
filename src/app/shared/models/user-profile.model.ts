import {BaseModel} from './base.model';
import {StateModel} from './state.model';
import {TimezoneModel} from './timezone.model';

export class UserProfileModel extends BaseModel {
  constructor(
    id: string,
    public bio: string,
    public birthDate: string,
    public hiringDate: string,
    public jobTitle: string,
    public city: string,
    public state: StateModel,
    public timezone: TimezoneModel,
  ) {
    super(id);
  }

  static adapt(item: any): UserProfileModel {
    return new UserProfileModel(
      item.id,
      item.bio,
      item.birthDate,
      item.hiringDate,
      item.jobTitle,
      item.city,
      item.state,
      item.timezone
    );
  }
}
