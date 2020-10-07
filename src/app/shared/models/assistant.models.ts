import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { UserModel } from './user.model';


export class Assistant {

  id: number;
  user: UserModel;
  leaderId: number;

  constructor(
    id?: number,
    user?: UserModel,
    leaderId?: number,
  ) {
    this.id = id;
    this.user = user;
    this.leaderId = leaderId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssistantAdapter implements Adapter<Assistant> {
  adapt(item: any): Assistant {
    return new Assistant(
      item.id,
      UserModel.adapt(item.assistant),
      item.leader
    );
  }
}
