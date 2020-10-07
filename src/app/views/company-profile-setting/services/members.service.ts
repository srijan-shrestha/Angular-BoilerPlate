import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MemberInvitesModel} from '../models/member-invites.model';
import {map} from 'rxjs/operators';
import {UserModel} from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) {
  }

  inviteMember(data) {
    return this.http.post('/users/', data);
  }

  getInvitedMembers(filterParams) {
    return this.http.get('/invite-members/', {
      params: {
        ...filterParams
      }
    }).pipe(
      map((data: any) => data.map(MemberInvitesModel.adapt))
    );
  }

  getUsers(filterParams) {
    return this.http.get('/users/', {
      params: {
        ...filterParams
      }
    }).pipe(
      map((data: any) => {
          data = data.map(MemberInvitesModel.adapt);
          return data.map(el => {
            const o = Object.assign({}, el);
            o.isUser = true;
            return o;
          });
        }
      )
    );
  }

  getUser(id) {
    return this.http.get(`/users/${id}/`).pipe(
      map((data: any) => data.map(UserModel.adapt))
    );
  }

  deleteInvitedMembers(id) {
    return this.http.delete(`/invite-members/${id}/`);
  }

  updateUser(id, data) {
    return this.http.patch(`/users/${id}/`, data);
  }

  membersList(filterParams) {
    return this.http.get('/users/', {
      params: {
        ...filterParams
      }
    }).pipe(
      map((data: any) => data.map(UserModel.adapt))
    );
  }

  memberDelete(id) {
    return this.http.delete(`/users/${id}/`);
  }

  memberUpdate(id, data) {
    return this.http.patch(`/invite-members/${id}/`, data);
  }
}
