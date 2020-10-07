import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-plan-create',
  templateUrl: './personal-plan-create.component.html',
  styleUrls: ['./personal-plan-create.component.scss']
})
export class PersonalPlanCreateComponent implements OnInit {
  role: any;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: any) => {
      if (!role) {
        return;
      }
      const orgRole = role.org_role;
      if (!orgRole) {
        this.route.navigateByUrl('quarterly-goals/personal/preview');
      }
    });
  }

}
