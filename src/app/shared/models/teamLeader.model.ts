import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';
import { Team, TeamAdapter } from './team.model';
import { UserModel } from './user.model';

export class TeamLeader {

  id: number;
  team: Team;
  user: UserModel;

  constructor(
    id?: number,
    team?: Team,
    user?: UserModel
  ) {
    this.id = id;
    this.team = team;
    this.user = user;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderAdapter implements Adapter<TeamLeader> {
  constructor(
    private teamAdapter: TeamAdapter
  ) {}

  adapt(item: any): TeamLeader {
    return new TeamLeader(
      item.id,
      this.teamAdapter.adapt(item.team),
      UserModel.adapt(item.teamLeader),
    );
  }
}

