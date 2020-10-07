import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TeamLeaderAdapter } from 'src/app/shared/models/teamLeader.model';
import { TeamAdapter } from 'src/app/shared/models/team.model';
import { TeamMemberAdapter, TeamMember } from 'src/app/shared/models/teamMember.model';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public teamUsers = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private teamAdapter: TeamAdapter,
    private teamLeaderAdapter: TeamLeaderAdapter,
    private teamMemberAdapter: TeamMemberAdapter
  ) { }

  setTeamUserData(data) {
    this.teamUsers.next(data);
  }

  addTeam(data) {
    return this.http.post('/team/', data);
  }

  getTeam(filterParams = {}) {
    return this.http.get('/team', {params: { ...filterParams}}).pipe(
      map((data: any[]) => data.map(item => this.teamAdapter.adapt(item)))
    );
  }

  retrieveTeam(teamId) {
    return this.http.get(`/team/${teamId}/`).pipe(
      map((data: any[]) => data.map(item => this.teamAdapter.adapt(item)))
    );
  }

  addTeamLeader(data) {
    return this.http.post('/team-leader/', data);
  }

  updateTeamLeader(id, data) {
    return this.http.patch(`/team-leader/${id}/`, data);
  }

  getTeamLeader(filterParams) {
    return this.http.get('/team-leader/', {
      params: {
        ...filterParams
      }}
    ).pipe(
      map((data: any[]) => data.map(item => this.teamLeaderAdapter.adapt(item)))
    );
    // return this.http.get('/team-leader');
  }

  deleteTeamLeader(id) {
    return this.http.delete(`/team-leader/${id}/`);
  }


  getTeamAndLeaders(filterParams) {
    return this.http.get('/team-and-teamleaders/', {
      params: {
        ...filterParams
      }}
    ).pipe(
      map((data: {team: any, teamLeaders: any[]}[]) => {
        return data.map(item => {
          return {
            team: this.teamAdapter.adapt(item.team),
            teamLeaders: item.teamLeaders.map(teamLeader => this.teamLeaderAdapter.adapt(teamLeader))
          };
        });
      }
    ));
  }

  getUsersUnderDepartment(filterParams) {
    return this.http.get('/users-under-department/', {
      params: {
        ...filterParams
      }}
    );
  }

  addTeamMember(data) {
    return this.http.post('/team-member/', data);
  }

  getTeamMembers(filterParams) {
    return this.http.get('/team-member/', {
      params: {
        ...filterParams
      }}
    ).pipe(
      map((data: any[]) => data.map(item => this.teamMemberAdapter.adapt(item)))
    );
  }

  deleteTeamMember(id) {
    return this.http.delete(`/team-member/${id}/`);
  }

  deleteTeamAssociatedMembers(teamId) {
    return this.http.patch(`/remove-team-association/${teamId}/`, {});
  }

  removeUserAssociationWithOtherOrganizationUnit(userId, type) {
    return this.http.patch(`/remove-user-association/`, {user_id: userId, type});
  }

  deleteAllMembersOfTeamLeader(teamLeaderId) {
    return this.http.patch(`/remove-team-membership/${teamLeaderId}/`, {});
  }
}
