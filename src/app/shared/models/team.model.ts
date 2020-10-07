import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { DepartmentLeader } from './departmentLeader.model';

export class Team {

  id: number;
  departmentLeader: DepartmentLeader;
  name: string;

  constructor(
    id?: number,
    departmentLeader?: DepartmentLeader,
    name?: string
  ) {
    this.id = id;
    this.departmentLeader = departmentLeader;
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeamAdapter implements Adapter<Team> {
  adapt(item: any): Team {
    return new Team(
      item.id,
      item.departmentLeader,
      item.teamName
    );
  }
}

