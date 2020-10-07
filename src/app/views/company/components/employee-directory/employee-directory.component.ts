import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../company-profile-setting/services/department.service';
import {CompanyService} from '../../services/company.service';
import {InviteMembersComponent} from 'src/app/views/company-profile-setting/components/invite-members/invite-members.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.scss']
})
export class EmployeeDirectoryComponent implements OnInit {
  employeeList: any;
  filterName = '';
  departmentList = [];
  filterDepartmentId = 0;
  sortByList = [
    {
      key: 'location',
      name: 'Location'
    },
    {
      key: 'hiredDate',
      name: 'Hired Date'
    }
  ];
  sortBy = 'location';

  employeeDirectoryColumns = [
    'fullName',
    'department',
    'team',
    'supervisor',
    'view'
  ];
  viewDetail = false;
  employeeDetailId = '';
  filterText = '';
  searchTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private modalService: NgbModal
  ) {
    this.searchTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(model => {
        this.filterText = model;
        this.filterEmployeeList();
      });
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(
      (response) => this.departmentList = response
    );
    this.getEmployeeList({});
  }

  filterEmployeeList() {
    this.getEmployeeList({
      search: this.filterText,
      filter_department_id: this.filterDepartmentId,
      sort_by: this.sortBy
    });
  }

  getEmployeeList(params) {
    this.companyService.getEmployeeDirectory(params).subscribe(
      (response) => {
        this.employeeList = response;
      });
  }



  onSearchTextUpdate(value: string) {
    this.searchTextChanged.next(value);
  }

  viewEmployeeDetails(employeeId) {
    if (this.employeeDetailId === employeeId) {
      this.viewDetail = !this.viewDetail;
    } else {
      this.employeeDetailId = employeeId;
      this.viewDetail = true;
    }
  }

  openInviteModal() {
    this.modalService.open(InviteMembersComponent, {size: 'lg', centered: true});
  }
}
