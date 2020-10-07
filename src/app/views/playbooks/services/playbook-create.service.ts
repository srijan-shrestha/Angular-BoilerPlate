import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaybookCreateService {

  constructor(private http: HttpClient) {
  }

  getPlaybookList(details =  'true') {
    return this.http.get('/playbook/', {params: {'details': details}});
  }

  createPlaybook(data) {
    return this.http.post('/playbook/', data);
  }

  getPlaybook(id) {
    return this.http.get(`playbook/${id}`);
  }

  getCompanyWideInitiatives() {
    return this.http.get('/company-wide/');
  }

  postPlaybookCoverImage(data) {
    return this.http.post('/playbook/image/', data);
  }
}
