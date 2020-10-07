import { Component, OnInit } from '@angular/core';
import { FindWorkspaceService } from 'src/app/shared/services/find-workspace.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/shared/models/company.models';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-list-workspace',
  templateUrl: './list-workspace.component.html',
  styleUrls: ['./list-workspace.component.scss']
})
export class ListWorkspaceComponent implements OnInit {
  companyLogo = 'app/assets/images/blaastlogo.svg';
  token: string;
  companies: Company[];

  constructor(
    private findWorkspaceService: FindWorkspaceService,
    private route: ActivatedRoute,
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.findWorkspaceService.listWorkspace(this.token).subscribe((res: {companies: Company[]}) => {
      this.companies = res.companies;
    });
  }

  generateTenantUrl(company: Company) {
    return '//' + company.workspace + '.' + environment.HOST;
  }

}
