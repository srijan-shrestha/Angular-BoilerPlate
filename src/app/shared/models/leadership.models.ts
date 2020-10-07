import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { UserModel } from './user.model';
import { Assistant, AssistantAdapter } from './assistant.models';


export class Leadership {

  id: number;
  assistants: Assistant[];
  leader: UserModel;
  order: number;

  constructor(
    id?: number,
    assistants?: Assistant[],
    leader?: UserModel,
    order?: number
  ) {
    this.id = id;
    this.assistants = assistants;
    this.leader = leader;
    this.order = order;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LeadershipAdapter implements Adapter<Leadership> {
  constructor(
    private assistantAdapter: AssistantAdapter
  ) {}

  adapt(item: any): Leadership {
    return new Leadership(
      item.id,
      item.assistant.map(assistant => this.assistantAdapter.adapt(assistant)),
      UserModel.adapt(item.leader),
      item.order
    );
  }
}
