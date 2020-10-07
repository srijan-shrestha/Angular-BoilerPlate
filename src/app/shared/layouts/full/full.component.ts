import {Component, OnInit, ViewChild} from '@angular/core';
import pSBC from 'shade-blend-color';
import {ProfileService} from '../../services/profile.service';
import {CompanyProfileService} from 'src/app/views/company-profile-setting/services/company-profile.service';
import {CompanyModel} from '../../models/company.models';
import {HeaderComponent} from '../header/header.component';
import {RoleService} from '../../services/roles.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  @ViewChild(HeaderComponent, {static: false}) child: HeaderComponent;

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private profileService: ProfileService,
    private companyProfileService: CompanyProfileService,
  ) {
  }

  sidenavHide() {
    this.child.sidenavHide();
  }

  ngOnInit() {
    this.roleService.getCurrentUserRoles().subscribe((userRoles: any) => {
      this.authService.setUserRole(userRoles);
    });

    this.profileService.getProfile().subscribe(
      res => {
        this.profileService.setData(res);
      });

    this.companyProfileService.getCompanyProfile().subscribe(
      (res: CompanyModel) => {
        this.companyProfileService.setData(res);
      });

    this.companyProfileService.data.subscribe((company: CompanyModel) => {
      if (!company) {
        return;
      }
      const profile = company.profile;
      if (profile && profile.colorPrimary) {
        document.documentElement.style.setProperty('--primary', profile.colorPrimary);
        document.documentElement.style.setProperty('--primary-dark', pSBC(-.1, profile.colorPrimary));
        document.documentElement.style.setProperty('--primary-darker', pSBC(-.2, profile.colorPrimary));
        document.documentElement.style.setProperty('--primary-light', pSBC(.1, profile.colorPrimary));
        document.documentElement.style.setProperty('--primary-lighter', pSBC(.5, profile.colorPrimary));
        document.documentElement.style.setProperty('--primary-lightest', pSBC(.95, profile.colorPrimary));
      }
      if (profile && profile.colorSecondary) {
        document.documentElement.style.setProperty('--secondary', profile.colorSecondary);
        document.documentElement.style.setProperty('--secondary-dark', pSBC(-.1, profile.colorSecondary));
        document.documentElement.style.setProperty('--secondary-darker', pSBC(-.2, profile.colorSecondary));
        document.documentElement.style.setProperty('--secondary-light', pSBC(.1, profile.colorSecondary));
      }

      if (profile && profile.navColorSecondary) {
        document.documentElement.style.setProperty('--navSecondary', profile.navColorSecondary);
        document.documentElement.style.setProperty('--navSecondary-dark', pSBC(-.1, company.profile.navColorSecondary));
        document.documentElement.style.setProperty('--navSecondary-darker', pSBC(-.2, company.profile.navColorSecondary));
        document.documentElement.style.setProperty('--navSecondary-light', pSBC(.1, company.profile.navColorSecondary));
      }

      if (profile && profile.navColorPrimary) {
        document.documentElement.style.setProperty('--navPrimary', profile.navColorPrimary);
        document.documentElement.style.setProperty('--navPrimary-dark', pSBC(-.1, company.profile.navColorPrimary));
        document.documentElement.style.setProperty('--navPrimary-darker', pSBC(-.2, company.profile.navColorPrimary));
        document.documentElement.style.setProperty('--navPrimary-light', pSBC(.1, company.profile.navColorPrimary));
      }
    });

  }

}
