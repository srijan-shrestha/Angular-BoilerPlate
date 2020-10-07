import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  addLocation(data) {
   return this.http.post('/locations/', data);
  }

  getLocation() {
    return this.http.get('/locations');
  }

}
