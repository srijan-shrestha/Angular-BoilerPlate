import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Leadership, LeadershipAdapter } from 'src/app/shared/models/leadership.models';

@Injectable({
  providedIn: 'root'
})
export class LeadershipService {

  constructor(
    private http: HttpClient,
    private leadershipAdapter: LeadershipAdapter
  ) { }

  getLeadership() {
    return this.http.get('/leadership/').pipe(
      map((data: any[]) => data.map(item => this.leadershipAdapter.adapt(item)))
    );
  }

  addLeadership(data) {
    return this.http.post('/leadership/', data);
  }
  updateLeadership(id, data) {
    return this.http.patch(`/leadership/${id}/`, data);
  }

  deleteLeadership(id) {
    return this.http.delete(`/leadership/${id}/`);
  }

  addAssistant(data) {
    return this.http.post('/assistants/', data);
  }

  deleteAssistant(id) {
    return this.http.delete(`/assistants/${id}/`);
  }
}
