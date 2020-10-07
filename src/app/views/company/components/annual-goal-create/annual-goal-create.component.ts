import {
  Component, DoCheck,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, QueryList, SimpleChanges,
  ViewChildren
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { InitiativeService } from '../../../planning-and-execution/services/initiative.service';
import { InitiativeModel } from '../../../planning-and-execution/models/initiative.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  ConfirmationDeleteDialogComponent
} from 'src/app//shared/components/confirmation-delete-dialog/confirmation-delete-dialog.component';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-annual-goal-create',
  templateUrl: './annual-goal-create.component.html',
  styleUrls: ['./annual-goal-create.component.scss']
})
export class AnnualGoalCreateComponent implements OnInit, OnChanges, DoCheck {
  @Input() initiative: InitiativeModel;
  @Output() actionEvent = new EventEmitter();
  @Output() selectedIdEvent = new EventEmitter();
  loading = false;
  index = null;
  icon = null;
  currentlyEditing = null;
  initiativeForm: FormGroup;
  totalFormCard = 0;
  dragStartIndex = null;
  goalYearCollection = [];
  status = 1;
  selectedYear = null;
  startYear = 2020;
  action = null;
  formData = null;
  selectedIcons: any = [];
  selectedId = null;
  iconsLists = [
    { name: 'Employee', icons: ['smile', 'bulb', 'user-plus', 'brain', 'been-here']},
    { name: 'Customers', icons: ['award', 'chat', 'crown', 'diamond', 'badge-check']},
    { name: 'Our Business', icons: ['dollar-circle', 'percentage', 'pie-chart', 'rocket', 'network']},
    { name: 'Our Community we work in', icons: ['band-aid', 'cog', 'hive', 'key', 'cross-hair']},
  ];
  @Input() set inputData(value) {
    if (value) {
      this.selectedYear = value.year ? value.year : null;
      this.action = value.action ? value.action : null;
      this.formData = value.initiativeData;
    }
  }
  @ViewChildren('popOver') public popovers: QueryList<any>;

  constructor(private fb: FormBuilder,
              private initiativeService: InitiativeService,
              private modalService: NgbModal,
              private toastrService: ToastrService,
              ) {
  }

