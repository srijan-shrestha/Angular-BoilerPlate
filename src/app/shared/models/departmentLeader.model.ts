import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { UserModel } from './user.model';
import { Department, DepartmentAdapter } from './department.model';
import { Leadership, LeadershipAdapter } from './leadership.models';


export class DepartmentLeader {

  id: number;
  // divisionId: number;
  user: UserModel;
  department: Department;
  leadership: Leadership;

  constructor(
    id?: number,
    // divisionId?: number,
    user?: UserModel,
    department?: Department,
    leadership?: Leadership
  ) {
    this.id = id;
    // this.divisionId = divisionId;
    this.user = user;
    this.department = department;
    this.leadership = leadership;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentLeaderAdapter implements Adapter<DepartmentLeader> {
  constructor(
    private departmentAdapter: DepartmentAdapter,
    private leadershipAdapter: LeadershipAdapter
  ) {}

  adapt(item: any): DepartmentLeader {
    return new DepartmentLeader(
      item.id,
      // item.division,
      UserModel.adapt(item.user),
      this.departmentAdapter.adapt(item.department),
      this.leadershipAdapter.adapt(item.leadership)
    );
  }
}
