import { PageLink } from './playbook-page-link.model';
import { Page } from './playbook-page.model';
import { Theme } from 'src/app/views/playbooks/models/themes';
import { Adapter } from '../../core/adapter';
import { Injectable } from '@angular/core';

export class PlayBook {
  id: string;
  title: string;
  quarter: number;
  year: number;
  // completedPercentage: number;
  // coverImage: string | undefined;
  createdAt: Date | string | null;
  publishedAt: Date | string | null;
  theme: Theme;
  pageLinks: PageLink[] = [];
  pages: {
    [id: string]: Page
  };

  constructor(
    id?: string,
    title?: string,
    quarter?: number,
    year?: number,
    createdAt?: Date | string | null,
    publishedAt?: Date | string | null,
    theme?: Theme,
    pageLinks?: PageLink[],
    pages?: {
      [id: string]: Page
    }
  ) {
    this.id = id;
    this.title = title;
    this.quarter = quarter;
    this.year = year;
    this.createdAt = createdAt;
    this.publishedAt = publishedAt;
    this.theme = theme;
    this.pageLinks = pageLinks;
    this.pages = pages;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayBookAdapter implements Adapter<PlayBook> {
  adapt(item: any): PlayBook {
    return new PlayBook(
      item.id,
      item.title,
      item.quarter,
      item.year,
      item.createdAt,
      item.publishedAt,
      item.theme,
      item.data.pageLinks ? item.data.pageLinks : [],
      item.data.pages ? item.data.pages : {}
    );
  }
}
