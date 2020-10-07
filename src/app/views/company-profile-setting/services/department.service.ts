import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DepartmentAdapter} from 'src/app/shared/models/department.model';
import {DepartmentLeaderAdapter} from 'src/app/shared/models/departmentLeader.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    private departmentAdapter: DepartmentAdapter,
    private departmentLeaderAdapter: DepartmentLeaderAdapter
  ) {
  }

  addDepartment(data) {
    return this.http.post('/departments/', data);
  }

  getDepartments() {
    return this.http.get('/departments').pipe(
      map((data: any[]) => data.map(item => this.departmentAdapter.adapt(item)))
    );
    // return this.http.get('/departments');
  }

  listDepartments(filterParams) {
    return this.http.get('/departments',{
      params: {
        ...filterParams
      }
    }).pipe(
      map((data: any[]) => data.map(item => this.departmentAdapter.adapt(item)))
    );
  }

  addDepartmentLeader(data) {
    return this.http.post('/department-leader/', data);
  }

  updateDepartmentLeader(id, data) {
    return this.http.patch(`/department-leader/${id}/`, data);
  }

  getDepartmentLeader(filterParams) {
    return this.http.get('/department-leader/', {
        params: {
          ...filterParams
        }
      }
    ).pipe(
      map((data: any[]) => data.map(item => this.departmentLeaderAdapter.adapt(item)))
    );


    // return this.http.get('/department-leader');
  }

  deleteDepartmentLeader(departmentId) {
    return this.http.delete('/department-leader/' + departmentId + '/');
  }

  deleteDepartmentAssociatedMember(departmentLeaderId, userId) {
    return this.http.patch('/remove-department-association/' + departmentLeaderId + '/', {leadership_id: userId});
  }

  createPlanByCompanyAdmin(data, id) {
    return this.http.post(`/quarterly-plans/department/${id}/save`, data);
  }

}
