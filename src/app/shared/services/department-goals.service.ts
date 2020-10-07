import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuarterlyDepartMentPlan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class DepartmentGoalsService {
  private dataSource = new BehaviorSubject<any>(new QuarterlyDepartMentPlan());
  data = this.dataSource.asObservable();

  yearQuarterSource = {};
  yearQuarterSourceForCompanyAdmin = {};
  isPublished = false;
  publishedData: [];
  departmentForPreview: any;

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

  setPreviewData(department) {
    this.departmentForPreview = department;
  }

  getPreviewData() {
    return this.departmentForPreview;
  }

  setData(data: QuarterlyDepartMentPlan) {
    this.dataSource.next(data);
  }

  get(id) {
    return this.http.get(`/quarterly-plans/department/${id}`);
  }

  create(data) {
    return this.http.post('/quarterly-plans/department', data);
  }

  patch(data) {
    return this.http.patch('/quarterly-plans/department', data);
  }

  list(filter = {}) {
    return this.http.get('/quarterly-plans/department', {params: filter});
  }

  save(data) {
    return this.http.post('/quarterly-plans/department/save', data);
  }

  listSpecificPlan(filter = {}) {
    return this.http.get('/quarterly-plans/department/specific', {params: filter});
  }

  createPlanByCompanyAdmin(data, id) {
    return this.http.post(`/quarterly-plans/department/${id}/save`, data);
  }
}
