import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GoalModel, GoalAdapter} from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(
    private http: HttpClient,
    private goalAdapter: GoalAdapter
  ) {
  }

  createAnnualGoal(data: any) {
    return this.http.post('/annual-company-goal/', data);
  }

  getAnnualGoal() {
    return this.http.get('/annual-company-goal/').pipe(
      map((resp: any[]) => resp.map(item => this.goalAdapter.adapt(item)))
    );
  }

  createAnnualGoalFeedback(data) {
    return this.http.post('/goal-feedback/', data);
  }
}
// return this.http.get('/annual-initiative/').pipe(
//   map((response: any[]) => response.map(item => this.initiativeAdapter.adapt(item)))