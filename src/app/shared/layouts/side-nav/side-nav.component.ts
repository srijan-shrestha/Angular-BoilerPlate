import {Component, OnInit} from '@angular/core';
import {CompanyProfileService} from 'src/app/views/company-profile-setting/services/company-profile.service';
import {AuthService} from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  companyLogo: string;
  companyName: string;
  companyLogoMark: string;
  show = false;
  dateObj: number = Date.now();
  threeTab = false;
  employeeActive = false;
  managerActive = false;
  employeeAdminActive = false;
  adminActive = false;

  constructor(private companyProfileService: CompanyProfileService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: any) => {
      if (!role) {
        return;
      }

      const user_role = role.user_role;
      const org_role = role.org_role;

      if (user_role === 'company_admin' || user_role === 'playbook_admin') {
        this.threeTab = true;
        this.adminActive = true;
      } else if (org_role === 'leader' || org_role === 'department_leader' || org_role === 'team_leader') {
        this.managerActive = true;
      } else if (org_role === 'team_member' || !org_role) {
        this.employeeActive = true;
      }
    });

    this.companyProfileService.data.subscribe(
      res => {
        if (res) {
          this.companyLogo = res.companyLogo;
          this.companyName = res.name;
          this.companyLogoMark = res.companyLogoMark;
        }
      }
    );

  }

  sidebarToggle() {
    this.show = !this.show;
  }

  sidebarHide() {
    this.show = false;
  }


}
