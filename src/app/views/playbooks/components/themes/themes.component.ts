import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Theme} from '../../models/themes';
import {Router} from '@angular/router';
import {ThemeService} from '../../services/theme.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PlayBookService} from 'src/app/shared/services/playbook.service';
import {PageGroupService} from 'src/app/shared/services/page-group.service';
import {PageGroup} from 'src/app/shared/models/playbook-page-group.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlaybookThemePreviewComponent} from '../playbook-theme-preview/playbook-theme-preview.component';
import {TeamService} from '../../../company-profile-setting/services/team.service';
import {DepartmentService} from '../../../company-profile-setting/services/department.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit, OnDestroy {
  @Input() quarter: any;
  @Input() year: any;

  sortBy: string = null;
  themes: Theme[];

  pId: any;
  pageGroups: PageGroup[];
  playbookData: any;

  selectedTheme: Theme;

  filters: FormGroup;
  showCreate = false;
  state: any;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private fb: FormBuilder,
    public playbookService: PlayBookService,
    public pageGroupService: PageGroupService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private teamService: TeamService,
    private departmentService: DepartmentService
  ) {
  }

  ngOnDestroy() {
    this.playbookService.resetPlaybookData();
  }

  ngOnInit() {
    this.themeService.list().subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
    if (!('data' in history.state)) {
      this.router.navigateByUrl('/playbooks/editor');
    }
  }


  themeSelected(theme: Theme) {
    if (theme.code === 'sky-blue') {
      this.selectedTheme = theme;
      this.showCreate = true;
    }
  }

  createPlaybook() {
    this.toastr.info('Please wait. Creating the playbook now.');

    if (!('data' in history.state)) {
      this.toastr.warning('Please select the playbook year');
      this.router.navigateByUrl('/playbooks');
    }
    const data = {
      division: null,
      year: history.state.data.year,
      quarter: history.state.data.quarter,
      theme: this.selectedTheme.id,
      data: {},
      title: ''
    };

    this.pageGroupService.getPageGroups().subscribe(res => {
      this.pageGroupService.setPageGroupData(res);

      this.teamService.getTeam().subscribe(teams => {
        const teamIds = [];
        for (const team of teams) {
          teamIds.push(team.id);
        }

        this.departmentService.getDepartments().subscribe(departments => {
          const departmentIds = [];
          for (const department of departments) {
            departmentIds.push(department.id);
          }

          this.pageGroups = this.getPageGroupsInOrder(res, teamIds, departmentIds);
          if (this.pageGroups !== undefined && this.pageGroups.length > 0) {
            this.pageGroups.forEach(element => {
              this.playbookService.createPage(element, element.layouts[0]);
            });
          }

          this.playbookData = this.playbookService.playbookSource.getValue();
          this.playbookService.createPlaybook(data, this.playbookData).subscribe((resp: any) => {
            this.router.navigateByUrl('/playbooks/' + resp.id);
          });
        });
      });
    }, error => {
      console.log(error);
    });
  }

  previewTheme() {
    const modalRef = this.modalService.open(PlaybookThemePreviewComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'playbookpreview-model-size',
      backdrop: true,
      backdropClass: 'dark-backdrop'
    });
    modalRef.componentInstance.themes = this.themes;
  }

  backClicked() {
    this.showCreate = false;
    this.selectedTheme = null;
  }

  setSortOption(option: string) {
    this.sortBy = option;
  }

  // Code to order the playbook spreads in require order.
  // teamsIds is used to duplicate the team page (business_development) for every team
  // departmentIds is used to duplicate the department page (top_initiatives) for every department
  getPageGroupsInOrder(data, teamIds, departmentIds) {
    const orderedPageGroups = [];
    const order = ['cover', 'letter_to_editor', 'toc', 'article', 'whats_new', 'mission_statement',
      'corporate_events', 'section_divider', 'goals', 'company_wide_initiatives', 'top_initiatives',
      'philosophies', 'journey', 'problem_solution', 'growth', 'business_development', 'upcoming_events',
      'back_cover'];

    order.forEach(element => {
      const da = data.find(elm => elm.code === element);

      // Duplicate the teams page (business_development currently) or departments page (top_initiatives)
      if (element === 'business_development') {
        teamIds.forEach(teamId => {
          const teamPage = {...da, teamId};
          orderedPageGroups.push(teamPage);
        });
        return;
      } else if (element === 'top_initiatives') {
        departmentIds.forEach(departmentId => {
          const departmentPage = {...da, departmentId};
          orderedPageGroups.push(departmentPage);
        });
        return;
      }
      orderedPageGroups.push(da);
    });

    return orderedPageGroups;
  }


}
