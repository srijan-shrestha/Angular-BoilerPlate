import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private dataSource = new BehaviorSubject<Company>(new Company());

  // Store current company information including workspace.
  data = this.dataSource.asObservable();
  apiBaseURL: string;

  constructor(
    private http: HttpClient,
  ) {}

  setData(data: Company) {
    this.dataSource.next(data);
  }

  // list of apis related to company. These are not specific to current company.
  getCompany(id) {
    return this.http.get(`/companies/${id}`);
  }

  createCompany(companyData) {
    return this.http.post('/companies/', companyData);
  }

  getCompanies(filter = {}) {
    return this.http.get('/companies/');
  }
}
