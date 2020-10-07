import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MembersService} from '../../services/members.service';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InviteMembersComponent} from '../invite-members/invite-members.component';
import {MemberFilterDialogComponent} from '../../../../shared/components/member-filter-dialog/member-filter-dialog.component';
import {UserModel} from '../../../../shared/models/user.model';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ProfileModalComponent} from '../../../../shared/components/profile-modal/profile-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  private pMemberList: UserModel[] = [];
  private pSelectedMemberList: UserModel[] = [];
  @ViewChild('profileModal', {static: false}) profileModal: TemplateRef<any>;

  filteredMemberList: {
    firstLetter: string,
    users: UserModel[]
  }[] = [];

  // Here the memberList Input function receives all users array from the parent component and the array is set to a variable and the
  // updateList function is triggered.
  @Input()
  set memberList(list: UserModel[]) {
    this.pMemberList = list.filter(user => {
      return user.id !== undefined;
    });
    this.updateList();
  }

  get memberList() {
    return this.pMemberList;
  }

  // Here the selectedMemberList Input function receives a selected users array from the parent component and the array is set to a variable
  // and the updateList function is triggered.
  @Input()
  set selectedMemberList(s: UserModel[]) {
    this.pSelectedMemberList = s.filter(user => {
      return user.id !== undefined;
    });
    this.updateList();
  }

  get selectedMemberList(): UserModel[] {
    return this.pSelectedMemberList;
  }

  // @Output() toggledUser = new EventEmitter<UserModel>();
  @Output() userAdded = new EventEmitter<UserModel>();
  @Output() userRemoved = new EventEmitter<UserModel>();
  searchTextChanged: Subject<string> = new Subject<string>();
  searchText = '';

  private filterOptions = {
    // department: '',
    jobTitle: '',
    fromDate: undefined,
    toDate: undefined
  };


  constructor(private employeeList: MembersService,
              private modalService: NgbModal,
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
  }

  onSearchTextUpdate(value: string) {
    this.searchTextChanged.next(value);
  }

  openInviteMembersModal() {
    this.modalService.open(InviteMembersComponent, {size: 'lg', centered: true});
  }

  openFilterModal() {
    this.modalService.open(MemberFilterDialogComponent, {centered: true}).result.then(
      (result) => {
        if (result) {
          this.filterOptions = result;
          this.updateList();
        }

      }, (result2) => {
        this.filterOptions = result2;
        this.updateList();
      });
  }

  // This function is triggered when the memberList and selectedMemberList functions are triggered on data input event.
  // Enables search functionality as well as sorting and selection placement between the two arrays.
  updateList() {
    // To handle undefined scenarios.
    if (!this.pMemberList) {
      return;
    }
    const filterParams = {
      ...this.filterOptions,
      search: this.searchText,
    };

    // false if no match in this.selectedMemberList else True
    const findSelectedMember = (member: UserModel) => this.selectedMemberList.some((m) => m.id === member.id);

    const findJobTitle = (key: string, jobTitle: string) => jobTitle === key;

    const findAcceptedDate = (fromDate: Date, toDate: Date, acceptedDate: Date) => fromDate < acceptedDate && acceptedDate < toDate;

    const findSearch = (key: string, name: string) => name.includes(key);

    const filteredList = this.pMemberList.filter((member: UserModel) => {
      if (findSelectedMember(member)) {
        return false;
      }

      let foundFilter = false;
      let hasFilterOptions = false;

      if (filterParams.jobTitle) {
        foundFilter = findJobTitle(filterParams.jobTitle, member.profile ? member.profile.jobTitle : '');
        if (foundFilter && filterParams.fromDate && filterParams.toDate) {
          foundFilter = foundFilter && findAcceptedDate(
            filterParams.fromDate, filterParams.toDate, new Date(member.createdAt)
          );
        }
        hasFilterOptions = true;
      } else {
        if (filterParams.fromDate && filterParams.toDate) {
          foundFilter = findAcceptedDate(filterParams.fromDate, filterParams.toDate, new Date(member.createdAt));
          hasFilterOptions = true;
        }
      }

      const foundSearch = findSearch(filterParams.search.toLowerCase(), member.fullName ? member.fullName.toLowerCase() : '');
      return hasFilterOptions ? foundFilter && foundSearch : foundSearch;
    });

    // comparison function receives two arguments and should return 1 if the first argument is greater than the second,
    // -1 if the second argument is greater than the first and 0 if they are equal.
    // This lets us sort the array using Full Name in Ascending order.
    filteredList.sort((m1: UserModel, m2: UserModel) => {
      const t1 = m1.fullName ? m1.fullName.toUpperCase() : '';
      const t2 = m2.fullName ? m2.fullName.toUpperCase() : '';
      return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    });
    this.filteredMemberList = [];
    // The filteredList contains array of unique user objects after search filtering.
    filteredList.forEach(user => {
      let last;
      // Getting the last object of the filteredMemberList array.
      if (this.filteredMemberList.length) {
        last = this.filteredMemberList[this.filteredMemberList.length - 1];
      }
      // Checking if the user object's fullName's first character is the same as the last array's firstLetter
      // If its the same the user is pushed to that array object which results in grouping the users according to their names.
      // For e.g: {firstLetter: "A", users: {id: 7, email: "admin@admin4.com", fullName: "Admin"}
      if (last && last.firstLetter === (user.hasOwnProperty('fullName') &&
        (user.fullName.length !== 0)) ? user.fullName[0].toUpperCase() : '') {
        last.users.push(user);
        // If the name and the character is not matched a new array object is created with the initial alphabet of the user as firstLetter
        // and the user object is places under the specific array.
      } else {
        this.filteredMemberList.push({
          firstLetter: (user.hasOwnProperty('fullName') && (user.fullName.length !== 0)) ? user.fullName[0].toUpperCase() : '',
          users: [user]
        });
      }
      // This code block ensures that the names are sorted according to their Initials.
    });
  }

  // Receives a member object after the member list div is clicked in the view.
  addUser(member: UserModel) {
    // The member object is sent to the structure component using a @Output emitter.
    this.userAdded.emit(member);
  }

  removeUser(member: UserModel) {
    // The member object is sent to the structure component using a @Output emitter.
    this.userRemoved.emit(member);
  }

  openUserModal(member: UserModel) {
    const modalRef = this.modalService.open(ProfileModalComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.member = member;
    modalRef.result.then((result: UserModel) => {
      this.pMemberList = this.pMemberList.map((user) => {
        if (user.id === result.id) {
          return result;
        }
        return user;
      });

      this.pSelectedMemberList = this.pSelectedMemberList.map((user) => {
        if (user.id === result.id) {
          return result;
        }
        return user;
      });
      this.updateList();

    }, (result2) => {
    });
  }
}
