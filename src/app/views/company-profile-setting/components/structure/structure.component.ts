import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddLocationComponent} from '../add-location/add-location.component';
import {AddDivisionComponent} from '../add-division/add-division.component';
import {AddDepartmentComponent} from '../add-department/add-department.component';
import {FormControl, FormGroup} from '@angular/forms';
import {MembersService} from '../../services/members.service';
import {LeadershipService} from '../../services/leadership.service';
import {DepartmentService} from '../../services/department.service';
import {DivisionService} from '../../services/division.service';
import {TeamService} from '../../services/team.service';
import {Leadership} from 'src/app/shared/models/leadership.models';
import {Division} from 'src/app/shared/models/division.model';
import {Department} from 'src/app/shared/models/department.model';
import {DepartmentLeader} from 'src/app/shared/models/departmentLeader.model';
import {TeamLeader} from 'src/app/shared/models/teamLeader.model';
import {Team} from 'src/app/shared/models/team.model';
import {TeamMember} from 'src/app/shared/models/teamMember.model';
import {UserModel} from '../../../../shared/models/user.model';
import {UserCardComponent} from 'src/app/shared/components/user-card/user-card.component';
import {Assistant} from 'src/app/shared/models/assistant.models';
import {CompanyService} from '../../../company/services/company.service';
import {fromEvent, Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ConfirmationDeleteDialogComponent} from 'src/app/shared/components/confirmation-delete-dialog/confirmation-delete-dialog.component';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit, OnDestroy {
  userList: UserModel[] = [];
  employees = [];
  employeeSearchText: string = null;
  selectedUserList: UserModel[] = [];
  private draggedEmployee = null;
  public shouldShowUserList = false;
  public containerHeight = 0;
  leadershipList = [];

  private pSelectedLeadership: Leadership;
  updateUser = false;
  leadertoUpdate: any;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  employeeSearchTextChanged: Subject<string> = new Subject<string>();
  draggedFrom = null;
  draggedFromLeadershipId = null;
  draggedFromLeadershipUserId = null;
  draggedFromDepartmentId = null;
  draggedFromDepartmentUserId = null;
  draggedFromTeamId = null;
  draggedFromTeamLeaderId = null;
  draggedFromMemberId = null;
  isDepartmentListingOpened = false;
  isTeamLeaderOpened = false;
  isTeamMemberOpened = false;
  isDepartmentLeaderBeingUpdated = false;
  isTeamLeaderBeingUpdated = false;

  get selectedLeadership() {
    return this.pSelectedLeadership;
  }

  set selectedLeadership(l: Leadership) {
    const lid1 = this.pSelectedLeadership ? this.pSelectedLeadership.id : null;
    const lid2 = l ? l.id : null;
    if (lid1 !== lid2 || !lid2) {
      this.departmentLeaderList = [];
      this.teamAndTeamLeaderList = [];
      this.teamMemberList = [];
    }
    if (!l) {
      this.leadershipY = undefined;
    }
    this.pSelectedLeadership = l;
  }

  leadershipY: number;


  // DIVISION
  divisionList: Division[] = [];

  pSelectedDivision: Division;

  get selectedDivision() {
    return this.pSelectedDivision;
  }

  set selectedDivision(l: Division) {
    const lid1 = this.pSelectedDivision ? this.pSelectedDivision.id : null;
    const lid2 = l ? l.id : null;
    if (lid1 !== lid2 || !lid2) {
      this.teamAndTeamLeaderList = [];
      this.teamMemberList = [];
    }
    if (!l) {
      this.divisionY = undefined;
    }
    this.pSelectedDivision = l;
  }

  divisionY: number;


  // DEPARTMENT
  departmentList: Department[] = [];

  departmentLeaderList: DepartmentLeader[] = [];

  private pSelectedDepartmentLeader: DepartmentLeader;

  get selectedDepartmentLeader() {
    return this.pSelectedDepartmentLeader;
  }

  set selectedDepartmentLeader(l: DepartmentLeader) {
    const lid1 = this.pSelectedDepartmentLeader ? this.pSelectedDepartmentLeader.id : null;
    const lid2 = l ? l.id : null;
    if (lid1 !== lid2 || !lid2) {
      this.teamAndTeamLeaderList = [];
      this.teamMemberList = [];
    }
    if (!l) {
      this.departmentY = undefined;
    }
    this.pSelectedDepartmentLeader = l;
  }

  departmentY: number;


  // TEAMS
  teamAndTeamLeaderList: { team: Team, teamLeaders: TeamLeader[] }[];
  private pSelectedTeamLeader: TeamLeader;

  get selectedTeamLeader(): TeamLeader {
    return this.pSelectedTeamLeader;
  }

  set selectedTeamLeader(l: TeamLeader) {
    const lid1 = this.pSelectedTeamLeader ? this.pSelectedTeamLeader.id : null;
    const lid2 = l ? l.id : null;
    if (lid1 !== lid2 || !lid2) {
      // this.teamAndTeamLeaderList = [];
      this.teamMemberList = [];
    }
    if (!l) {
      this.teamY = undefined;
    }

    this.pSelectedTeamLeader = l;
  }


  teamY: number;
  teamLeaderList: any[] = []; // TODO: delete this after structure is complete.

  selectedNewUserCard: UserCardComponent;

  teamMemberList: TeamMember[];

  teamList: any;

  leadershipForm = new FormGroup({
    order: new FormControl(''),
    leader: new FormControl(''),
    previous_type: new FormControl(''),
  });

  assistantForm = new FormGroup({
    leader: new FormControl(''),
    assistant: new FormControl(''),
    previous_type: new FormControl(''),
  });

  departmentLeaderForm = new FormGroup({
    leadership: new FormControl(''),
    department: new FormControl(''),
    user: new FormControl(''),
    previous_type: new FormControl(''),
  });

  teamForm = new FormGroup({
    teamName: new FormControl(''),
    departmentLeader: new FormControl(''),
    previous_type: new FormControl(''),
  });

  teamLeaderForm = new FormGroup({
    teamLeader: new FormControl(''),
    team: new FormControl(''),
    previous_type: new FormControl(''),
  });

  teamMemberForm = new FormGroup({
    teamMember: new FormControl(''),
    teamLeader: new FormControl(''),
    previous_type: new FormControl(''),
  });


  newUserCardTo: string;
  newUserCardDepartment: Department;
  newUserCardTeam: Team;
  newUserCardTeamLeader: TeamLeader;
  newUserCardAssistantLeader: Leadership;

  // @ViewChild('leadershipColumn', {static: true}) leadershipColumn;


  constructor(
    private modalService: NgbModal,
    private userService: MembersService,
    private leadershipService: LeadershipService,
    private departmentService: DepartmentService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.updateContainerheight();
    });
    this.updateContainerheight();
    this.getUsers();
    this.getLeadership();
    this.getDivisions();
    this.getDepartments();
    // this.getDepartmentDivisonLeader();
    this.getTeam();
    // this.getTeamLeader(); // TODO: delete this.
    // this.userService.

    this.employeeSearchTextChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.listEmployees({search: this.employeeSearchText}));
  }

  openAddLocation() {
    const modalRef = this.modalService.open(AddLocationComponent, {size: 'sm', centered: true});
  }

  openDivisonModal() {
    const modalRef = this.modalService.open(AddDivisionComponent, {size: 'sm', centered: true});
  }

  openDepartmentModal() {
    const modalRef = this.modalService.open(AddDepartmentComponent, {size: 'lg', centered: true});
  }

  getUsers() {
    this.userService.membersList({unassigned: 'True'}).subscribe(
      res => {
        this.userList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getLeadership() {
    this.leadershipService.getLeadership().subscribe(
      (res: Leadership[]) => {
        this.leadershipList = res;
        if (this.newUserCardTo === 'leadership') {
          this.selectedUserList = this.leadershipList.map((leadership: Leadership) => leadership.leader);
        } else if (this.newUserCardTo === 'leadershipAssistant') {
          this.selectedUserList = this.leadershipList.find(l => {
            return l.id === this.newUserCardAssistantLeader.id;
          }).assistants.map((a: Assistant) => a.user);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (res: Department[]) => {
        this.departmentList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getDivisions() {
    this.divisionService.getDivisions().subscribe(
      res => {
        this.divisionList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getDepartmentDivisonLeader() {
    if (this.selectedLeadership) {
      this.departmentService.getDepartmentLeader({
        leadershipId: this.selectedLeadership.id
      }).subscribe(
        (res: DepartmentLeader[]) => {
          this.departmentLeaderList = res;
          if (this.newUserCardTo === 'department' && this.selectedDepartmentLeader) {
            this.selectedUserList = this.departmentLeaderList
              .filter((departmentLeader: DepartmentLeader) =>
                departmentLeader.department.id === this.selectedDepartmentLeader.department.id)
              .map((departmentLeader: DepartmentLeader) => departmentLeader.user);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getTeam() {
    const queryParams = {};
    this.teamService.getTeam(queryParams).subscribe(
      res => {
        this.teamList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getTeamAndTeamLeaders() {
    if (this.selectedDepartmentLeader) {
      this.teamService.getTeamAndLeaders({
        departmentLeader: this.selectedDepartmentLeader.id
      }).subscribe(
        (res: { team: Team, teamLeaders: TeamLeader[] }[]) => {
          this.teamAndTeamLeaderList = res;
          if (this.newUserCardTo === 'team') {
            const teamAndTeamLead = res.find((teamAndTeamLeads) => {
              return teamAndTeamLeads.team.id === this.newUserCardTeam.id;
            });

            if (teamAndTeamLead) {
              this.teamLeaderList = teamAndTeamLead.teamLeaders;
              this.selectedUserList = teamAndTeamLead.teamLeaders.map((teamLeader) => {
                return teamLeader.user;
              });
            } else {
              this.teamLeaderList = [];
              this.selectedUserList = [];
            }

            // this.selectedUserList = data.teamLeaders.map(teamLeader => teamLeader.user);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  leaderSubmit() {
    // for now update case is not required. so, we have passed the false as condition
    if (this.updateUser) {
      const data = {
        leader: this.leadershipForm.get('leader').value
      };
      this.leadershipService.updateLeadership(this.leadertoUpdate, data).subscribe(
        res => {
          this.getLeadership();
          this.getUsers();
          this.updateLeader();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.leadershipService.addLeadership(this.leadershipForm.value).subscribe(
        res => {
          this.getLeadership();
          this.getUsers();
          this.draggedFrom = null;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  leadershipDelete(leaderId) {
    this.leadershipService.deleteLeadership(leaderId).subscribe(
      res => {
        this.getLeadership();
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  assistantSubmit() {
    this.leadershipService.addAssistant(this.assistantForm.value).subscribe(
      res => {
        this.getLeadership();
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  assistantDelete(id: number) {
    this.leadershipService.deleteAssistant(id).subscribe(
      res => {
        this.getLeadership();
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  departmentLeaderSubmit() {
    // for now update case is not required. so, we have passed the false as condition
    if (this.updateUser && this.isDepartmentLeaderBeingUpdated) {
      const data = {
        user: this.departmentLeaderForm.get('user').value
      };
      this.departmentService.updateDepartmentLeader(this.leadertoUpdate, data).subscribe(
        res => {
          this.getDepartmentDivisonLeader();
          this.getUsers();
          this.updateLeader();
          this.isDepartmentLeaderBeingUpdated = false;
          // this.selectedDepartmentLeader = null;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.departmentService.addDepartmentLeader(this.departmentLeaderForm.value).subscribe(
        res => {
          this.getDepartmentDivisonLeader();
          this.getUsers();
          this.draggedFrom = null;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  departmentLeaderDelete(leaderId) {
    this.departmentService.deleteDepartmentLeader(leaderId).subscribe(
      res => {
        this.getDepartmentDivisonLeader();
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  teamSubmit() {
    this.teamService.addTeam(this.teamForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  setDepartmentLeaderUpdate = (event) => this.isDepartmentLeaderBeingUpdated = event.update;

  setTeamLeaderUpdate = (event) => this.isTeamLeaderBeingUpdated = event.update;

  teamLeaderSubmit() {
    if (this.isTeamLeaderBeingUpdated && this.updateUser) {
      const data = {
        teamLeader: this.teamLeaderForm.get('teamLeader').value
      };
      this.teamService.updateTeamLeader(this.leadertoUpdate, data).subscribe(
        res => {
          // this.selectedTeamLeader = null;
          this.getTeamAndTeamLeaders();
          this.getUsers();
          this.draggedFrom = null;
          this.updateLeader();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.teamService.addTeamLeader(this.teamLeaderForm.value).subscribe(
        res => {
          this.getTeamAndTeamLeaders();
          this.getUsers();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  teamLeaderDelete(id: number) {
    this.teamService.deleteTeamLeader(id).subscribe(
      res => {
        this.getTeamAndTeamLeaders();
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  teamMemberSubmit() {
    this.teamService.addTeamMember(this.teamMemberForm.value).subscribe(
      res => {
        this.getTeamMembers();
        this.getUsers();
        this.draggedFrom = null;
      },
      err => {
        console.log(err);
      }
    );
  }

  teamMemberDelete(id: number) {
    this.teamService.deleteTeamMember(id).subscribe(
      res => {
        this.getTeamMembers();
        this.getUsers();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


  // getTeamLeader() {
  //   this.teamService.getTeamLeader({}).subscribe(
  //     res => {
  //       this.teamLeaderList = res;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  getTeamMembers() {
    if (this.selectedTeamLeader) {
      this.teamService.getTeamMembers({
        teamLeader: this.selectedTeamLeader.id
      }).subscribe((res: TeamMember[]) => {
        this.teamMemberList = res;
        if (this.newUserCardTo === 'member') {
          this.selectedUserList = res.map(teamMember => teamMember.user);
        }
      });
    }
  }

  // // Receives a member/user object via @Output emitter from employee list component.
  // // This function is where the user is added to the selected member array when the system admin clicks on the user from the entire list
  // // and the user is added to the entire list when the selected member's user is clicked.
  // employeeUserToggle(user: UserModel) {
  //   // The selectedUserList contains all the selected users from the total member/user list.
  //   const selectedUserList = this.selectedUserList;
  //   if (selectedUserList.length) {
  //     let foundIndex = -1;
  //     // Using 'some' loop we can break the loop iteration so that the list wont add multiple user objects.
  //     selectedUserList.some((item, index) => {
  //       // If the received user object and the loop's user's object ID's are the same, i.e if the selectedUserList contains an user object,
  //       // where the ID's are the same the foundIndex is set to the iterated items index and the iterator breaks once true is returned.
  //       if (item.id === user.id) {
  //         foundIndex = index;
  //         return true;
  //       }
  //       return false;
  //     });
  //     // // Once the foundIndex is set, the found index is always greater than -1, thus the foundIndex is used to splice the selectedUserList
  //     // // array's object. If not the user object is added to the selectedUserList array.
  //     // // This enables the user add remove functionality from the selectedUserList array if the cases are met accordingly.
  //     // if (foundIndex !== -1) {
  //     //   selectedUserList.splice(foundIndex, 1);
  //     // } else {
  //     //   selectedUserList.push(user);
  //     // }

  //     console.log(user);
  //     // console.log(this.selected)
  //   } else {
  //     // selectedUserList.push(user);

  //     console.log(user);

  //   }
  //   // Here the constant selectedUserList is spread and is initialized as a new array so that,
  //   // a new array is set every time this function runs and triggers change detection.
  //   // So when the selectedUserList is set to the main this.selectedUserList,
  //   // The input decorator in the employee list component is triggered
  //   // which then triggers the call of the list updateFunction that sorts and updated both the arrays.
  //   this.selectedUserList = [...selectedUserList];
  // }

  addUser(user: UserModel) {
    // @ts-ignore
    const userId = user.leader ? user.leader.id : user.id;
    switch (this.newUserCardTo) {
      case 'leadership':
        if (this.draggedFrom === 'leadership') {
          this.toastrService.error('Drag and drop is not allowed on the same Organization Unit', 'Not Allowed!');
          break;
        }
        this.leadershipForm.patchValue({
          order: 1,
          leader: user.id,
          previous_type: this.draggedFrom
        });
        this.leaderSubmit();
        break;
      case 'department':
        // if (this.draggedFromDepartmentId === this.newUserCardDepartment.id) {
        //   this.toastrService.error('Drag and drop is not allowed on the same Organization Unit', 'Not Allowed!');
        //   break;
        // }
        this.departmentLeaderForm.patchValue({
          leadership: this.selectedLeadership.id,
          department: this.newUserCardDepartment.id,
          user: userId,
          previous_type: this.draggedFrom
        });
        this.departmentLeaderSubmit();
        break;
      case 'team':
        if (this.draggedFromTeamLeaderId === this.newUserCardTeam.id) {
          this.toastrService.error('Drag and drop is not allowed on the same Organization Unit', 'Not Allowed!');
          break;
        }
        this.teamLeaderForm.patchValue({
          teamLeader: userId,
          team: this.newUserCardTeam.id,
          previous_type: this.draggedFrom
        });
        this.teamLeaderSubmit();
        break;
      case 'member':
        if (this.draggedFrom === 'team-member') {
          this.toastrService.error('Drag and drop is not allowed on the same Organization Unit', 'Not Allowed!');
          break;
        }
        this.teamMemberForm.patchValue({
          teamLeader: this.newUserCardTeamLeader.id,
          teamMember: userId,
          previous_type: this.draggedFrom
        });
        this.teamMemberSubmit();
        break;
      case 'leadershipAssistant':
        this.assistantForm.patchValue({
          leader: this.newUserCardAssistantLeader.id,
          assistant: user.id,
          previous_type: this.draggedFrom
        });
        this.assistantSubmit();
        break;
      default:
        console.log('do nothing');
    }
  }

  removeUser(user: UserModel) {
    switch (this.newUserCardTo) {
      case 'leadership':
        const leadership = this.leadershipList.find(l => {
          this.selectedLeadership = null;
          return l.leader.id === user.id;
        });
        this.leadershipDelete(leadership.id);
        break;
      case 'department':
        const departmentLeader = this.departmentLeaderList.find(d => {
          // this.selectedDepartmentLeader = null;
          return d.user.id === user.id;
        });
        this.departmentLeaderDelete(departmentLeader.id);
        break;
      case 'team':
        const teamLeader = this.teamLeaderList.find(t => {
          this.selectedTeamLeader = null;
          return t.user.id === user.id;
        });
        this.teamLeaderDelete(teamLeader.id);
        console.log(teamLeader);
        break;
      case 'member':
        const teamMember = this.teamMemberList.find(m => m.user.id === user.id);
        this.teamMemberDelete(teamMember.id);
        break;
      case 'leadershipAssistant':
        const assistant = this.newUserCardAssistantLeader.assistants.find(a => a.user.id === user.id);
        this.assistantDelete(assistant.id);
        break;
      default:
        console.log('do nothing');
    }
  }

  updateLeader(event = null) { // sets the update flag in case of update
    if (event) {
      this.updateUser = true;
      this.leadertoUpdate = event; // id for leader used for user update
    } else {
      this.updateUser = false;
    }
  }

  onLeadershipSelected(leadership: Leadership) {
    this.selectedDepartmentLeader = undefined;
    this.departmentY = undefined;
    this.selectedTeamLeader = undefined;
    this.teamY = undefined;
    this.selectedLeadership = leadership;
    this.getDepartmentDivisonLeader();
  }

  onDivisionSelected(division: Division) {
    this.selectedDepartmentLeader = undefined;
    this.departmentY = undefined;
    this.selectedDivision = division;
    this.getDepartmentDivisonLeader();
  }

  onDepartmentLeaderSelected(departmentLeader: DepartmentLeader) {
    this.selectedTeamLeader = undefined;
    this.teamY = undefined;
    this.selectedDepartmentLeader = departmentLeader;
    this.getTeamAndTeamLeaders();
  }

  onTeamLeaderSelected(teamLeader: TeamLeader) {
    this.teamMemberList = [];
    this.selectedTeamLeader = teamLeader;
    this.getTeamMembers();
  }


  onLeadershipY(y: number) {
    this.leadershipY = y;
  }

  onDivisionY(y: number) {
    this.divisionY = y;
  }

  onDepartmentY(y: number) {
    this.departmentY = y;
  }

  onTeamY(y: number) {
    this.teamY = y;
  }

  openEmployeeListSearchBox = (el) => {
    if (el) {
      this.shouldShowUserList = true;
      this.listEmployees({});
    }
  };

  toggleSearchEmployeeBox = () => {
    this.shouldShowUserList = !this.shouldShowUserList;
    if (this.shouldShowUserList) {
      this.listEmployees({});
    }
  };

  onAddLeadershipUser({el, leadership, dropped}) {
    this.isDepartmentListingOpened = true;
    this.selectedNewUserCard = el;
    if (!leadership) {
      this.selectedLeadership = undefined;
      // this.leadershipY = null;
    }
    this.newUserCardTo = 'leadership';
    this.selectedUserList = this.leadershipList.map((l: Leadership) => l.leader);
    if (dropped) {
      this.employeeDragged();
    }
  }

  onAddLeadershipAssistant({el, leadership}) {
    this.selectedNewUserCard = el;
    // if (!leadership) {
    //   this.selectedLeadership = undefined;
    //   // this.leadershipY = null;
    // }
    this.selectedUserList = this.leadershipList.find(l => {
      return l.id === leadership.id;
    }).assistants.map((a: Assistant) => a.user);
    this.newUserCardTo = 'leadershipAssistant';
    this.newUserCardAssistantLeader = leadership;
  }


  onAddDepartmentLeader(data: { department: Department, el: UserCardComponent, dropped: false }) {
    this.isTeamLeaderOpened = true;
    this.selectedNewUserCard = data.el;
    this.selectedUserList = this.departmentLeaderList
      .filter((departmentLeader: DepartmentLeader) => departmentLeader.department.id === data.department.id)
      .map((departmentLeader: DepartmentLeader) => departmentLeader.user);

    this.newUserCardTo = 'department';
    this.newUserCardDepartment = data.department;
    if (data.dropped) {
      this.employeeDragged();
    }
  }


  onAddTeamLeader(data: { team: Team, teamLeaders: TeamLeader[], el: UserCardComponent, dropped: false }) {
    this.isTeamMemberOpened = true;
    this.selectedNewUserCard = data.el;
    this.selectedUserList = data.teamLeaders.map(teamLeader => teamLeader.user);
    this.teamLeaderList = data.teamLeaders;

    this.newUserCardTo = 'team';
    this.newUserCardTeam = data.team;
    if (data.dropped) {
      this.employeeDragged();
    }
  }

  onAddMember(el: UserCardComponent, dropped = false) {
    this.selectedNewUserCard = el;
    this.selectedUserList = this.teamMemberList.map(teamMember => teamMember.user);
    this.newUserCardTo = 'member';
    this.newUserCardTeamLeader = this.selectedTeamLeader;
    if (dropped) {
      this.employeeDragged();
    }
  }

  listEmployees(filterParams) {
    this.shouldShowUserList = true;
    return this.companyService.getUnAssignedEmployees(filterParams).subscribe(
      res => {
        // @ts-ignore
        this.employees = res;
      }
    );
  }

  filterEmployee = () => {
    this.employeeSearchTextChanged.next(this.employeeSearchText);
    this.shouldShowUserList = true;
  };

  employeeDragged = () => {
    this.shouldShowUserList = false;
    this.organizationChartHovered({}, true);
    this.addUser(this.draggedEmployee);
  };

  dragStarted = (employee) => {
    this.draggedEmployee = employee;
  };

  updateContainerheight = () => {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const pageStructureTopHeightEl = document.getElementsByClassName('page-structure')[0];
    let pageStructureTopHeight = 150;
    if (!!pageStructureTopHeightEl) {
      pageStructureTopHeight = pageStructureTopHeightEl.getBoundingClientRect().top;
    }
    this.containerHeight = windowHeight - pageStructureTopHeight - 5;
  };

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  onOrgUnitAllMemberDeleteEvent(data) {
    if (data.type === 'team-member') {
      data.id = this.selectedTeamLeader.id;
    }
    if (data.type === 'department') {
      data.user_id = this.selectedLeadership.id;
    }
    const modalRef = this.modalService.open(ConfirmationDeleteDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'});
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.body = 'Do you want to delete? This action cannot be undone';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        if (data.type === 'department') {
          this.deleteDepartmentAssociatedMember(data.id, data.user_id);
          this.isTeamMemberOpened = false;
          this.isTeamLeaderOpened = false;
        }
        if (data.type === 'team-leader') {
          this.deleteTeamAssociatedMembers(data.id);
          this.isTeamMemberOpened = false;
        }
        if (data.type === 'team-member') {
          this.deleteMemberData(data.id);
        }
      }
    });
  }

  deleteTeamAssociatedMembers(teamId) {
    return this.teamService.deleteTeamAssociatedMembers(teamId).subscribe(
      res => {
        this.toastrService.success('Team data deleted successfully.', 'Success!');
        this.getTeamAndTeamLeaders();
        this.getUsers();
      }, error => {
        this.toastrService.error('Unable to delete team data.', 'Error!');
      }
    );
  }

  deleteDepartmentAssociatedMember(departmentId, userId) {
    return this.departmentService.deleteDepartmentAssociatedMember(departmentId, userId).subscribe(
      res => {
        this.toastrService.success('Department data deleted successfully.', 'Success!');
        this.getDepartments();
        this.getDepartmentDivisonLeader();
        this.getUsers();
        this.pSelectedDepartmentLeader = null;
      }, error => {
        this.toastrService.error('Unable to update Department data.', 'Error!');
      }
    );
  }

  deleteMemberData(teamLeaderId) {
    return this.teamService.deleteAllMembersOfTeamLeader(teamLeaderId).subscribe(
      res => {
        this.toastrService.success('Team Member data deleted successfully.', 'Success!');
        this.getTeamMembers();
        this.getUsers();
      }, error => {
        this.toastrService.error('Unable to update Team Member data.', 'Error!');
      }
    );
  }

  onCardMemberDeleteBtnClick(data) {
    const modalRef = this.modalService.open(ConfirmationDeleteDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'});
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.body = 'Do you want to delete? This action cannot be undone';
    modalRef.componentInstance.type = 'primary';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.removeUserAssociationWithOtherOrganizationUnit(data.id, data.type);
        this.isDepartmentListingOpened = false;
      }
    });
  }

  removeUserAssociationWithOtherOrganizationUnit(userId, type) {
    return this.teamService.removeUserAssociationWithOtherOrganizationUnit(userId, type).subscribe(
      res => {
        this.toastrService.success('The User has been removed successfully', 'Success!');
        this.refreshData(type);
      }, error => {
        this.toastrService.error('The User has could not be  removed.', 'Error!');
      }
    );
  }

  onPersonCardMoveStartEvent(eventData) {
    const data = eventData.employee;
    this.draggedFrom = eventData.from;

    switch (this.draggedFrom) {
      case 'leadership':
        this.draggedEmployee = data;
        break;
      case 'department':
        this.draggedEmployee = data.user;
        this.draggedFromDepartmentId = data.department.id;
        this.draggedFromLeadershipId = data.leadership.id;
        break;
      case 'team-leader':
        this.draggedEmployee = data.user;
        this.draggedFromTeamId = data.id;
        this.draggedFromTeamLeaderId = data.team.id;
        break;
      case 'team-member':
        this.draggedEmployee = data.user;
        this.draggedFromTeamLeaderId = data.teamLeaderId.id;
        this.draggedFromMemberId = data.id;

    }
  }

  onPersonCardMoveEndEvent(ev) {
    this.refreshData(this.draggedFrom);
    this.draggedEmployee = null;
    this.draggedFrom = null;
    this.draggedFromLeadershipId = null;
    this.draggedFromLeadershipUserId = null;
    this.draggedFromDepartmentId = null;
    this.draggedFromDepartmentUserId = null;
    this.draggedFromTeamId = null;
    this.draggedFromTeamLeaderId = null;
    this.draggedFromMemberId = null;
  }

  refreshData(type) {
    switch (type) {
      case 'leadership':
        this.getLeadership();
        this.getUsers();
        this.leadershipY = null;
        break;
      case 'department':
        this.getDepartmentDivisonLeader();
        this.getUsers();
        break;
      case 'team-leader':
        this.getTeamAndTeamLeaders();
        this.getUsers();
        break;
      case 'team-member':
        this.getTeamMembers();
        this.getUsers();
    }
  }

  movementUpdates = (event, orgElement, hovered) => {
    event.preventDefault();
    if (!hovered && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    this.organizationChartHovered({orgElement, hovered});
  }

  organizationChartHovered = (event, removeFromAllClass = false) => {
    if (removeFromAllClass) {
      // @ts-ignore
      [...document.getElementsByClassName('move-here-text')].forEach(dynamicOrgElem => dynamicOrgElem.classList.add('d-none'));
      return;
    }

    let dynamicOrgElement = null;
    if (event.entityId) {
      dynamicOrgElement = document.getElementById(`${event.orgElement}-${event.entityId}-move-here-line`);
    } else {
      dynamicOrgElement = document.getElementById(`${event.orgElement}-move-here-line`);
    }
    if (dynamicOrgElement) {
      if (event.hovered) {
        dynamicOrgElement.classList.remove('d-none');
      } else {
        dynamicOrgElement.classList.add('d-none');
      }
    }
  }

  removeDragPreviewElement() {
    const element = document.getElementById('drag-drop-paragraph');
    if (element) {
      element.parentNode.removeChild(element);
    }
  }
}
