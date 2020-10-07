import { Injectable } from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private loggedInUser = new BehaviorSubject<UserModel>(null);
  data = this.loggedInUser.asObservable();

  setData(data: UserModel) {
    this.loggedInUser.next(data);
  }

  getProfile() {
    return this.http.get('/profile/').pipe(
      map(UserModel.adapt)
    );
  }

  setProfileImage(profilePic: string) {
    const data = this.loggedInUser.getValue();
    this.loggedInUser.next({
      ...data,
      profilePic
    });
  }
}
