import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-department-plan-create',
  templateUrl: './department-plan-create.component.html',
  styleUrls: ['./department-plan-create.component.scss']
})
export class DepartmentPlanCreateComponent implements OnInit {
  role: any;

  constructor(private authService: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: any) => {
      if (!role) {
        return;
      }

      const orgRole = role.org_role;
      const userRole = role.user_role;

      if (userRole === 'company_admin') {
        this.role = userRole;
      } else {
        this.role = orgRole;
      }

      if (!['department_leader', 'company_admin'].includes(this.role)) {
        this.route.navigateByUrl('quarterly-goals/department/preview');
      }
    });
  }

}