  ngOnInit(): void {
    const button = document.querySelectorAll('.inititive-card');
    this.initiativeForm = this.fb.group({
      year: ['', [Validators.required]],
      initiativeData: this.fb.array([]),
    });
    this.getGoalYearLists();
    if (this.selectedYear && this.action !== 'edit' && this.action !== 'cancel') {
      this.initiativeForm.patchValue({year: this.selectedYear});
      this.getInitiativeBySelectedYear();
    }
    if (this.action === 'edit' || this.action === 'cancel') {
      this.initiativeForm.patchValue({year: this.selectedYear});
      this.populateTheForm(this.formData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData && changes.inputData.currentValue && changes.inputData.currentValue.year) {
      this.selectedYear = changes.inputData.currentValue.year;
      this.action = changes.inputData.currentValue.action;
    }
  }

  ngDoCheck() {
    const length = this.initiativeDataArray.length;
    for (let i = 0; i < length; i++) {
      this.auto_grow('title', i);
      this.auto_grow('description', i);
    }
  }

  enterKeyPressedEvent(event, index) {
    event.preventDefault();
    document.getElementById('initiative-description-' + index).focus();
  }

  auto_grow(type, index) {
    const textArea = document.getElementById(`initiative-${type}-${index}`);
    if (textArea) {
      const height = textArea.scrollHeight;
      textArea.style.overflow = 'hidden';
      textArea.style.height = '40px';
      textArea.style.height = (textArea.scrollHeight - textArea.scrollTop) + 'px';
    }
  }

  openModal(content): void {
    const modalRef = this.modalService.open(content,
      {centered: true}
    );
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.iconSaveAndContinueBtn();
      }
    });
  }

  get initiativeDataArray(): FormArray {
    return this.initiativeForm.get('initiativeData') as FormArray;
  }

  addInputField(data, pushAtIndex = null) {
    const title = data && data.title ? data.title : '';
    const description = data && data.description ? data.description : '';
    const icon = data && data.icon ? data.icon : '';
    this.totalFormCard += 1;
    const initiativeData = this.initiativeForm.controls.initiativeData as FormArray;
    if (pushAtIndex) {
      initiativeData.insert(pushAtIndex, this.fb.group({
        title: new FormControl(title, [Validators.required]),
        description: new FormControl(description),
        icon: new FormControl(icon),
      }));
    } else {
      initiativeData.push(this.fb.group({
        title: new FormControl(title, [Validators.required]),
        description: new FormControl(description),
        icon: new FormControl(icon),
      }));
    }
    this.index = null;
    this.icon = null;
  }

  removeInputField(index) {
    this.initiativeDataArray.removeAt(index);
  }

  iconClick(className) {
    if (className) {
      this.icon = className;
      const elems = document.querySelectorAll('.clicked');
      [].forEach.call(elems, (el) => {
        el.classList.remove('clicked');
      });
      document.getElementsByClassName(className)[0].classList.add('clicked');
    }

  }

  addBtnClick(content, index) {
    this.index = index;
    this.icon = null;
    this.getSelectedIconList();
    this.getSetTheCurrentSelectedIcon()
    this.openModal(content);
  }

  iconSaveAndContinueBtn() {
    const formData = this.initiativeDataArray.value;
    formData.forEach((row, index) => {
      if (row.icon === this.icon) {
        this.initiativeDataArray.at(index).patchValue({icon: null});
      }
    });
    this.initiativeDataArray.at(this.index).patchValue({icon: this.icon});
    this.index = null;
    this.icon = null;
  }

  initiativeSubmitBtnClicked(status) {
    this.saveAnnualInitiative(status);
  }

  saveAnnualInitiative(action) {
    const data = this.initiativeForm.value;
    this.actionEvent.emit({ action,  year: this.selectedYear, id: this.selectedId, ...this.initiativeForm.value});
  }

  removeIcon(currentIndex) {
    this.initiativeDataArray.at(currentIndex).patchValue({icon: null});
  }

  dragOver(ev) {
    ev.preventDefault();
    let index = ev.target.dataset.card_id;
    if (!!index === false) {
      index = ev.currentTarget.closest('.card-div').dataset.card_id ;
    }
    const formCard = document.getElementById('initiative_drop_' + index);
    if (formCard) {
      formCard.style.border = '1px solid #2F89FC';
      formCard.style.borderRadius = '7px';
    }
  }

  dragStartEvent(ev) {
    const index = parseInt(ev.target.dataset.card_id, 10);
    this.dragStartIndex = index;
    const item  = document.getElementById('form_card_' + index);
    item.style.border = '1px solid rgba(0, 0, 0, 0.3)';
    ev.dataTransfer.setDragImage(item, 0, 0);
  }

  dragLeaveEvent(ev) {
    let index = ev.target.dataset.card_id;
    if (!!index === false) {
      index = ev.currentTarget.closest('.card-div').dataset.card_id ;
    }
    const formCard = document.getElementById('initiative_drop_' + index);
    if (formCard) {
      formCard.style.border = 'unset';
    }
  }

  dropEvent(ev, dropIn = null) {
    ev.preventDefault();
    let index = ev.target.dataset.card_id;
    if (!!index === false) {
      index = ev.currentTarget.closest('.card-div').dataset.card_id ;
    }
    this.reIndex(this.dragStartIndex , index, dropIn);
    this.dragStartIndex = null;
    const formCard = document.getElementById('initiative_drop_' + index);
    if (formCard) {
      formCard.style.border = 'unset';
    }
  }

  dragEndEvent(ev) {
    this.dragStartIndex = null;
    const index = ev.target.dataset.card_id;
    const formCard = document.getElementById('form_card_' + index);
    if (formCard) {
      formCard.style.border = 'unset';
    }
  }

  reIndex(startIndex, endIndex, dropIn = null) {
    let order = 'asc';
    const initiativeData = this.initiativeForm.controls.initiativeData as FormArray;
    startIndex = Number(startIndex);
    endIndex = Number(endIndex);
    if (startIndex > endIndex) {
      order = 'desc';
    } else {
      if (dropIn === 'card') {
        endIndex = endIndex + 1;
      }
    }
    const startForm = initiativeData.at(startIndex);
    if (order === 'asc') {
      let i = Number(startIndex);
      endIndex = endIndex - 1;
      for (; i <= endIndex; i++) {
        let current = initiativeData.at(i + 1);
        if (i === endIndex) {
          current = startForm;
        }
        initiativeData.removeAt(i);
        initiativeData.insert(i, current);
      }
    } else {
      let i = Number(startIndex);
      for (; i >= endIndex; i--) {
        let current = initiativeData.at(i - 1);
        if (i === endIndex) {
          current = startForm;
        }
        initiativeData.removeAt(i);
        initiativeData.insert(i , current);
      }
    }
  }

  placeHereShowCondition(index) {
    if (this.dragStartIndex == null) {
      return false;
    }
    return index  <= this.dragStartIndex - 1 || index  >= this.dragStartIndex + 2;
  }

  onAnnualInitiativeCardClick(index) {
   this.currentlyEditing = Number(index);
  }

  onYearChange(year) {
    this.selectedYear = year;
    this.initiativeForm.patchValue({year: this.selectedYear});
    while (this.initiativeDataArray.length !== 0) {
      this.initiativeDataArray.removeAt(0);
    }
    this.dragStartIndex = null;
    this.totalFormCard = 0;
    this.status = null;
    this.getInitiativeBySelectedYear();
  }

  getInitiativeBySelectedYear() {
    this.initiativeService.getAnnualInitiative(this.selectedYear).subscribe((resp: any) => {
      this.populateTheForm(resp);
      if (resp && resp.length) {
        this.status = resp[0].status;
        this.selectedId = resp[0].id;
        this.selectedIdEvent.emit(this.selectedId);
      }
    });
  }

  getGoalYearLists() {
    this.goalYearCollection = [];
    let startYear = this.startYear;
    const  currentYear = +(new Date()).getFullYear();
    const endYear = (+currentYear) + 5;
    this.initiativeService.getAnnualGoalYearWiseStatus().subscribe(response => {
      const publishedYearList: any = response;
      const yearLists = [];
      publishedYearList.forEach((value) => {
        if (value.status === 2) {
          yearLists.push(value.year);
        }
      });
      while (startYear <= endYear) {
        if (!yearLists.includes(startYear)) {
          if (!!this.selectedYear === false && !this.goalYearCollection.includes(this.selectedYear)) {
            this.selectedYear = startYear;
            this.initiativeForm.patchValue({year: this.selectedYear});
            if (this.action !== 'edit' && this.action !== 'cancel') {
              this.getInitiativeBySelectedYear();
            }
          }
          this.goalYearCollection.push(startYear);
        }
        startYear++;
      }

      if (this.goalYearCollection.length === 0) {
        this.toastrService.info('All the goals of 5 years from now has been published', 'Data not found');
      }
    }, error => {
      console.log(error);
    });
  }

  deleteInitiativeCard(index) {
    const modalRef = this.modalService.open(ConfirmationDeleteDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'});
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.body = 'You are about to delete this permanently';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'DELETE';
    modalRef.componentInstance.declineText = 'CANCEL';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.initiativeDataArray.removeAt(index);
        if (this.initiativeDataArray.length === 0) {
          this.addInputField({});
        }
      }
    });
  }

  duplicateInitiativeCard(index) {
    const data = {...this.initiativeDataArray.at(index).value};
    data.icon = null;
    this.addInputField(data, index + 1);
  }

  editInitiativeCard(index) {
    document.getElementById('initiative-title-' + index).focus();
  }

  populateTheForm(data) {
    if (!!data === true) {
      const length = Object.keys(data).length;
      if (length) {
        for (let i = 0; i < length; i++) {
          const item = data[i];
          this.addInputField({icon: item.icon, title: item.title, description: item.description});
        }
      } else {
        this.addInputField({icon: '', title: '', description: ''});
      }
    } else {
      this.addInputField({icon: '', title: '', description: ''});
    }
  }

  isSomethingFilledInTheForm() {
    let formValueEmpty = true;
    const formData = this.initiativeDataArray.value;
    if (!!this.initiativeForm.value.year === false) {
      return true;
    }
    formData.forEach((row) => {
      if (!!row.icon === true || !!row.title === true || !!row.description === true) {
        formValueEmpty = false;
      }
    });
    return formValueEmpty;
  }

  isFormTitleFilled() {
    let formValueEmpty = false;
    const formData = this.initiativeDataArray.value;
    if (!!this.initiativeForm.value.year === false) {
      return true;
    }
    formData.forEach((row) => {
      if (!!row.title === false) {
        formValueEmpty = true;
      }
    });
    return formValueEmpty;
  }

  getSelectedIconList() {
    this.selectedIcons = [];
    this.initiativeDataArray.value.forEach((value) => {
      if (!!value.icon === true) {
        this.selectedIcons.push(value.icon);
      }
    });
  }

  getSetTheCurrentSelectedIcon() {
    this.icon = this.initiativeDataArray.at(this.index).value.icon;
  }

  isSelectedOrClickedIcon(icon) {
    if (this.initiativeDataArray.at(this.index).value.icon === icon) {
      return 'clicked';
    }
    return this.selectedIcons.includes(icon) ? 'selected' : null;
  }

}
