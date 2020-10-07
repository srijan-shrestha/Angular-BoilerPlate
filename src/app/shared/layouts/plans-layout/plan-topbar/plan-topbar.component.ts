import {Component, Input, OnInit} from '@angular/core';
import {PdfPrintService} from 'src/app/shared/services/pdf-print.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-plan-topbar',
  templateUrl: './plan-topbar.component.html',
  styleUrls: ['./plan-topbar.component.scss']
})
export class PlanTopbarComponent implements OnInit {
  role: any;
  mobileMenuName: any;
  isPresentInOrgChart: string;

  @Input() type: any;
  @Input() planPreview: boolean;
  @Input() id: string;
  @Input() printSectionId: string;

  constructor(private pdfPrintService: PdfPrintService,
              private toastrService: ToastrService,
              private authService: AuthService,
              public router: Router,
             ) {
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
      this.isPresentInOrgChart = orgRole;
      const route = this.router.url;
      this.activePage(route);
    });
  }

  exportToPdf(type: string, id: string) {
    this.pdfPrintService.getPdf(type, id).subscribe(pdf => {
      return pdf;
    }, error => {
      this.toastrService.error('Error generating pdf', 'Error');
    });
  }

  print(sectionId: string) {
    if (!sectionId) {
      this.toastrService.error('Missing element to print', 'Error');
      return;
    }
    this.pdfPrintService.printWindow(sectionId);
  }

  activePage(route) {
    switch (route) {
      case '/quarterly-goals/personal/create':
        this.mobileMenuName = 'Create My Plans';
        break;
      case '/quarterly-goals/personal/preview':
        this.mobileMenuName = 'View My Plans';
        break;
      case '/quarterly-goals/personal/view-team-plans':
        this.mobileMenuName = 'Team Plans'
        break;
      case '/quarterly-goals/personal/view-department-plans':
        this.mobileMenuName = 'Team Plans'
        break;
      case '/quarterly-goals/department/create':
        this.mobileMenuName = 'Create Department Plans';
        break;
      case '/quarterly-goals/department/preview' :
        this.mobileMenuName = 'View Department Plans';
        break;
      case '/quarterly-goals/mydepartment/preview' :
        this.mobileMenuName = 'View Department Plans';
        break;
      case '/quarterly-goals/department/view-team-plans':
        this.mobileMenuName = 'Team Plans'
        break;
      case '/quarterly-goals/mydepartment/view-team-plans':
        this.mobileMenuName = 'Team Plans'
        break;
      case '/quarterly-goals/team/create':
        this.mobileMenuName = 'Create Team Plans';
        break;
      case '/quarterly-goals/team/preview':
        this.mobileMenuName = 'View Team Plans';
        break;
      case '/quarterly-goals/team/view-team-member-plans':
        this.mobileMenuName = 'View Team Member Plans'
        break;
      case '/quarterly-goals/myteam/preview':
        this.mobileMenuName = 'View Team Plans';
        break;
      case '/quarterly-goals/myteam/view-team-member-plans':
        this.mobileMenuName = 'View Team Member Plans'
        break;
      default:
        this.mobileMenuName = 'Select Menu Item'
    }
  }

  checkk(event) {
    this.mobileMenuName = event.target.innerText;
  }

}
