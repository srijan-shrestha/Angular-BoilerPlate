import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {

  constructor(private http: HttpClient) { }

  uploadPicture(data) {
    return this.http.post('/users/profile-pic/', data);
  }
}
