import {Page} from './playbook-page.model';
import {PlayBook} from './playbook.model';

export class Editor {
  currentPageId: string; // uuid of page
  currentPageLinkIndex = 0; // index of page in pagelink
  currentPageNumber = 0; // overall page number
  leftPage: Page;
  rightPage: Page;
  history: PlayBook[];
  historyIndex: 0;
}
