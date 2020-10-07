import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ThemeAdapter, Theme } from '../models/themes';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themesSource = new BehaviorSubject<Theme[]>([]);

  themes = this.themesSource.asObservable();

  constructor(
    private readonly http: HttpClient,
    private adapter: ThemeAdapter,
  ) { }

  setThemesData(themes: Theme[]) {
    this.themesSource.next(themes);
  }

  list(filters = {}): Observable<Theme[]> {
    return this.http.get('/themes/').pipe(
      map((data: any[]) => data.map(item => this.adapter.adapt(item))),
    );
  }

}
