import { Component, OnInit, Output, EventEmitter, Input, ElementRef} from '@angular/core';
import { GoalsService } from 'src/app/shared/services/goals.service';
import { PersonalGoalsService } from 'src/app/shared/services/personal-goals.service';
import { DepartmentGoalsService } from 'src/app/shared/services/department-goals.service';
import { LocationStrategy, JsonPipe } from '@angular/common';
import { Department } from 'src/app/shared/models/department.model';
import { Team } from 'src/app/shared/models/team.model';
import { TeamMember } from 'src/app/shared/models/teamMember.model';
import { DepartmentService } from 'src/app/views/company-profile-setting/services/department.service';
import { TeamService } from 'src/app/views/company-profile-setting/services/team.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PdfPrintService } from 'src/app/shared/services/pdf-print.service';
import * as cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserPlanService } from 'src/app/shared/services/user-plan.service';

@Component({
  selector: 'app-plan-preview-layout',
  templateUrl: './plan-preview-layout.component.html',
  styleUrls: ['./plan-preview-layout.component.scss']
})
export class PlanPreviewLayoutComponent implements OnInit {
  @Output() preview = new EventEmitter<boolean>();
  prev = false;
  progress = false;
  draft = true;
  totalGoalData: any = [];
  hideSecondaryDropDown = false;
  previewType = '';
  isAdmin = false;
  @Input() type: string;
  @Input() year: any;
  @Input() quarter: any;
  @Input() id: string;
  @Input() printSectionId: string;
  @Input() viewType: string;
  showBtnBar = false;
  profileData: any = [];
  associatedProfiles: any[] = [];
  goalData: any = [];
  titleText: string;
  goalName = 'Quarterly';
  goalPlan: string;
  ourGoalService: any;
  loading = false;
  departments: Department[];
  teams: Team[];
  personals = [] ;
  selectedDepartment = {
    name: null,
    id: null
  };
  selectedTeam = {
    name: null,
    id: null
  };
  selectedPersonal = {
    name: null,
    id: null
  };
  selectedPlan = {
    year: '',
    quarter: ''
  };

  quarterYearOptions = [];
  constructor( private goalsService: GoalsService, private personalGoalsService: PersonalGoalsService,
               private departmentGoalsService: DepartmentGoalsService,
               private locationStrategy: LocationStrategy,
               private departmentService: DepartmentService,
               private teamService: TeamService,
               public elementRef: ElementRef,
               private modalService: NgbModal,
               private toastrService: ToastrService,
               private pdfPrintService: PdfPrintService,
               private route: ActivatedRoute,
               private profileService: ProfileService,
               private router: Router,
               private authService: AuthService,
               private userPlanService: UserPlanService
               ) { }

  ngOnInit() {
    this.route.data.subscribe(v => {
      if (v.previewType) {
        this.previewType = v.previewType;
      }
      this.type = v.type;

      if (this.type === 'team') {
        this.ourGoalService = this.goalsService;
      } else if (this.type === 'department') {
        this.ourGoalService = this.departmentGoalsService;
      } else if (this.type === 'personal') {
        this.ourGoalService = this.personalGoalsService;
      }

      if (this.viewType === 'preview') {
        this.showBtnBar = true;
        this.preventBackButton();
        this.getAllDataForPlanPreView()
        // this.getParentAssociationDataPreview();
      } else {
        this.draft = false;
        const publishedData = this.ourGoalService.getPublishedData();
        if (publishedData.flag && publishedData.data.length) {
          this.ourGoalService.setPublishedData(false, []);
          this.setDataInDropDownAfterPublish(publishedData.data);
        } else {
          this.getAllDataForPlanView();
          // this.getParentAssociationData();
        }
      }

      if (this.viewType === 'preview') {
        this.ourGoalService.data.subscribe(data => {
          this.setGoalDataPreview(data);
        });
      }
     });

  }

