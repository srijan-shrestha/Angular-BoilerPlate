import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { DepartmentAdapter } from '../../../shared/models/department.model';
import {DesignationModel} from '../../../shared/models/designation.models';
import {UserPreferenceSettings} from '../../../shared/models/user-preference-settings';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingService {

  constructor(
    private readonly http: HttpClient,
    private departmentAdapter: DepartmentAdapter
  ) { }

  updateProfile(profile) {
    return this.http.post('/profile/', profile);
  }

  getDepartments() {
    return this.http.get('/departments/').pipe(
      map((data: any) => data.map(this.departmentAdapter.adapt))
    );
  }

  getJobTitles() {
    return this.http.get('/positions/').pipe(
      map((data: any) => data.map(DesignationModel.adapt))
    );
  }

  getPreferenceSettings() {
    return this.http.get('/company-setting/').pipe(
      map((data: any) => {
        return UserPreferenceSettings.adapt(data);
      })
    );
  }

  updatePreferenceSettings(preferenceSettings) {
    return this.http.post('/company-setting/', preferenceSettings);
  }

  allSessionSignOut(deviceId: string) {
    return this.http.post('/auth/all-sessions-logout/', { deviceId });
  }
}
