import { PageGroup } from './playbook-page-group.model';
import { Layout } from './playbook-page-layout.model';

export class Page {
  id: string;
  title: string;
  pageGroupId: number;
  layoutId: number;
  data: any;
}
