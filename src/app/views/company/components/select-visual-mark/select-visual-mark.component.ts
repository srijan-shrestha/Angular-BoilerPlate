import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-visual-mark',
  templateUrl: './select-visual-mark.component.html',
  styleUrls: ['./select-visual-mark.component.scss']
})
export class SelectVisualMarkComponent implements AfterViewInit, OnInit {
  @Output() actionEvent = new EventEmitter();
  leftCounter = 0;
  enterCounter = 0;
  movedMarker = null;
  lastDroppedElementId = null;
  selectedYear = null;
  action = null;
  initiatives = [];
  oldInitiatives = [];
  activeElementIcon = null;
  selectedInitiativeIndex = null;
  selectedIcons = [];
  iconsLists = [
    { name: 'Employee', icons: ['smile', 'bulb', 'user-plus', 'brain', 'been-here']},
    { name: 'Customers', icons: ['award', 'chat', 'crown', 'diamond', 'badge-check']},
    { name: 'Our Business', icons: ['dollar-circle', 'percentage', 'pie-chart', 'rocket', 'network']},
    { name: 'Our Community we work in', icons: ['band-aid', 'cog', 'hive', 'key', 'cross-hair']},
  ];

  @Input() set inputData(value) {
    if (value) {
      this.initiatives = value.initiativeData;
      this.oldInitiatives = JSON.parse(JSON.stringify(value.initiativeData));
      this.selectedYear = value.year;
      this.action = value.action;
    }
  }

  ngOnInit() {
    this.getSelectedIconList();
  }

  ngAfterViewInit(): void {
    this.addDragEvent();
  }

  selectIcon(icon) {
    this.activeElementIcon = icon;
  }

  addDragEvent = () => {
    // @ts-ignore
    [...document.getElementsByClassName('marker')].forEach(element => {
      element.addEventListener('dragstart', ({target}) => {
        this.movedMarker = target.id.replace('marker-', '')
      });
    });
  };

  // Reason why finalOperation is done because, the dragenter and drag leave event was continuously being hit.
  // so we could not do something like:
  // (ondragleave) = remove the class or do something;
  // still looking for a better way to accomplish.

  finalOperation = () => {
    if (this.enterCounter === this.leftCounter && document.getElementById(`drop-area-blue-square-` + this.lastDroppedElementId)) {
      document.getElementById(`drop-area-blue-square-` + this.lastDroppedElementId).style.display = 'none';
      document.getElementById(`drop-area-dotted-square-` + this.lastDroppedElementId).style.display = '';
    }
  };

  elementHovered = () => this.enterCounter++;

  allowDrop = (event, initiativeId) => {
    event.preventDefault();
    this.lastDroppedElementId = initiativeId;
    if (document.getElementById(`drop-area-blue-square-` + initiativeId)) {
      document.getElementById(`drop-area-blue-square-` + initiativeId).style.display = '';
      document.getElementById(`drop-area-dotted-square-` + initiativeId).style.display = 'none';
    }
  };

  elementDropped = () => {
    this.leftCounter = this.enterCounter = 0;
    const data = this.initiatives.find((initiative, index) => this.movedMarker === initiative.icon);
    if (data) {
      data.icon = null;
    }
    this.initiatives.find((initiative, index) => index === this.lastDroppedElementId).icon = this.movedMarker;
    this.getSelectedIconList();
  };

  dragLeave = () => {
    this.leftCounter++;
    this.finalOperation();
  };

  submitBtnClicked(action) {
    if (action === 'cancel') {
      this.initiatives = this.oldInitiatives;
    }
    this.actionEvent.emit({ action, year: this.selectedYear, status, initiativeData: this.initiatives});
  }

  addIcon(e, index) {
    this.selectedInitiativeIndex = index;
    document.getElementById('mark-selector-mobile').classList.add('show-mark-selector');
  }

  addMarkIcon() {
    const data = this.initiatives.find((initiative, index) => this.activeElementIcon === initiative.icon);
    if (data) {
      data.icon = null;
    }
    document.getElementById('mark-selector-mobile').classList.remove('show-mark-selector');
    this.initiatives[this.selectedInitiativeIndex].icon = this.activeElementIcon;
    this.getSelectedIconList();
  }

  getSelectedIconList() {
    this.selectedIcons = [];
    this.initiatives.forEach((value) => {
      if (!!value.icon === true) {
        this.selectedIcons.push(value.icon);
      }
    });
  }

  isSelectedOrClickedIcon(icon) {
    if (icon === this.activeElementIcon) {
      return 'clicked';
    }
    return this.selectedIcons.includes(icon) ? 'selected' : null;
  }

  isFormNotFilledCompletely() {
    let formValueEmpty = false;
    this.initiatives.forEach((row) => {
      if (!!row.icon === false) {
        formValueEmpty = true;
      }
    });
    return formValueEmpty;
  }
}
