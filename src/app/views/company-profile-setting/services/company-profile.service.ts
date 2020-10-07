import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompanyModel} from '../../../shared/models/company.models';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  constructor(private readonly http: HttpClient) { }

  private companyData = new BehaviorSubject<CompanyModel> (null);
  data = this.companyData.asObservable();

  setData(data: CompanyModel) {
    this.companyData.next(data);
  }

  setCompanyLogoMark(companyLogoMark: string) {
    const data = this.companyData.getValue();
    this.companyData.next({
      ...data,
      companyLogoMark
    });
  }
  setCompanyLogo(companyLogo: string) {
    const data = this.companyData.getValue();
    this.companyData.next({
      ...data,
      companyLogo
    });
  }

  getCompanyProfile() {
    return this.http.get('/company-profile/').pipe(
      map((data: any) => {
        return CompanyModel.adapt(data);
      })
    );
  }

  updateCompanyProfile(companyProfile) {
    return this.http.post('/company-profile/', companyProfile);
  }

  uploadCompanyImage(data) {
    return this.http.post('/company-logo-mark/', data);
  }

  uploadCompanyLogo(data) {
    return this.http.post('/company-logo/', data);
  }

  getMissionValues() {
    return this.http.get('/mission-values/');
  }

  postMission(missonData) {
    return this.http.post('/mission/', missonData);
  }
  postValues(valueData) {
    return this.http.post('/values/', valueData);
  }

  getMission() {
    return this.http.get('/mission/');
  }

  getValues() {
    return this.http.get('/values/');
  }

  postAboutUs(data) {
    return this.http.post('/about-us/', data);
  }

  getAboutUs() {
    return this.http.get('/about-us/');
  }

  postMissionValues(data: {mission: string, values: Array<string>}) {
    return this.http.post('/mission-values/', data);
  }

  postExtraInfo(data) {
    return this.http.post('/extra-info/', data);
  }

  getExtraInfo() {
    return this.http.get('/extra-info/');
  }

  updateExtraInfo(data, id) {
    return this.http.patch(`/extra-info/${id}/`, data);
  }

  // todo move these to notification module
  getNotifications = () => this.http.get('/notifications/');

  readNotification = (notificationId) => this.http.post('/read-notification/', {notification_id: notificationId});

  getPrinciples = () => this.http.get('/principles/');

  updatePrinciple = (principleId, payload) => this.http.patch(`/principles/${principleId}/`, payload);
}
