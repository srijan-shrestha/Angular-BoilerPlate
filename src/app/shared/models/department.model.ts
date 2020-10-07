// import {BaseModel} from './base.model';

// export class DepartmentModel extends BaseModel {
//   constructor(
//     id: string,
//     public name: string
//   ) {
//     super(id);
//     console.log(name);

//   }

//   static adapt(item: any): DepartmentModel {
//     return new DepartmentModel(
//       item.id,
//       item.name,
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';


export class Department {

  id: number;
  leadershipId: number;
  divisionId: number;
  name: string;

  constructor(
    id?: number,
    leadershipId?: number,
    divisionId?: number,
    name?: string
  ) {
    this.id = id;
    this.leadershipId = leadershipId;
    this.divisionId = divisionId;
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentAdapter implements Adapter<Department> {
  adapt(item: any): Department {
    return new Department(
      item.id,
      item.leader,
      item.division,
      item.name
    );
  }
}

