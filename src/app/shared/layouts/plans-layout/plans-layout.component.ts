import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InputComponent} from '../../components/input/input.component';
import {GoalsService} from '../../services/goals.service';
import {PersonalGoalsService} from '../../services/personal-goals.service';
import {DepartmentGoalsService} from '../../services/department-goals.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '../../components/confirmation-dialog/confirmation-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {InitiativeService} from 'src/app/views/planning-and-execution/services/initiative.service';
import isEmpty from 'lodash/isEmpty';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Department} from '../../models/department.model';
import {Team} from '../../models/team.model';
import {DepartmentService} from 'src/app/views/company-profile-setting/services/department.service';
import {TeamService} from 'src/app/views/company-profile-setting/services/team.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-plans-layout',
  templateUrl: './plans-layout.component.html',
  styleUrls: ['./plans-layout.component.scss']
})
export class PlansLayoutComponent implements OnInit, DoCheck {
  goalFormGroup: FormGroup;
  departmentgoalFormGroup: FormGroup;
  personalgoalFormGroup: FormGroup;

  formGroupType = [this.goalFormGroup, this.departmentgoalFormGroup, this.personalgoalFormGroup];
  ourFormGroup: any;
  ourGoalService: any;
  isSaved = false; // This is the flag to tell preview buuton to subscribe to which kind of data
  isAdmin = false;

  @Input() type;
  @Output() valueChange = new EventEmitter<boolean>();
  @ViewChildren('titleField') titleField: QueryList<InputComponent>;
  @ViewChildren('bulletField') bulletField: QueryList<InputComponent>;
  @ViewChildren('subBulletField') subBulletField: QueryList<InputComponent>;
  loading = false;
  saveInProgress = false;
  publishInProgress = false;
  index = null;
  icon = null;
  year = null;
  quarter = null;
  preview = false;
  show = true;
  rightbar = false;
  annualPlans: any;
  annualGoals: any;
  selectedYear = '';
  selectedQuarter = '';
  quarterYearOptions = [];
  departments: Department[];
  teams: Team[];
  selectedDepartment = {
    name: null,
    id: null
  };
  selectedTeam = {
    name: null,
    id: null
  };

  loadDefaultDraftData: boolean;
  activeFormIndex = null;

  showIconDetail = [];
  shouldValidateIndex = null;
  hoverIconName: string;
  hoverFlag = false;
  bulletLength: 1;
  searchTextChanged: Subject<string> = new Subject<string>();
  searchInput = null;

  constructor(private fb: FormBuilder,
              private goalsService: GoalsService,
              private personalGoalsService: PersonalGoalsService,
              private departmentGoalsService: DepartmentGoalsService,
              private annualService: InitiativeService,
              private modalService: NgbModal,
              private toastrService: ToastrService,
              private router: Router,
              private authService: AuthService,
              private departmentService: DepartmentService,
              private teamService: TeamService,
              public elementRef: ElementRef,
  ) {
  }

  get dataArray() {
    return this.ourFormGroup.get('data') as FormArray;
  }

  ngOnInit() {
    this.loadDefaultDraftData = true;
    this.isSaved = false;
    if (this.type === 'team') {
      this.ourFormGroup = this.goalFormGroup;
      this.ourGoalService = this.goalsService;
    }
    if (this.type === 'department') {
      this.ourFormGroup = this.departmentgoalFormGroup;
      this.ourGoalService = this.departmentGoalsService;
    }
    if (this.type === 'personal') {
      this.ourFormGroup = this.personalgoalFormGroup;
      this.ourGoalService = this.personalGoalsService;
    }
    this.getAdmin();
    // this.getAnnualPlans();
    // this.getYearQuarter();
    this.ourFormGroup = this.fb.group({
      year: ['', [Validators.required]],
      quarter: ['', [Validators.required]],
      type: this.type,
      data: this.fb.array([]),
    });
    // this.getYearQuarterAfterTabSwitch();
    this.searchTextChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.type === 'department') {
          return this.getDepartmentOption({search: this.searchInput})
        }

