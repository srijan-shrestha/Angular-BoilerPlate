import {BaseModel} from './base.model';
import {CompanyProfileModel} from './company-profile.model';
import {CompanyEmailExtensionModel} from './company-email-extension.model';

export class CompanyModel extends BaseModel {
  constructor(
    id: string,
    public name: string,
    public profile: CompanyProfileModel,
    public createdAt: string,
    public companyLogo: string,
    public companyLogoMark: string,
    public emailExtension: CompanyEmailExtensionModel[]
  ) {
    super(id);
  }

  static adapt(item: any): CompanyModel {
    return new CompanyModel(
      item.id,
      item.name,
      item.profile,
      item.createdAt,
      item.companyLogo,
      item.companyLogoMark,
      item.emailExtension
    );
  }
}

export class Company {
  id: string;
  name: string;
  workspace: string;
  companyLogo: string;
  companyLogoMark: string;
  color_primary: string;
  color_secondary: string;
  nav_color_primary: string;
  nav_color_secondary: string;
}
