import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { Team, TeamAdapter } from './team.model';
import { UserModel } from './user.model';
import { TeamLeader } from './teamLeader.model';

export class TeamMember {

  id: number;
  teamLeaderId: number;
  user: UserModel;

  constructor(
    id?: number,
    teamLeaderId?: number,
    user?: UserModel
  ) {
    this.id = id;
    this.teamLeaderId = teamLeaderId;
    this.user = user;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeamMemberAdapter implements Adapter<TeamMember> {

  adapt(item: any): TeamMember {
    return new TeamMember(
      item.id,
      item.teamLeader,
      UserModel.adapt(item.teamMember),
    );
  }
}