  setProfileDataAfterPublish(data) {
    if ('team' in data[0] && this.type === 'team') {
      this.getTeamDataById(data[0].team.id);
    } else if ('department' in data[0] && this.type === 'department') {
      this.getDepartmentById(data[0].department.id);
    } else if (this.type === 'personal') {
      this.associatedProfiles = [];
      this.associatedProfiles.push(data[0].user);
    }
    this.selectedPlan.year =  data[0].year;
    this.selectedPlan.quarter =  data[0].quarter;
    // this.setGoalData(data);
  }

  setDataInDropDownAfterPublish(data) {
    if ('team' in data[0] && this.type === 'team') {
      this.teams = [];
      this.teams.push(data[0].team);
      this.selectedTeam.id = data[0].team.id;
      this.selectedTeam.name = data[0].team.teamName;
      this.setDataInYearQuarterDropDownAfterPublish(data,  data[0].team.id);
    } else if ('department' in data[0] && this.type === 'department') {
      this.departments = [];
      this.departments.push(data[0].department);
      this.selectedDepartment.id = data[0].department.id;
      this.selectedDepartment.name = data[0].department.name;
      this.setDataInYearQuarterDropDownAfterPublish(data,  data[0].department.id);
    } else if (this.type === 'personal') {
      this.personals = [];
      this.personals.push(data[0].user);
      this.selectedPersonal.id = data[0].user.id;
      this.selectedPersonal.name = data[0].user.fullName;
      this.setDataInYearQuarterDropDownAfterPublish(data,  data[0].user.id);
    }
    this.setProfileDataAfterPublish(data);
  }

  setDataInYearQuarterDropDownAfterPublish(data, id) {
    this.loading = true;
    this.ourGoalService.list({personalType: this.previewType, type: this.type, id}).subscribe( (res: any) => {
      this.loading = false;
      this.setGoalData(res);
      this.quarterYearOptions = uniqBy(res, v => [v.year, v.quarter].join());
      this.selectedPlan.year =  data[0].year;
      this.selectedPlan.quarter =  data[0].quarter;
    });
  }

  setGoalDataPreview(data) {
    data.forEach(elem => {
      if (typeof(elem.data) === 'string') {
        elem.data = JSON.parse(elem.data);
        // elem.data = this.convertToJSON(elem.data);
      }
    });
    this.goalData = data;
  }

  setGoalData(d) {
      if (!d.length) {
        return;
      }
      if (d[0].planStatus === 2) {
        this.draft = false;
      }
      d.forEach(elem => {
        if (typeof(elem.data) === 'string') {
          // elem.data = this.convertToJSON(elem.data);
          elem.data = JSON.parse(elem.data);

        }
      });
      const groupData = groupBy(d, v => [v.year, v.quarter].join());
      this.goalData =  groupData[`${this.selectedPlan.year},${this.selectedPlan.quarter}`];
      if (this.goalData.length > 0) {
        switch (this.type) {
          case 'team':
            this.goalName = this.goalData[0].team ? this.goalData[0].team.teamName : '';
            break;
          case 'department':
            this.goalName = this.goalData[0].department ? this.goalData[0].department.name : '';
            break;
        }
        this.goalPlan = 'Q' + this.goalData[0].quarter + ' ' + this.goalData[0].year;
      }
      this.totalGoalData = d;
  }

