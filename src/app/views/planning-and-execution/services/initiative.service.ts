import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AnnualInitiativeAdapter, InitiativeAdapter} from '../models/initiative.model';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(private http: HttpClient,
              private initiativeAdapter: InitiativeAdapter,
              private annualInitiativeAdapter: AnnualInitiativeAdapter ) {
  }

  createAnnualInitiative(data: any) {
    return this.http.post('/annual-initiative/', data);
  }

  getAnnualInitiatives() {
    return this.http.get('/annual-initiative/').pipe(
      map((response: any[]) => response.map(item => this.initiativeAdapter.adapt(item)))
    );
  }

  createAnnualInitiativeFeedback(data) {
    return this.http.post('/initiative-feedback/', data);
  }

  getAnnualInitiative(id) {
    return this.http.get(`/annual-initiative/${id}`).pipe(
      map((response) => this.annualInitiativeAdapter.adapt(response))
    );
  }

  listAnnualInitiatives(filterParams) {
    return this.http.get('/annual-initiative/', {
      params: {
        ...filterParams
      }});
  }

  getAnnualGoalYearWiseStatus() {
    return this.http.get('/get-annual-goal-year-wise-status/');
  }
}
