import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/shared/models/company.models';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: CompanyModel[];
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((res: CompanyModel[]) => {
      this.companies = res;
    }, (err) => {
      console.log(err);
    });
  }

}
