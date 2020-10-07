import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPlanService {

  constructor(private http: HttpClient) { }

  getUsersWithPublishedPlan() {
    return this.http.get(`/users-with-published-plans`);
  }
}
