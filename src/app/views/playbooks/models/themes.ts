import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';


class ThemePage {
  id: number;
  image: string;
  theme: number;
  pageGroup: number;
  pageGroupTitle: string;
  isPagePreview: boolean;
}

export class Theme {

  id: number;
  title: string;
  image: string;
  description: string;
  pages: ThemePage[] = [];
  code: string;

  constructor(
    id?: number,
    title?: string,
    code?: string,
    image?: string,
    description?: string,
    pages?: ThemePage[]
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.pages = pages;
    this.code = code;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ThemeAdapter implements Adapter<Theme> {
  adapt(item: any): Theme {
    return new Theme(
      item.id,
      item.title,
      item.code,
      item.image,
      item.description,
      item.pages
    );
  }
}
