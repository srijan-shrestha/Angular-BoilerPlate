import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  savePaymentDetails(data) {
    return this.http.post('/billing-history', data);
  }
  saveCard(data) {
    return this.http.post('/card-info', data);
  }
  getBillingHistory(page) {
    let url  = '/billing-history';
    if (page) {
      url += '?page=' + page;
    }
    return this.http.get(url);
  }
  getCompanyCurrentPlan() {
    return this.http.get('/current-billing-history');
  }
}
