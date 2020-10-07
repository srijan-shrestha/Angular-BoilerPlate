import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CompanyProfileService} from 'src/app/views/company-profile-setting/services/company-profile.service';
import {ProfileService} from '../../services/profile.service';
import {UserModel} from '../../models/user.model';
import {SideNavComponent} from '../side-nav/side-nav.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbPopoverConfig]
})
export class HeaderComponent implements OnInit {
  companyLogo: string;
  userName: string;
  companyName: string;
  companyId: string;
  profilePic: string;
  companyLogoMark: string;
  hide: boolean = true;
  goalsList = {team: 'Team goals', department: 'Department goals', personal: 'Personal Goals'};
  goalsListDisplay = [];
  notifications: any = [];
  @ViewChild(SideNavComponent, {static: false}) child: SideNavComponent;

  constructor(private authService: AuthService,
              private companyProfileService: CompanyProfileService,
              private userProfile: ProfileService,
              public router: Router
  ) {
  }

  ngOnInit() {
    this.companyProfileService.data.subscribe(
      res => {
        if (res) {
          this.companyId = res.id;
          this.companyLogo = res.companyLogo;
          this.companyName = res.name;
          this.companyLogoMark = res.companyLogoMark;
        }
      }
    );
    this.userProfile.data.subscribe((res: UserModel) => {
      if (res) {
        this.userName = res.fullName || 'User';
        this.profilePic = res.profilePic;
      }
      this.getNotifications();
    });

    if (this.isQuarterlyGoalsPage()) {
      this.getGoalsDisplay();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof  NavigationEnd) {

        if (this.isQuarterlyGoalsPage()) {
          this.getGoalsDisplay();
        }
      }
    });
  }

  logOut() {
    this.authService.logout();
  }

  navToggle() {
    this.hide = !this.hide;
  }

  sidenavToggle() {
    this.child.sidebarToggle();
  }

  sidenavHide() {
    this.child.sidebarHide();
  }

  isAnnualGoalsPage = (): boolean => this.router.url.split('/')[2] && this.router.url.split('/')[2] === 'annual-goals';

  isQuarterlyGoalsPage = (): boolean => this.router.url.split('/')[1] && this.router.url.split('/')[1] === 'quarterly-goals';

  isThemePage = (): boolean => {
    const routerUrl = this.router.url;
    return routerUrl.includes('/company/themes/preview-annual') || routerUrl.includes('company/annual/themes/create') ||
      routerUrl.includes('company/quarterly/themes/create') || routerUrl.includes('company/themes/preview-quarterly');
  };

  getThemeTitle = (): string => {
    const routerUrl = this.router.url;

    if (routerUrl.includes('/company/annual/themes/create')) {
      return 'Annual Theme';
    }

    if (routerUrl.includes('/company/themes/preview-annual')) {
      return 'Annual Theme Preview';
    }

    if (routerUrl.includes('/company/quarterly/themes/create')) {
      return 'Quarterly Theme';
    }
    if (routerUrl.includes('company/themes/preview-quarterly')) {
      return 'Quarterly Theme Preview';
    }
  };

  isQuarterlyDeptGoalsPage = (): boolean => this.isQuarterlyGoalsPage() &&
    this.router.url.split('/')[2] && this.router.url.split('/')[2] === 'department';

  getPageTitle = (): string => {
    const url = this.router.url.split('/');
    if (this.isQuarterlyGoalsPage()) {
      return 'Quarterly ' + url[2].replace(/-/g, ' ') + ' Goals';
    } else if (this.isThemePage()) {
      return this.getThemeTitle();
    } else if (this.isAnnualGoalsPage()) {
      return 'Company Annual Goals';
    } else {
      return url[1].replace(/-/g, ' ');
    }
  };

  getGoalsDisplay = (): any => {
    const url = this.router.url.split('/');
    this.goalsListDisplay = [];

    for (const [key, value] of Object.entries(this.goalsList)) {
      if (key !== url[2]) {
        this.goalsListDisplay.push({url: '/quarterly-goals/' + key, label: value});
      }
    }
  };

  toggleNotificationBox = () => {
    const notificationBoxClassList = document.getElementById('notification-box').classList;
    if (notificationBoxClassList.contains('d-none')) {
      this.getNotifications();
      notificationBoxClassList.remove('d-none');
    } else {
      notificationBoxClassList.add('d-none');
    }
  };

  getNotifications = () => this.companyProfileService.getNotifications().subscribe(response => this.notifications = response);

  notificationClicked = (notification) => {
    this.companyProfileService.readNotification(notification.id).subscribe(() => {
      this.getNotifications();
      if (this.isNotificationPlayBookPublish(notification)) {
        this.router.navigate([this.getValidJson(notification).url]).then(() => this.toggleNotificationBox());
      }
    });
  };

  isNotificationPlayBookPublish = (notification): boolean => notification.type === 'playbook_published';

  getValidJson = (notification) => {
    try {
      return JSON.parse(notification.description.split(`'`).join('"'));
    } catch (e) {
      return '';
    }
  };

  dynamicNotification = (notification) => this.isNotificationPlayBookPublish(notification) ? this.getValidJson(notification).description
    : notification.description;
}
