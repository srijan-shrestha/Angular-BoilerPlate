import {Component, OnInit} from '@angular/core';
import {PlaybookCreateService} from '../../services/playbook-create.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playbooks-list',
  templateUrl: './playbooks-list.component.html',
  styleUrls: ['./playbooks-list.component.scss']
})
export class PlaybooksListComponent implements OnInit {
  playBookdata: any;
  playBookDetailData: any;
  isAdmin: any;

  constructor(
    private playbookService: PlaybookCreateService,
    private authService: AuthService,
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    // this.playBookdata = [
    //   {
    //     year: 2019,
    //     q1: {
    //       quarter: 1,
    //       year: 2019,
    //       title: 'A Whole New World',
    //       completedPercentage: 12,
    //       coverImage: '',
    //       createdAt: '2019-12-21',
    //       publishedAt: '',
    //       theme: 'Natural Wonders'
    //     },
    //     q2: {
    //       quarter: 2,
    //       year: 2019,
    //       title: 'Discovering Natural Treasures',
    //       completedPercentage: 100,
    //       coverImage: '',
    //       createdAt: '2019-12-21',
    //       publishedAt: '',
    //       theme: 'Natural Wonders'
    //     },
    //     q3: {
    //       quarter: 2,
    //       year: 2019,
    //       title: 'Discovering Natural Treasures',
    //       completedPercentage: 63,
    //       coverImage: '',
    //       createdAt: '2019-12-21',
    //       publishedAt: '',
    //       theme: 'Natural Wonders'
    //     },
    //     q4: undefined
    //   },
    //   {
    //     year: 2018,
    //     q3: {
    //       quarter: 1,
    //       year: 2019,
    //       title: 'A Whole New World',
    //       completedPercentage: 12,
    //       coverImage: '',
    //       createdAt: '2019-12-21',
    //       publishedAt: '',
    //       theme: 'Natural Wonders'
    //     },
    //     q4: {
    //       quarter: 2,
    //       year: 2019,
    //       title: 'Discovering Natural Treasures',
    //       completedPercentage: 100,
    //       coverImage: '',
    //       createdAt: '2019-12-21',
    //       publishedAt: '',
    //       theme: 'Natural Wonders'
    //     }
    //   },
    // ];
    this.getPlaybook();
  }

  getPlaybook() {
    this.playbookService.getPlaybookList('false').subscribe((resp: any[]) => {
      const defaultValue = [];
      const d = new Date();
      const fromYear = 2019;

      let toYear = resp.reduce((previous, playbook) => {
        return previous === undefined || playbook.year > previous ? playbook.year : previous;
      }, undefined);

      if (!toYear) {
        toYear = d.getFullYear();
      } // fallback

      for (let year = toYear; year >= fromYear; year--) {
        const yearpb = resp.find((pb) => {
          return pb.year === year;
        });
        if (yearpb) {
          defaultValue.push(yearpb);
          // defaultValue[year] = yearpb;
        } else {
          defaultValue.push({
            year
          });
        }
      }

      // Add new year if needed
      if (defaultValue.length) {
        const greatestYearInPlaybook = defaultValue[0].year;
        switch (true) {
          case typeof defaultValue[0].q4 === 'object' && defaultValue[0].q4 !== null:
          case typeof defaultValue[0].q3 === 'object' && defaultValue[0].q3 !== null:
            defaultValue.unshift({
              year: greatestYearInPlaybook + 1
            });
            break;
          default:
            break;
        }
      }

      // Determine total empty quarters to display
      // for each row to adjust two extra empty quarters for largest
      // quarter used
      defaultValue.forEach((playbook, index) => {
        const len = Object.keys(playbook).length - 1;
        switch (len) {
          case 0:
            const nextValue = defaultValue[index + 1];
            if (typeof nextValue === 'object' && nextValue.q4 === null) {
              playbook.totalPlaybooksQuarters = [1];
            } else {
              playbook.totalPlaybooksQuarters = [1, 2];
            }
            break;
          default:
            if (playbook.q2 === null && playbook.q3 === null && playbook.q4 === null) {
              playbook.totalPlaybooksQuarters = [1, 2, 3];
            } else {
              playbook.totalPlaybooksQuarters = [1, 2, 3, 4];
            }
            break;
        }
      });

      this.playBookdata = defaultValue;
    });
  }

  updateList(divisionId) {
    console.log(divisionId);
  }

  onSelected(data) {
    this.playBookDetailData = data;
  }

  isEditorPage = (): boolean => this.router.url.includes('editor');
}
