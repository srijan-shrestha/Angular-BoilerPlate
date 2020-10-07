import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InviteMembersComponent} from '../invite-members/invite-members.component';
import {MembersService} from '../../services/members.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ConfirmationDialogComponent} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {MemberFilterDialogComponent} from '../../../../shared/components/member-filter-dialog/member-filter-dialog.component';
import {DepartmentService} from '../../services/department.service';
import {Department} from '../../../../shared/models/department.model';
import {CompanyService} from '../../../company/services/company.service';
import orderBy from 'lodash/orderBy';
// @ts-ignore
import moment from 'moment';
import {AuthService} from 'src/app/shared/services/auth.service';
import {UserRoleModel} from '../../../../shared/models/user-role.model';
import {RoleService} from '../../../../shared/services/roles.service';

@Component({
  selector: 'app-company-members',
  templateUrl: './company-members.component.html',
  styleUrls: ['./company-members.component.scss']
})
export class CompanyMembersComponent implements OnInit {
  members = [];
  employeeDetailId = '';
  departments: Department[] = [];
  viewDetail = false;
  membersColumns = [
    'fullName',
    'department',
    'team',
    'supervisor',
    'view',
  ];
  searchText = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  employeeNameFilter = '';
  departmentIdFilter = null;
  role = null;
  roles: UserRoleModel[] = [];

  constructor(
    private modalService: NgbModal,
    private memberService: MembersService,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private roleService: RoleService
  ) {
    this.searchTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      model => {
        this.searchText = model;
        this.updateList();
      }
    );
  }

  ngOnInit() {
    this.updateList();
    this.getDepartments();
    this.addEventForSearch();

    this.role = this.authService.getUserRole();
    this.roleService.getRoles().subscribe((roles: UserRoleModel[]) => {
      this.roles = roles;
    });
  }

  addEventForSearch = () => {
    const input = document.getElementById('employee-name');

    input.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        this.filter();
      }
    });
  }

  openInviteMembersModal() {
    const modalRef = this.modalService.open(InviteMembersComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.roles = this.roles;
  }

  openFilterModal() {
    this.modalService.open(MemberFilterDialogComponent, {centered: true}).result.then((result) => {
    }, (reason) => {
      if (reason) {
        const filterParams = {
          ...reason,
          search: this.searchText,
        };
        this.getMembers(filterParams);
      }
    });
  }

  getMembers(filterParams) {
    this.companyService.getEmployeeDirectory(filterParams).subscribe(
      res => {
        // @ts-ignore
        this.members = res;
      }
    );
  }

  updateList() {
    const filterParams = {
      search: this.searchText,
    };
    this.getMembers(filterParams);
  }

  onMemberDelete(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'}
    );
    modalRef.componentInstance.body = 'Are you sure you want to delete this member?';
    modalRef.componentInstance.title = 'You are about to delete';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Delete';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.memberService.memberDelete(id).subscribe(
          res => {
            this.updateList();
          }
        );
      }
    });
  }

  onSearchTextUpdate(value: any) {
    this.searchTextChanged.next(value);
  }

  getDepartments = () => this.departmentService.getDepartments().subscribe(departments => this.departments = departments);

  filter = (): void => {
    const filterParams = {
      search: this.employeeNameFilter,
      filter_department_id: this.departmentIdFilter,
    };

    this.getMembers(filterParams);
  }


  sort = ({orderKey, orderDir}): void => this.members = orderBy(this.members, [orderKey], [orderDir]);

  getMemberFormattedDate = (member, attribute, key): string => {
    if (member[attribute] && member[attribute][key]) {
      return moment(member[attribute][key]).format('MMMM DD, GGGG');
    }
    return '-';
  }

  getPersonalAddress = (member): string => {
    const profile = member.profile;
    if (profile && profile.city) {
      if (profile.country) {
        return profile.city + ', ' + profile.country;
      }

      return profile.city;
    }

    return '-';
  }

  viewEmployeeDetails(employeeId) {
    if (this.employeeDetailId === employeeId) {
      this.viewDetail = !this.viewDetail;
    } else {
      this.employeeDetailId = employeeId;
      this.viewDetail = true;
    }
  }
}
