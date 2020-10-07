import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company.models';
import pSBC from 'shade-blend-color';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.resetUserRoleAndRedirection();

    this.companyService.data.subscribe((company: Company) => {
      if (company && company.color_primary) {
        document.documentElement.style.setProperty('--primary', company.color_primary);
        document.documentElement.style.setProperty('--primary-dark', pSBC(-.1, company.color_primary));
        document.documentElement.style.setProperty('--primary-darker', pSBC(-.2, company.color_primary));
        document.documentElement.style.setProperty('--primary-light', pSBC(.1, company.color_primary));
      }
      if (company && company.color_secondary) {
        document.documentElement.style.setProperty('--secondary', company.color_secondary);
        document.documentElement.style.setProperty('--secondary-dark', pSBC(-.1, company.color_secondary));
        document.documentElement.style.setProperty('--secondary-darker', pSBC(-.2, company.color_secondary));
        document.documentElement.style.setProperty('--secondary-light', pSBC(.1, company.color_secondary));
      }

      if (company && company.nav_color_secondary) {
        document.documentElement.style.setProperty('--navSecondary', company.nav_color_secondary);
        document.documentElement.style.setProperty('--navSecondary-dark', pSBC(-.1, company.nav_color_secondary));
        document.documentElement.style.setProperty('--navSecondary-darker', pSBC(-.2, company.nav_color_secondary));
        document.documentElement.style.setProperty('--navSecondary-light', pSBC(.1, company.nav_color_secondary));
      }

      if (company && company.nav_color_primary) {
        document.documentElement.style.setProperty('--navPrimary', company.nav_color_primary);
        document.documentElement.style.setProperty('--navPrimary-dark', pSBC(-.1, company.nav_color_primary));
        document.documentElement.style.setProperty('--navPrimary-darker', pSBC(-.2, company.nav_color_primary));
        document.documentElement.style.setProperty('--navPrimary-light', pSBC(.1, company.nav_color_primary));
      }
    });
  }

}
