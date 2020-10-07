import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Company, CompanyModel } from '../models/company.models';
import { CompanyProfileService } from 'src/app/views/company-profile-setting/services/company-profile.service';
import { CompanyService } from '../services/company.service';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective implements OnInit {
  @Input('appTextColor') textColor: 'primary' | 'secondary';
  private companyFull: CompanyModel;
  private companyBasic: Company; 

  constructor(
    private el: ElementRef,
    private companyProfileService: CompanyProfileService,
    private companyService: CompanyService,
  ) {
    this.companyProfileService.data.subscribe((company: CompanyModel) => {
      this.companyFull = company;
      this.updateColor();
    });
    this.companyService.data.subscribe((company: Company) => {
      this.companyBasic = company;
      this.updateColor();
    });
    el.nativeElement.style.color = '#444444';
  }

  ngOnInit() {
    this.updateColor();
  }

  updateColor() {
    // when user is not logged in.
    if (this.companyBasic) {
      this.el.nativeElement.style.color = this.textColor === 'primary' ? this.companyBasic.color_primary : this.companyBasic.color_secondary;
    }

    // when user is logged in, we can get it from full.
    if (this.companyFull && this.companyFull.profile) {
      this.el.nativeElement.style.color = this.textColor === 'primary' ? this.companyFull.profile.colorPrimary : this.companyFull.profile.colorSecondary;
    }
  }
}