        if (this.type === 'team') {
          return this.getTeamOption({teamName: this.searchInput})
        }
      });
  }

  // getOrgRole

  setYearQuarterOption(year, quarter) {
    this.selectedYear = year;
    this.selectedQuarter = quarter;
    // this.getAnnualPlans();
    this.filterAnnualPlan();
    this.loading = true;
    this.ourFormGroup = this.fb.group({
      year: [year, [Validators.required]],
      quarter: [quarter, [Validators.required]],
      type: this.type,
      data: this.fb.array([]),
    });
    if (this.isAdmin && this.type === 'personal') {
      // query API and fill the message
      this.ourGoalService.listSpecificPlan({quarter, year, type: this.type, planStatus: 1, personalType: 'personal'})
        .subscribe((res: any) => {
          this.handleResponseAfterSpecificPlan(res, year, quarter);
        });
    } else if (this.isAdmin) {
      let id = '';
      if (this.selectedTeam.id) {
        id = this.selectedTeam.id;
      } else if (this.selectedDepartment.id) {
        id = this.selectedDepartment.id;
      }
      if (id) {
        this.ourGoalService.listSpecificPlan({quarter, year, id, planStatus: 1, personalType: 'personal'})
        .subscribe(res => {
          this.handleResponseAfterSpecificPlan(res, year, quarter);
        });
      }
    } else {
      // query API and fill the message
      this.ourGoalService.listSpecificPlan({quarter, year, type: this.type, planStatus: 1, personalType: 'personal'})
        .subscribe((res: any) => {
          this.handleResponseAfterSpecificPlan(res, year, quarter);
        });
    }

  }

  handleResponseAfterSpecificPlan(data, year, quarter) {
    if (data.length > 0) {
      this.ourGoalService.setData(data);

      // this sets the latest year quarter or currently viewed draft plan while swicthing tabs
      this.selectYearQuarter(year, quarter);
      for (const item of data) {
        this.addInputField({
          id: item.id,
          title: item.title,
          description: typeof (item.data) === 'string' ? JSON.parse(item.data) : item.data,
          icon: item.icon
        });
      }
    } else {
      this.addInputField();
    }

    this.loading = false;
  }

  selectYearQuarter(year, quarter) {
    if (this.isAdmin) {
      if (this.selectedTeam.id) {
        this.ourGoalService.setYearQuarterDataForCompanyAdmin({year, quarter, team: this.selectedTeam});
      } else if (this.selectedDepartment.id) {
        this.ourGoalService.setYearQuarterDataForCompanyAdmin({year, quarter, department: this.selectedDepartment});
      }
    } else {
      this.ourGoalService.setYearQuarterData({year, quarter});
    }
  }

  getYearQuarterAfterTabSwitch() {
    const data = this.ourGoalService.getYearQuarterData();
    if (!isEmpty(data)) {
      this.setYearQuarterOption(data.year, data.quarter);
    }
  }


  getYearQuarterAfterTabSwitchForCompanyAdmin() {
    const data = this.ourGoalService.getYearQuarterDataForCompanyAdmin();
    if (!isEmpty(data)) {
      if (data.team && data.team.id) {
        this.selectedTeam.id = data.team.id;
        this.selectedTeam.name = data.team.name;
      } else if (data.department && data.department.id) {
        this.selectedDepartment.id = data.department.id;
        this.selectedDepartment.name = data.department.name;
      }
      this.setYearQuarterOption(data.year, data.quarter);
    }
  }

  addInputField(formData: any = null) {
    if (formData === null) {
      formData = {id: null, title: '', description: [], icon: ''};
    }
    const formDataArray = this.ourFormGroup.controls.data as FormArray;

    formDataArray.push(this.fb.group({
      id: new FormControl(formData.id),
      title: new FormControl(formData.title, [Validators.required]),
      description: this.setDescription(formData.description),
      icon: new FormControl(formData.icon, [Validators.required]),
    }));

    this.activeFormIndex = formDataArray.length - 1;

    window.setTimeout(() => {
      if (this.titleField && this.titleField.last) {
        this.titleField.last.focus();
      }
    });
  }

  shouldDisableQuarterlyPlanForm = (): boolean => {
    return !(this.selectedYear && this.selectedQuarter &&
      this.ourFormGroup.value.data.some(planValue => (planValue.title.trim() || planValue.icon)));
  };

  setDescription(data: any): FormArray {
    const descArr = this.fb.array([]);
    if (data.length === 0) {
      data[0] = {bullet: '', subBullet: []};
    }
    for (const item of data) {
      descArr.push(this.createBullet(item));
    }
    return descArr;
  }

  createBullet(item: any) {
    const subDescArr = this.fb.array([]);
    if (item.subBullet === undefined) {
      item.subBullet = [];
    }
    for (const subItem of item.subBullet) {
      subDescArr.push(this.createSubBullet(subItem));
    }
    return this.fb.group({
      bullet: this.fb.control(item.bullet),
      subBullet: subDescArr
    });
  }

  createSubBullet(item: string) {
    return this.fb.control(item);
  }

  addBullet(index: number) {
    const formDescription = this.dataArray.at(index).get('description') as FormArray;
    formDescription.push(this.createBullet({bullet: '', subBullet: []}));
    window.setTimeout(() => {
      this.bulletField.last.focus();
    });
  }

  addSubBullet($event: KeyboardEvent, index: number, bulletIndex: number): void {
    $event.preventDefault();
    if ($event.key === 'Tab') {
      const bullets = this.dataArray.at(index).get('description') as FormArray;
      const subBullets = bullets.at(bulletIndex).get('subBullet') as FormArray;
      subBullets.push(this.createSubBullet(''));
      window.setTimeout(() => {
        const subIndex = this.calculateSubBulletIndex(index, bulletIndex);
        this.subBulletField.toArray()[subIndex].focus();
      });
    }
  }

  addNextSubBullet($event: KeyboardEvent, index: number, bulletIndex: number): void {
    $event.preventDefault();
    if ($event.key === 'Enter') {
      const bullets = this.dataArray.at(index).get('description') as FormArray;
      const subBullets = bullets.at(bulletIndex).get('subBullet') as FormArray;
      subBullets.push(this.createSubBullet(''));
      window.setTimeout(() => {
        const subIndex = this.calculateSubBulletIndex(index, bulletIndex);
        this.subBulletField.toArray()[subIndex].focus();
      });
    }
  }

  delSubBullet($event, i, j, k): void {
    if ($event.key === 'Delete') {
      this.deleteSubBullet(i, j, k);
    }
  }

  calculateSubBulletIndex(index: number, bulletIndex: number) {
    let total = 0;
    const bullets = this.dataArray.at(index).get('description') as FormArray;
    for (let i = 0; i <= bulletIndex; i++) {
      const subBullets = bullets.at(i).get('subBullet') as FormArray;
      total += subBullets.length;
    }
    return total - 1;
  }

  deleteBullet(index: number, bulletIndex: number): void {
    const formDescription = this.dataArray.at(index).get('description') as FormArray;
    formDescription.removeAt(bulletIndex);
  }

  deleteSubBullet(index: number, bulletIndex: number, subBulletIndex: number): void {
    const bullets = this.dataArray.at(index).get('description') as FormArray;
    const subBullets = bullets.at(bulletIndex).get('subBullet') as FormArray;
    subBullets.removeAt(subBulletIndex);
  }

  addIcon(iconName: string, index: number) {
    // const selectedAnnualPlan =  this.annualPlans.filter(elem => elem.details[0].icon === iconName);
    this.dataArray.at(index).patchValue({icon: iconName});
  }

  deleteCard(index: number): void {
    const formDataArray = this.ourFormGroup.controls.data as FormArray;
    formDataArray.removeAt(index);
    this.activeFormIndex = this.dataArray.length - 1;
  }

  duplicateCard(index: number): void {
    const duplicateData = this.dataArray.value[index];
    const formDataArray = this.ourFormGroup.controls.data as FormArray;
    formDataArray.push(this.fb.group({
      id: new FormControl(null),
      title: new FormControl(duplicateData.title, [Validators.required]),
      description: this.setDescription(duplicateData.description),
      icon: new FormControl(duplicateData.icon, [Validators.required]),
    }));
    this.activeFormIndex = this.dataArray.length - 1;
  }

  hoverIcon(iconName: string, index: number, iconIndex: number) {
    this.hoverIconName = iconName;
    this.hoverFlag = true;
    if (this.showIconDetail[index] === true) {
      const iconDown = document.getElementById(`icon-down-caret-${iconIndex}`);
      iconDown.style.display = 'block';
    }

  }

  hoverIconLeave(index: number, iconIndex: number) {
    if (this.showIconDetail[index] === true) {
      const iconDown = document.getElementById(`icon-down-caret-${iconIndex}`);
      iconDown.style.display = 'none';
    }
  }

  changeIconToId(iconName) {
    let selectedAnnualPlan = null;
    for (const elem of this.annualPlans) {
      const found = elem.details.filter(e =>
        e.icon === iconName);
      if (found) {
        selectedAnnualPlan = elem;
        break;
      }
    }
    return selectedAnnualPlan.id
  }

  changeIconToPlan(iconName) {
    const selectedAnnualPlan = this.annualPlans.filter(elem => elem.details[0].icon === iconName);
    return selectedAnnualPlan[0];
  }

  showAddBtn(index: number) {
    return this.dataArray.length === index + 1;
  }

  toggleShowIconDetail(index: number) {
    if (this.showIconDetail[index] === true) {
      this.showIconDetail[index] = false;
      document.getElementById('team-goals-icons__category').classList.remove('category-expand');
    } else {
      this.showIconDetail[index] = true;
      document.getElementById('team-goals-icons__category').classList.add('category-expand');
      // if (this.showAddBtn(index) === true){
      //   document.getElementById('goal-card').classList.add('on-show-detail');
      // } else {
      //   document.getElementById('goal-card').classList.add('on-show-detail-addBtn');
      // }
    }
  }

  setFormData() {
    const formData = [];
    for (const [i, data] of this.dataArray.value.entries()) {
      formData.push({
        id: data.id,
        year: this.selectedYear,
        quarter: this.selectedQuarter,
        title: data.title,
        icon: data.icon,
        // icon: data.icon,
        type: this.type,
        data: JSON.stringify(data.description),
        sort_order: i,
        planStatus: 1
      });
    }
    return formData;
  }

  openPreview() {
    if (this.isSaved === false) {
      if (this.isAdmin) {
        if (this.selectedDepartment.id) {
          this.selectedDepartment['year'] = this.selectedYear;
          this.selectedDepartment['quarter'] = this.selectedQuarter;
          this.ourGoalService.setPreviewData(this.selectedDepartment);
        } else if (this.selectedTeam.id) {
          this.selectedTeam['year'] = this.selectedYear;
          this.selectedTeam['quarter'] = this.selectedQuarter;
          this.ourGoalService.setPreviewData(this.selectedTeam);
        }
      }
      // const formData = this.setFormData();
      // this.ourGoalService.setData(formData);
    }
    const formData = this.setFormData();
    this.ourGoalService.setData(formData);
    this.preview = true;
    this.saveInProgress = false;
    this.rightbar = false;
  }

  publish() {
    this.publishInProgress = true;
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'}
    );
    modalRef.componentInstance.title = 'You are about to publish';
    modalRef.componentInstance.body = 'All members of the company will be able to see this once published';
    modalRef.componentInstance.type = 'warning';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      const formData = this.setFormData();
      if (result === 'accept' && this.ourFormGroup.valid) {
        formData.forEach(element => {
          element.planStatus = 2;
        });
        if (this.isAdmin && this.type === 'personal') {
          this.ourGoalService.save(formData).subscribe((res) => {
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
          this.ourGoalService.createPlanByCompanyAdmin(formData, id).subscribe(res => {
            this.handleResponseAfterPlanPublish(res);
          }, (error) => {
            this.toastrService.error('Error saving the plan');
          });
        } else {
          this.ourGoalService.save(formData).subscribe((res) => {
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
    this.saveInProgress = false;
    this.ourGoalService.setData(data);
    this.isSaved = true;
    this.publishInProgress = false;
    this.toastrService.success('This plan has been published', 'Success');
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

  previewFunc(event) {
    this.preview = event;
  }

  onSubmit() {
    if (this.ourFormGroup.valid) {
      this.saveInProgress = true;
      const formData = [];
      for (const [i, data] of this.dataArray.value.entries()) {
        formData.push({
          id: data.id,
          year: this.ourFormGroup.value.year,
          quarter: this.ourFormGroup.value.quarter,
          title: data.title,
          icon: data.icon,
          type: this.type,
          data: JSON.stringify(data.description),
          sort_order: i
        });
      }
      if (this.isAdmin && this.type === 'personal') {
        this.ourGoalService.save(formData).subscribe((res) => {
          this.handleResponseAfterPlanSave(res);
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
        this.ourGoalService.createPlanByCompanyAdmin(formData, id).subscribe(res => {
          this.handleResponseAfterPlanSave(res);
        }, (error) => {
          this.toastrService.error('Error saving the plan');
        });
      } else {
        this.ourGoalService.save(formData).subscribe((res) => {
          this.handleResponseAfterPlanSave(res);
        }, (error) => {
          this.toastrService.error('Error saving the plan');
        });
      }
    }
  }

  handleResponseAfterPlanSave(data) {
    if (!data.length) {
      this.toastrService.info('No response from server after saving plan');
      return;
    }
    this.saveInProgress = false;
    this.ourGoalService.setData(data);
    this.isSaved = true;
    this.toastrService.success('This plan has been saved', 'Success');
  }

  changeActiveForm(event, index: number): void {
    if (!event.target.classList.contains('drag-icon') &&
      !event.target.closest('.drag-icon')) {
      this.activeFormIndex = index;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ourFormGroup.get('data').controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.ourFormGroup.get('data').value, event.previousIndex, event.currentIndex);

    // Change the index of active form according to where active form is moved
    if (event.previousIndex === this.activeFormIndex) {
      this.activeFormIndex = event.currentIndex;
    } else if (this.activeFormIndex > event.previousIndex && this.activeFormIndex <= event.currentIndex) {
      this.activeFormIndex--;
    } else if (this.activeFormIndex < event.previousIndex && this.activeFormIndex >= event.currentIndex) {
      this.activeFormIndex++;
    }
  }

  getYearQuarter() {
    const queryParams = {
      planStatus: 2,
      personalType: 'personal'
    };
    this.ourGoalService.list(queryParams).subscribe(res => {
      res.forEach(elem => {
        this.quarterYearOptions.forEach(el => {
          if (el.quarter === elem.quarter && el.year === elem.year) {
            const index = this.quarterYearOptions.indexOf(el);
            if (index > -1) {
              this.quarterYearOptions.splice(index, 1);
            }
          }
        });
      });
    });
    const data = this.ourGoalService.getYearQuarterData();
    if (isEmpty(data)) {
      this.getDraftData();
    }
  }

  getYearQuarterForCompanyAdmin() {
    let id = null;
    if (this.selectedTeam.id) {
      id = this.selectedTeam.id;
    } else if (this.selectedDepartment.id) {
      id = this.selectedDepartment.id;
    }
    const queryParams = {
      planStatus: 2,
      id,
      type: this.type
    }
    if (id) {
      this.ourGoalService.list(queryParams).subscribe(res => {
        res.forEach(elem => {
          this.quarterYearOptions.forEach(el => {
            if (el.quarter === elem.quarter && el.year === elem.year) {
              const index = this.quarterYearOptions.indexOf(el);
              if (index > -1) {
                this.quarterYearOptions.splice(index, 1);
              }
            }
          });
        });
        this.selectedQuarter = '';
        this.selectedYear = '';
        // const data = this.ourGoalService.getYearQuarterDataForCompanyAdmin();
        // if (isEmpty(data)) {
        //   this.getDraftDataForCompanyAdmin();
        // } else if (this.quarterYearOptions.length) {
        //   this.selectedYear = this.quarterYearOptions[0].year;
        //   this.selectedQuarter = this.quarterYearOptions[0].quarter;
        // }
        if (this.quarterYearOptions.length) {
          this.setYearQuarterOption(this.quarterYearOptions[0].year, this.quarterYearOptions[0].quarter);
        } else {
          this.toastrService.info('All quarterly plan are published for selected department or team')
        }
      });
    }
  }

  getDraftDataForCompanyAdmin() {
    this.ourGoalService.list({type: this.type, planStatus: 1, personalType: 'personal'}).subscribe((res: any) => {
      if (res.length) {
        this.selectedQuarter = '';
        this.selectedYear = '';
        if (this.type === 'team') {
          for (const team of this.teams) {
            const draftPlans = res.filter(elem => {
              if (elem.team) {
                return elem.team.id === team.id;
              }
            });
            if (draftPlans.length) {
              this.selectedTeam.id = team.id;
              this.selectedTeam.name = team.name;
              this.setYearQuarterOption(draftPlans[0].year, draftPlans[0].quarter);
              break;
            }
          }
        } else if (this.type === 'department') {
          for (const department of this.departments) {
            const draftPlans = res.filter(elem => {
              if (elem.department) {
                return elem.department.id === department.id;
              }
            });
            if (draftPlans.length) {
              this.selectedDepartment.id = department.id;
              this.selectedDepartment.name = department.name;
              this.setYearQuarterOption(draftPlans[0].year, draftPlans[0].quarter)
              break;
            }
          }
        }
        this.loadDefaultDraftData = false;
        // this.setYearQuarterOption(res[0].year, res[0].quarter);
      }
    });
  }


  getDraftData() {
    this.ourGoalService.list({type: this.type, planStatus: 1, personalType: 'personal'}).subscribe((res: any) => {
      if (res.length) {
        this.setYearQuarterOption(res[0].year, res[0].quarter);
      }
    });
  }

  getAnnualPlans() {
    this.annualService.listAnnualInitiatives({planStatus: 2}).subscribe(res => {
      this.annualPlans = res;
      this.getYearQuarterOption(this.annualPlans);
      if (this.isAdmin) {
        // this.getYearQuarterAfterTabSwitchForCompanyAdmin();
      } else {
        this.getYearQuarterAfterTabSwitch();
      }
    }, error => {
      this.toastrService.error('Error listing annual plans');
    });
  }

  filterAnnualPlan() {
    this.annualGoals = [];
    const currentAnnualPlans = this.annualPlans.filter((annualPlans) => {
      return annualPlans.year === this.selectedYear;
    });

    if (!currentAnnualPlans[0].details.length) {
      this.toastrService.info('There is no icon assigned for this year');
    } else {
      this.annualGoals = currentAnnualPlans[0].details;
    }
  }

  toggleWizard = () => this.rightbar = !this.rightbar;

  wizardClosed = () => this.rightbar = false;

  ngDoCheck() {
    const length = this.dataArray.controls.length;
    for (let i = 0; i < length; i++) {
      this.auto_grow('goalTitle', i);
    }
    for (const teamGoal of this.dataArray.value) {
      const bullets = teamGoal.description
      this.bulletLength = bullets.length
    }
    for (let j = 0; j < this.bulletLength; j++) {
      this.auto_grow('bulletTitle', j);
    }
  }


  auto_grow(inputtype, index) {
    const textArea = document.getElementById(`${inputtype}-${index}`);
    if (textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = '40px';
      textArea.style.height = (textArea.scrollHeight - textArea.scrollTop) + 'px';
      // this.goalTitleHeight = textArea.scrollHeight - textArea.scrollTop;
    }
  }


  getYearQuarterOption(annualGoals) {
    this.quarterYearOptions = [];
    let publishedAnnualYear = [];
    const quarterList = [1, 2, 3, 4];
    annualGoals.forEach(elem => {
      publishedAnnualYear.push(elem.year);
    });
    publishedAnnualYear = publishedAnnualYear.sort();
    publishedAnnualYear.forEach(pay => {
      for (const instance of quarterList) {
        this.quarterYearOptions.push({quarter: instance, year: pay});
      }
    });
    // this.authService.isAdmin().subscribe(res => {
    if (this.isAdmin && this.type === 'personal') {
      this.getYearQuarter();
    } else if (this.isAdmin) {
      this.getYearQuarterForCompanyAdmin();
    } else {
      this.getYearQuarter();
    }
  }

  getAdmin() {
    this.authService.isAdmin().subscribe(res => {
      if (typeof(res) === 'string') {
        return; }
      this.isAdmin = res;
      if (this.isAdmin) {
        if (this.type === 'team') {
          this.getTeamOption();
        } else if (this.type === 'department') {
          this.getDepartmentOption();
        } else if (this.type === 'personal') {
          this.getAnnualPlans();
        }
      } else {
        this.getAnnualPlans();
      }
    });
  }

  setDepartmentOption(id, name) {
    this.selectedDepartment.id = id;
    this.selectedDepartment.name = name;
    this.getAnnualPlans();
  }

  setTeamOption(id, name) {
    this.selectedTeam.id = id;
    this.selectedTeam.name = name;
    this.getAnnualPlans();
  }

  getDepartmentOption(queryParams = {}) {
    this.departmentService.listDepartments(queryParams).subscribe(res => {
      if (!res.length) {
        this.departments = [];
        this.toastrService.info('No departments available');
        return;
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
        return;
      }
      this.teams = res;
      this.setTeamOption(res[0].id, res[0].name);
    });
  }

  onSearch() {
    let searchInput = '';
    switch (this.type) {
      case 'department':
        searchInput = this.elementRef.nativeElement.querySelector('#departmentSearchInput').value;
        this.searchInput = searchInput;
        this.searchTextChanged.next(this.searchInput);
        break;
      case 'team':
        searchInput = this.elementRef.nativeElement.querySelector('#teamSearchInput').value;
        this.searchInput = searchInput;
        this.searchTextChanged.next(this.searchInput);
        break;
    }
  }

}
