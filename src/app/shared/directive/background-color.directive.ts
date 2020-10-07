import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { CompanyModel, Company } from '../models/company.models';
import { CompanyProfileService } from 'src/app/views/company-profile-setting/services/company-profile.service';
import { CompanyService } from '../services/company.service';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective implements OnInit {
  @Input('appBackgroundColor') backgroundColor: 'primary' | 'secondary';
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
    el.nativeElement.style.backgroundColor = '#777777';
 }

 ngOnInit() {
  this.updateColor();
 }

 updateColor() {
  if (this.companyBasic) {
    this.el.nativeElement.style.backgroundColor = this.backgroundColor === 'primary' ? this.companyBasic.color_primary : this.companyBasic.color_secondary;
  }
  if (this.companyFull && this.companyFull.profile) {
    this.el.nativeElement.style.backgroundColor = this.backgroundColor === 'primary' ? this.companyFull.profile.colorPrimary : this.companyFull.profile.colorSecondary;
  }
 }
}
