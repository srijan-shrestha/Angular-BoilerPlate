import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-plan-create',
  templateUrl: './team-plan-create.component.html',
  styleUrls: ['./team-plan-create.component.scss']
})
export class TeamPlanCreateComponent implements OnInit {
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

      if (!['team_leader', 'company_admin'].includes(this.role)) {
        this.route.navigateByUrl('quarterly-goals/team/preview');
      }
    });
  }

}
