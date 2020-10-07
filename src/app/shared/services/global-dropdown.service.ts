import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {StateModel} from '../models/state.model';
import {TimezoneModel} from '../models/timezone.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalDropdownService {

  constructor(private readonly http: HttpClient) { }

  getStates() {
    return this.http.get('/states/').pipe(
      map((data: any) => data.map(StateModel.adapt))
    );
  }

  getTimezones() {
    return this.http.get('/timezones/').pipe(
      map((data: any) => data.map(TimezoneModel.adapt))
    );
  }
}
