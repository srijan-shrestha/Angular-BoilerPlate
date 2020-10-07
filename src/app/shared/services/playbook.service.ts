import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PlayBook, PlayBookAdapter} from '../models/playbook.model';
import {PageGroup} from '../models/playbook-page-group.model';
import {Layout} from '../models/playbook-page-layout.model';
import {Page} from '../models/playbook-page.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators/map';
import {PlayBookHistoryService} from "./playbook-history.service";

@Injectable({
  providedIn: 'root'
})
export class PlayBookService {
  playbookSource = new BehaviorSubject<PlayBook>(new PlayBook());
  playbook = this.playbookSource.asObservable();

  public imageTabSource = new BehaviorSubject<any>('layouts');
  imageActive = this.imageTabSource.asObservable();
  public imageTabBottomBarShow = new BehaviorSubject<any>('normal');
  bottomBarActive = this.imageTabBottomBarShow.asObservable();

  constructor(
    private http: HttpClient,
    private playbookAdapter: PlayBookAdapter,
    private playBookHistoryService: PlayBookHistoryService
  ) {
  }

  setPlaybookData(playbook: PlayBook) {
    this.playbookSource.next(playbook);
  }

  resetPlaybookData() {
    this.playbookSource.next(new PlayBook());
  }

  createPlaybook(defaultData, playbook) {
    const data = {
      ...defaultData,
      data: {
        pages: playbook.pages,
        pageLinks: playbook.pageLinks
      },
    };
    return this.http.post('/playbook/', data);
  }

  createPage(pageGroup: PageGroup, layout: Layout, data = null) {
    const playbook = this.playbookSource.getValue();

    const id = (
      Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15)
    ).replace(/[0-9]/g, '');

    if (!playbook.pages) {
      playbook.pages = {};
    }
    if (!playbook.pageLinks) {
      playbook.pageLinks = [];
    }

    this.playbookSource.next({
      ...playbook,
      pages: {
        ...playbook.pages,
        [id]: {
          id,
          title: pageGroup.title, // default title from layout. This can be edited by user later
          pageGroupId: pageGroup.id,
          layoutId: layout.id,
          data: data ? data : {},
          // @ts-ignore
          teamId: pageGroup.teamId,
          // @ts-ignore
          departmentId: pageGroup.departmentId,
        }
      },
      pageLinks: [
        ...playbook.pageLinks,
        {
          pages: [id]
        }
      ]
    });

    this.onPlayBookChanged(true);
  }

  updatePageLayout(page: Page, layout: Layout, isSaving: boolean = false) {
    const playbook = this.playbookSource.getValue();

    this.playbookSource.next({
      ...playbook,
      pages: {
        ...playbook.pages,
        [page.id]: {
          ...playbook.pages[page.id],
          layoutId: layout.id
        }
      }
    });
    this.onPlayBookChanged(isSaving);
  }

  updatePage(page: Page, isSaving: boolean = false) {
    const playbook = this.playbookSource.getValue();

    this.playbookSource.next({
      ...playbook,
      pages: {
        ...playbook.pages,
        [page.id]: page
      }
    });
    this.onPlayBookChanged(isSaving);
  }

  updatePlaybookDetail(detail: PlayBook, isSaving: boolean = false) {
    const playbook = this.playbookSource.getValue();
    this.playbookSource.next({
      ...playbook,
      title: detail.title,
    });
    this.onPlayBookChanged(isSaving);
  }

  onPlayBookChanged(isSaving: boolean = false): void {
    if (isSaving) {
      this.playBookHistoryService.setPlaybookData(this.playbookSource.getValue());
    }
  }

  updatePlaybookData(detail: PlayBook) {
    this.playbookSource.next(detail);
  }

  getPlaybook(id: string) {
    return this.http.get(`/playbook/${id}/`).pipe(
      map((data: any) => this.playbookAdapter.adapt(data))
    );
  }

  publish = (id, payload) => this.http.put(`/playbook-publish/${id}/`, payload);

  updatePlaybook(id: number, playbook: PlayBook) {
    const data = {
      ...playbook,
      data: {
        pages: playbook.pages,
        pageLinks: playbook.pageLinks
      },
      theme: playbook.theme.id,
      pages: undefined,
      pageLinks: undefined,
    };
    return this.http.put(`/playbook/${id}/`, data);
  }

  getPagesArray() {
    const playbook = this.playbookSource.getValue();
    let pages = [];
    playbook.pageLinks.forEach(pageLink => {
      pages = pages.concat(pageLink.pages);
    });
    return pages;
  }

  // setRandomPage() {
  //   const playbooks = this.playbookSource.getValue();
  //   this.playbookSource.next({
  //     ...playbooks,
  //     pageLinks: [
  //       ...playbooks.pageLinks,
  //       {
  //         type: 'link',
  //         pages: [{
  //           pageGroup: {
  //             title: 'frontcover'
  //           },
  //           title: Math.random().toString(),
  //           layout: {
  //             pageGroup: {
  //               title: 'frontcover'
  //             },
  //             title: 'Front Cover',
  //             image: ''
  //           }
  //         }]
  //       },
  //     ]
  //   });
  // console.log(this.playbookSource.value.)
  // }

}


// FORMAT FOR PLAYBOOK

const format = [
  {
    type: 'link',
    pages: [
      {
        type: 'page',
        pageGroup: 'frontcover',
        title: 'Front Cover'
      },
    ],
  }, {
    type: 'link',
    pages: [
      {
        type: 'page',
        pageGroup: 'backcover',
        title: 'Back Cover'
      },
    ]
  },
  {
    type: 'link',
    pages: [
      {
        type: 'page',
        pageGroup: 'article1firstpage',
        title: 'Article 1'
      },
      {
        type: 'page',
        pageGroup: 'article1continuedpage',
        title: 'Article 1 Continued'
      }
    ]
  }
];
