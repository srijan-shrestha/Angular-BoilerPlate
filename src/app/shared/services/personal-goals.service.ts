import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuarterlyPersonalPlan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PersonalGoalsService {
  private dataSource = new BehaviorSubject<any>(new QuarterlyPersonalPlan());
  data = this.dataSource.asObservable();

  yearQuarterSource = {};
  yearQuarterSourceForCompanyAdmin = {};
  isPublished = false;
  publishedData: [];

  apiBaseURL: string;

  constructor(
    private http: HttpClient,
  ) {}

  setYearQuarterData(data) {
    this.yearQuarterSource = data;
  }

  getYearQuarterData() {
    return this.yearQuarterSource;
  }

  resetYearQuarterData() {
    this.yearQuarterSource = {};
  }

  setYearQuarterDataForCompanyAdmin(data) {
    this.yearQuarterSourceForCompanyAdmin = data;
  }

  getYearQuarterDataForCompanyAdmin() {
    return this.yearQuarterSourceForCompanyAdmin;
  }

  resetYearQuarterDataForCompanyAdmin() {
    this.yearQuarterSourceForCompanyAdmin = {};
  }

  setPublishedData(flag, data) {
    this.isPublished = flag;
    this.publishedData = data;
  }

  getPublishedData() {
    return {flag: this.isPublished, data: this.publishedData};
  }

  setData(data: QuarterlyPersonalPlan) {
    this.dataSource.next(data);
  }

  get(id) {
    return this.http.get(`/quarterly-plans/personal/${id}`);
  }

  create(data) {
    return this.http.post('/quarterly-plans/personal', data);
  }

  patch(data) {
    return this.http.patch('/quarterly-plans/personal', data);
  }

  list(filter = {}) {
    return this.http.get('/quarterly-plans/personal', {params: filter});
  }

  save(data) {
    return this.http.post('/quarterly-plans/personal/save', data);
  }

  listSpecificPlan(filter = {}) {
    return this.http.get('/quarterly-plans/personal/specific', {params: filter});
  }
}
