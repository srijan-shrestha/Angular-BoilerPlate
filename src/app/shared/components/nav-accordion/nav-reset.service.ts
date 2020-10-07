import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavResetService {
  private dataSource = new BehaviorSubject<any>(false);

  data = this.dataSource.asObservable();

  setData(data) {
    this.dataSource.next(data);
  }

  constructor() { }
}
