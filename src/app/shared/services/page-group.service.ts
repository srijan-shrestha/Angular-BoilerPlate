import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageGroup } from '../models/playbook-page-group.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageGroupService {
  private pageGroupsSource = new BehaviorSubject<PageGroup[]>([]);

  pageGroups = this.pageGroupsSource.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  setPageGroupData(pageGroups: PageGroup[]) {
    this.pageGroupsSource.next(pageGroups);
  }

  getPageGroup(id: number) {
    return this.pageGroupsSource.getValue().find((pg: PageGroup) => {
      return pg.id === id;
    });
  }

  getPageGroups() {
    return this.http.get('/page-groups/').pipe(
      map((data: any) => data.map(PageGroup.adapt))
    );
  }
}
