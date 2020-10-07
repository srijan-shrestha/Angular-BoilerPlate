import { Layout } from './playbook-page-layout.model';

// export class PageGroup {
//   id: number;
//   title: string;
//   layouts: Layout[];
//   code: string;
// }
export class PageGroup {
  id: number;
  title: string;
  layouts: Layout[];
  code: string;

  constructor(
    id ?: number,
    title ?: string,
    layouts ?: Layout[],
    code ?: string,
  ) {
    this.id = id;
    this.title = title;
    this.layouts = layouts;
    this.code = code;
  }

  static adapt(item: any): PageGroup {
    return new PageGroup(
      item.id,
      item.title,
      item.layouts.map(layout => Layout.adapt(layout)),
      item.code
    );
  }
}