  convertToJSON(data) {
    let newJson = data.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    newJson = newJson.replace(/'/g, '"');
    data = JSON.parse(newJson);
    return data;
  }

  backBtn() {
    this.preview.emit(this.prev);
  }

  previewPage() {}


  publish() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true,  windowClass: 'confirmation-modal-size'}
    );
    modalRef.componentInstance.title = 'You are about to publish';
    modalRef.componentInstance.body = 'All members of the company will be able to see this once published';
    modalRef.componentInstance.type = 'warning';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        const goalDataCopy = cloneDeep(this.goalData);
        goalDataCopy.forEach(element => {
          element.planStatus = 2;
          // element.annualPlan = typeof(element.annualPlan) === 'number' ? element.annualPlan : element.annualPlan.id;
        });
        if (this.isAdmin && this.type === 'personal') {
          this.ourGoalService.save(goalDataCopy).subscribe((res) => {
            this.handleResponseAfterPlanPublish(res);
          }, (error) => {
            this.toastrService.error('Error saving the plan');
          });
        } else if (this.isAdmin) {
          let id = '';
          if (this.selectedTeam.id) {
            id = this.selectedTeam.id;
          } else if (this.selectedDepartment.id) {
            id = this.selectedDepartment.id;
          }
          this.ourGoalService.createPlanByCompanyAdmin(goalDataCopy, id).subscribe(res => {
            this.handleResponseAfterPlanPublish(res);
          }, (error) => {
            this.toastrService.error('Error saving the plan');
          });
        } else {
          this.ourGoalService.save(goalDataCopy).subscribe((res) => {
            this.handleResponseAfterPlanPublish(res);
          }, (error) => {
            this.toastrService.error('Error saving the plan');
          });
        }
      }
    });
  }

  handleResponseAfterPlanPublish(data) {
    if (!data.length) {
      this.toastrService.info('No response from server after publishing plan');
      return;
    }
    this.draft = false;
    this.ourGoalService.setData(data);
    this.toastrService.success('This plan has been saved', 'Success');
    if (this.isAdmin) {
      this.ourGoalService.resetYearQuarterDataForCompanyAdmin();
    } else {
      this.ourGoalService.resetYearQuarterData();
    }
    this.ourGoalService.setPublishedData(true, data);
    this.landToPreview();
  }

  landToPreview() {
    if (this.type === 'department') {
      this.router.navigate(['quarterly-goals/department/preview']);
    } else if (this.type === 'team') {
      this.router.navigate(['quarterly-goals/team/preview']);
    } else if (this.type === 'personal') {
      this.router.navigate(['quarterly-goals/personal/preview']);
    }
  }

  saveAsDraft() {
    const goalDataCopy = cloneDeep(this.goalData);

    // this.ourGoalService.save(goalDataCopy).subscribe((res) => {
    //   this.ourGoalService.setData(res);
    //   this.toastrService.success('This plan has been saved', 'Success');
    // });
    if (this.isAdmin && this.type === 'personal') {
      this.ourGoalService.save(goalDataCopy).subscribe((res) => {
        this.ourGoalService.setData(res);
        this.toastrService.success('This plan has been saved', 'Success');
      }, (error) => {
        this.toastrService.error('Error saving the plan');
      });
    } else if (this.isAdmin) {
      let id = '';
      if (this.selectedTeam.id) {
        id = this.selectedTeam.id;
      } else if (this.selectedDepartment.id) {
        id = this.selectedDepartment.id;
      }
      this.ourGoalService.createPlanByCompanyAdmin(goalDataCopy, id).subscribe(res => {
        this.ourGoalService.setData(res);
        this.toastrService.success('This plan has been saved', 'Success');
      }, (error) => {
        this.toastrService.error('Error saving the plan');
      });
    } else {
      this.ourGoalService.save(goalDataCopy).subscribe((res) => {
        this.ourGoalService.setData(res);
        this.toastrService.success('This plan has been saved', 'Success');
      }, (error) => {
        this.toastrService.error('Error saving the plan');
      });
    }
  }

  setYearQuarterOption(year = '', quarter = '') {
    this.selectedPlan.quarter = quarter;
    this.selectedPlan.year = year;
    // this.filterPlans();
    const result = this.totalGoalData.filter(elem => {
      return elem.year === this.selectedPlan.year && elem.quarter === this.selectedPlan.quarter;
    });
    const data = uniqBy(result, v => [v.year, v.quarter].join());
    if (data.length > 0) {
      this.selectedPlan.year = data[0].year;
      this.selectedPlan.quarter = data[0].quarter;
      this.goalData = result;
      this.goalPlan = 'Q' + this.goalData[0].quarter + ' ' + this.goalData[0].year;
    }
  }

  setDepartmentOption(id, name) {
    if (this.viewType === 'preview' && this.draft) {
      this.setDepartmentOptionWhilePreview(id, name);
    } else {
      this.selectedDepartment.name = name;
      this.selectedDepartment.id = id;
      this.getDepartmentById(this.selectedDepartment.id);
      this.selectedPlan.year = '';
      this.selectedPlan.quarter = '';
      this.filterPlans(id, 2);
    }
  }

  setTeamOption(id, name) {
    if (this.viewType === 'preview' && this.draft) {
      this.setTeamOptionWhilePreview(id, name);
    } else {
      this.selectedTeam.name = name;
      this.selectedTeam.id = id;
      this.getTeamDataById(this.selectedTeam.id);
      this.selectedPlan.year = '';
      this.selectedPlan.quarter = '';
      this.filterPlans(id, 2);
    }
  }


  setPersonalOption(id, name) {
    this.selectedPersonal.name = name;
    this.filterPlans(id, 2);
    this.goalName = name ? name : ' ';
    this.setPersonalOptionForCompanyAdmin(id);
  }

  setPersonalOptionForCompanyAdmin(id) {
    this.associatedProfiles = this.personals.filter(elem => elem.id === id);
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }


  onSearch() {
    let searchInput = '';
    switch (this.type) {
      case 'department':
        searchInput = this.elementRef.nativeElement.querySelector('#departmentSearchInput').value;
        this.departments = this.departments.filter(department => department.name.includes(searchInput));
        break;
      case 'team':
        searchInput = this.elementRef.nativeElement.querySelector('#teamSearchInput').value;
        this.teams = this.teams.filter(team => team.name.includes(searchInput));
        break;
      case 'personal':
        searchInput = this.elementRef.nativeElement.querySelector('#personalSearchInput').value;
        this.personals = this.personals.filter(personal => personal.user.fullName.includes(searchInput));
        break;
    }
  }

  filterPlansWhenPreviewForCompanyAdmin(id = '', planStatus, year, quarter) {
    this.loading = true;
    this.ourGoalService.list({personalType: this.previewType, year, quarter, type: this.type, id, planStatus}).subscribe( (res: any) => {
      this.loading = false;
      if (!res.length) {
        // this.quarterYearOptions = [];
        // this.goalData = [];
        // this.goalName = '';
        // this.toastrService.info('There are no plans available');
        return;
      }
      // this.quarterYearOptions = uniqBy(res, v => [v.year, v.quarter].join());
      // if (this.quarterYearOptions.length) {
      //   this.selectedPlan.year = this.quarterYearOptions[0].year;
      //   this.selectedPlan.quarter = this.quarterYearOptions[0].quarter;
      // }
      this.selectedPlan.year = year;
      this.selectedPlan.quarter = quarter;


      this.ourGoalService.setData(res);
      this.setGoalData(res);

    });
  }


  // This sets the plan on the page
  filterPlans(id = '', planStatus) {
    this.loading = true;
    this.ourGoalService.list({personalType: this.previewType, type: this.type, id, planStatus}).subscribe( (res: any) => {
      this.loading = false;
      if (!res.length) {
        this.quarterYearOptions = [];
        this.goalData = [];
        this.goalName = '';
        this.toastrService.info('There are no plans available');
        return;
      }
      this.quarterYearOptions = uniqBy(res, v => [v.year, v.quarter].join());
      if (this.quarterYearOptions.length) {
        this.selectedPlan.year = this.quarterYearOptions[0].year;
        this.selectedPlan.quarter = this.quarterYearOptions[0].quarter;
      }


      this.ourGoalService.setData(res);
      this.setGoalData(res);

    });
  }


  exportToPdf(type: string, id: string) {
    if (this.goalData.length === 0) {
      this.toastrService.info('No plan available to generate PDF');
    }
    switch (type) {
      case 'team':
        type = 'TEAM_PLAN'
        break;
      case 'department':
        type = 'DEPARTMENT_PLAN'
        break;

      case 'personal':
        type = 'PERSONAL_PLAN'
        break;
    }
    const planId = this.goalData[0].id;
    const data = {
      goalData: this.goalData,
      associatedProfiles: this.associatedProfiles,
      goalName: this.goalName
    }
    this.pdfPrintService.getPdfFromData(type, data).subscribe(pdf => {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + pdf;
      link.download = 'REPORT.pdf';
      document.body.appendChild(link);
      link.click();
      return pdf;
    }, error => {
      this.toastrService.error('Error generating pdf', 'Error');
    });
  }

  print = (sectionId: string) => {
    if (!sectionId) {
      this.toastrService.error('Missing element to print', 'Error');
      return;
    }
    this.pdfPrintService.printWindow(sectionId);
  }

  getDepartments() {
    this.departmentService.listDepartments({planStatus: 2}).subscribe(res => {
      this.departments = res;
      this.selectedDepartment = res[0];
      this.filterPlans(this.departments[0].id.toString(), 2);
      if (this.departments.length  === 0) {
        this.toastrService.info('There are no departments with published plan');
      }
    });
  }

  getDepartmentLeadersUnderDepartment(departmentId, departmentName) {
     // Set default department
     this.selectedDepartment.id = departmentId;
     this.selectedDepartment.name = departmentName;

     // Set profile picture, role and name
     this.getDepartmentById(departmentId);

     // Set quarterly plan data
     this.filterPlans(departmentId.toString(), 2);

  }

  getTeamsUnderDepartmentLeader(departmentId) {
    this.teamService.getTeam({departmentId, planStatus: 2}).subscribe(res => {
      this.teams = res;
      if (!this.teams.length) {
        this.toastrService.info('There are no teams with published plan');
        return;
      }

      // Set default team
      this.selectedTeam.id = this.teams[0].id;
      this.selectedTeam.name = this.teams[0].name;

      // Set profile picture, role and name
      this.getTeamDataById(this.selectedTeam.id);

      // Set quarterly plan data
      this.filterPlans(this.selectedTeam.id.toString(), 2);
    });
  }

  getTeamUnderTeamLeader(teamId, teamName) {
    // Set default team
    this.selectedTeam.id = teamId;
    this.selectedTeam.name = teamName;

    // Set profile picture, role and name
    this.getTeamDataById(teamId);


    // Set quarterly plan data
    this.filterPlans(teamId.toString(), 2);
  }

  getPersonalPlan(profileData) {
    // Set default personal
    this.selectedPersonal.id = profileData.id;
    this.selectedPersonal.name = profileData.fullName;

    // Set profile picture, role and name
    this.associatedProfiles = [];
    this.associatedProfiles.push(profileData);

    // Set quarterly plan data
    this.filterPlans(this.selectedPersonal.id.toString(), 2);
  }


  getPersonalsPlans(profileData) {
     // Set default personal
     this.teamService.teamUsers.subscribe(data => {
      if (!data.length) {
        return;
      }

      this.personals = [];
      data.forEach(element => {
        this.personals.push(element.user);
      });

      this.selectedPersonal.id = data[0].user.id;
      this.selectedPersonal.name = data[0].user.fullName;

      // Set quarterly plan data
      this.filterPlans(this.selectedPersonal.id.toString(), 2);
     });

     // Set profile picture, role and name
     if (this.profileData.profile.team) {
      this.getPersonalsByTeamId(profileData.profile.team.id);
     } else if (this.profileData.profile.department) {
      this.getPersonalsByDepartmentId(profileData.profile.department.id);
     }
  }

  getParentAssociationDataPreview() {
    this.profileService.getProfile().subscribe(res => {
      this.profileData = res;
      if (this.type === 'personal') {
        this.goalName = this.profileData.fullName ? this.profileData.fullName : ' ';
        this.associatedProfiles = [];
        this.associatedProfiles.push(this.profileData);
      } else if (this.type === 'team' && this.profileData.profile.team) {
        this.getTeamDataById(this.profileData.profile.team.id);
      } else if (this.profileData.profile.department && this.type === 'department') {
          this.getDepartmentById(this.profileData.profile.department.id);
      }
    });
  }

  getParentAssociationData() {
    this.profileService.getProfile().subscribe(res => {
      this.profileData = res;
      this.secondaryDropDown();
      if (this.type === 'personal') {
        this.goalName = this.profileData.fullName ? this.profileData.fullName : ' ';
        if (this.profileData.profile.team) {
          if (this.previewType === 'personal') {
            this.getPersonalPlan(this.profileData);

          } else if (this.previewType === 'members') {
            this.getPersonalsPlans(this.profileData);
          }
        } else if (this.profileData.profile.department) {
          if (this.previewType === 'personal') {
            this.getPersonalPlan(this.profileData);
          } else if (this.previewType === 'members') {
            this.getPersonalsPlans(this.profileData);
          }
        }
      } else if (this.type === 'team') {
        if (this.profileData.profile.team) {
          this.getTeamUnderTeamLeader(this.profileData.profile.team.id,
             this.profileData.profile.team.teamName);
        } else if (this.profileData.profile.department) {
          this.getTeamsUnderDepartmentLeader(this.profileData.profile.department.id);
        }
      } else if (this.profileData.profile.department && this.type === 'department') {
        this.getDepartmentLeadersUnderDepartment(this.profileData.profile.department.id,
          this.profileData.profile.department.name);
      }
    });
  }



  // this sets profile picture, role and name
  getDepartmentById(departmentId) {
    this.associatedProfiles = [];
    this.departmentService.getDepartmentLeader({departmentId, planStatus: 2}).subscribe(res => {
      if (!res.length) {
        this.toastrService.info('There are no leaders under this department');
        return;
      }
      res.forEach(element => {
        this.associatedProfiles.push(element.user);
      });
    });
  }

  // this sets profile picture, role and name
  getTeamDataById(teamId) {
    this.associatedProfiles = [];
    this.teamService.getTeamLeader({teamId}).subscribe(res => {
      if (!res.length) {
        this.toastrService.info('There are no leaders under this team');
        return;
      }
      res.forEach(element => {
        this.associatedProfiles.push(element.user);
      });
    });
  }

  // this sets profile picture, role and name
  getPersonalsByTeamId(teamId) {
    this.associatedProfiles = [];
    this.teamService.getTeamMembers({teamId, planStatus: 2}).subscribe((res: any) => {
      this.teamService.setTeamUserData(res);

      if (!res.length) {
        this.toastrService.info('There are no personals with published plan');
        return;
      }
      res.forEach(element => {
        this.associatedProfiles.push(element.user);
      });
    });
  }

  // this sets profile picture, role and name
  getPersonalsByDepartmentId(departmentId) {
    this.associatedProfiles = [];
    this.teamService.getUsersUnderDepartment({departmentId}).subscribe((res: any) => {
      this.teamService.setTeamUserData(res);
      if (!res.length) {
        this.toastrService.info('There are no personals with published plan');
        return;
      }
      res.forEach(element => {
        this.associatedProfiles.push(element.user);
      });
    });
  }

  getPersonalsForCompanyAdmin() {
    this.userPlanService.getUsersWithPublishedPlan().subscribe((res: any) => {
      if (!res.length) {
        this.toastrService.info('There are no personals with published plan');
        return;
      }
      this.personals = res;
      this.setPersonalOption(res[0].id, res[0].fullName);
    });
  }

  getTeamMembers(teamId) {
   this.teamService.getTeamMembers({teamId}).subscribe(res => {
     this.associatedProfiles = res;
   });
  }

  getYearQuarter() {
    const queryParams = {
      planStatus: 2,
      type: this.type
    };
    this.ourGoalService.list(queryParams).subscribe(res => {
      this.quarterYearOptions = res;
      if (this.quarterYearOptions.length > 0) {
        this.selectedPlan.quarter = this.quarterYearOptions[0].quarter;
        this.selectedPlan.year = this.quarterYearOptions[0].year;
        if (this.viewType !== 'preview') {
          this.filterPlans('', 2);
        }
      }
    });
  }

  // Hide and show secondary dropdown on condition
  secondaryDropDown() {
    const role = this.profileData.role.code;
    this.hideSecondaryDropDown = false;
    // if (role === 'company_admin') {
    //   this.hideSecondaryDropDown = false;
    //   // if (this.viewType !== 'preview') {
    //   //   this.filterPlans();
    //   // }
    // }
  }

  // This set all the require data both for company admin and normal user while viewing plan
  getAllDataForPlanView() {
    this.authService.isAdmin().subscribe(res => {
      if (typeof(res) === 'string') {
        return; }
      this.isAdmin = res;
      if (this.isAdmin) {
        if (this.type === 'team') {
          this.getTeamOption();
        } else if (this.type === 'department') {
          this.getDepartmentOption();
        } else if (this.type === 'personal' && this.previewType === 'members') {
          this.getPersonalsForCompanyAdmin();
        } else if (this.type === 'personal' && this.previewType === 'personal') {
          this.getParentAssociationData();
        }
      } else {
        this.getParentAssociationData();
      }
    });
  }


  // This set all the require data both for company admin and normal user while previewing plan
  getAllDataForPlanPreView() {
    this.authService.isAdmin().subscribe(res => {
      if (typeof(res) === 'string') {
        return; }
      this.isAdmin = res;
      if (this.isAdmin) {
        if (this.type === 'team') {
          const selectedTeamForPreview = this.ourGoalService.getPreviewData();
          if (selectedTeamForPreview.id) {
            this.teamService.getTeam({}).subscribe(response => {
              if (!response.length) {
                this.teams = [];
                this.toastrService.info('No teams available');
                return ;
              }
              this.teams = response;
              this.setTeamOptionWhilePreview(selectedTeamForPreview.id, selectedTeamForPreview.name);
            });
          }
        } else if (this.type === 'department') {
          const selectedDepartmentForPreview = this.ourGoalService.getPreviewData();
          if (selectedDepartmentForPreview.id) {
            this.departmentService.listDepartments({}).subscribe(resp => {
              if (!resp.length) {
                this.departments = [];
                this.toastrService.info('No departments available');
                return ;
              }
              this.departments = resp;
              this.setDepartmentOptionWhilePreview(selectedDepartmentForPreview.id, selectedDepartmentForPreview.name)
            });
          }
        }
      } else {
        this.getParentAssociationDataPreview();
      }
    });
  }

  setTeamOptionWhilePreview(id, name) {
    this.selectedTeam.name = name;
    this.selectedTeam.id = id;
    this.getTeamDataById(this.selectedTeam.id);
    // this.selectedPlan.year = '';
    // this.selectedPlan.quarter = '';
    // const previewData = this.ourGoalService.getPreviewData();
    // this.filterPlansWhenPreviewForCompanyAdmin(id, 1, previewData.year, previewData.quarter);
  }

  setDepartmentOptionWhilePreview(id, name) {
    this.selectedDepartment.name = name;
    this.selectedDepartment.id = id;
    this.getDepartmentById(this.selectedDepartment.id);
    // this.selectedPlan.year = '';
    // this.selectedPlan.quarter = '';
    // const previewData = this.ourGoalService.getPreviewData();
    // this.filterPlansWhenPreviewForCompanyAdmin(id, 1, previewData.year, previewData.quarter);
  }

  getDepartmentOption(queryParams = {}) {
    this.departmentService.listDepartments(queryParams).subscribe(res => {
      if (!res.length) {
        this.departments = [];
        this.toastrService.info('No departments available');
        return ;
      }
      this.departments = res;
      this.setDepartmentOption(res[0].id, res[0].name)
    });
   }

   getTeamOption(queryParams = null) {
     this.teamService.getTeam(queryParams).subscribe(res => {
       if (!res.length) {
         this.teams = [];
         this.toastrService.info('No teams available');
         return ;
       }
       this.teams = res;
       this.setTeamOption(res[0].id, res[0].name);
     });
   }

}
