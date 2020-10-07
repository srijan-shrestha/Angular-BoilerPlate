import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DivisionAdapter } from 'src/app/shared/models/division.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private http: HttpClient,
    private divisionAdapter: DivisionAdapter
  ) { }

  addDivision(data) {
    return this.http.post('/divisions/', data);
  }

  getDivisions() {
    return this.http.get('/divisions').pipe(
      map((data: any[]) => data.map(item => this.divisionAdapter.adapt(item)))
    );
  }
}
