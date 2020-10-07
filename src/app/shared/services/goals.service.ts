import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuarterlyTeamPlan } from '../models/plan';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private dataSource = new BehaviorSubject<any>(new QuarterlyTeamPlan());
  data = this.dataSource.asObservable();

  yearQuarterSource = {};
  yearQuarterSourceForCompanyAdmin = {};
  isPublished = false;
  publishedData: [];
  teamForPreview: any;

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

  setPreviewData(team) {
    this.teamForPreview = team;
  }

  getPreviewData() {
    return this.teamForPreview;
  }

  setData(data: QuarterlyTeamPlan) {
    this.dataSource.next(data);
  }

  get(id) {
    return this.http.get(`/quarterly-plans/team/${id}`);
  }

  create(data) {
    return this.http.post('/quarterly-plans/team', data);
  }

  patch(data) {
    return this.http.patch('/quarterly-plans/team', data);
  }

  list(filter = {}) {
    return this.http.get('/quarterly-plans/team', {params: filter});
  }

  save(data) {
    return this.http.post('/quarterly-plans/team/save', data);
  }

  listSpecificPlan(filter = {}) {
    return this.http.get('/quarterly-plans/team/specific', {params: filter});
  }

  createPlanByCompanyAdmin(data, id) {
    return this.http.post(`/quarterly-plans/team/${id}/save`, data);
  }
}
