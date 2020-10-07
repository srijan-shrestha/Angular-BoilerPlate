import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {StructureColumnComponent} from '../structure-column/structure-column.component';
import {DepartmentLeader} from 'src/app/shared/models/departmentLeader.model';
import {Department} from 'src/app/shared/models/department.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddDepartmentComponent} from '../add-department/add-department.component';
import {Leadership} from 'src/app/shared/models/leadership.models';

@Component({
  selector: 'app-structure-column-department',
  templateUrl: './structure-column-department.component.html',
  styleUrls: ['./structure-column-department.component.scss']
})
export class StructureColumnDepartmentComponent extends StructureColumnComponent implements OnInit, AfterViewInit, OnChanges {

  // @ViewChildren('userCardWrapper') userCardWrappers: QueryList<ElementRef>;
  @ViewChildren('userCard') cardElements: QueryList<ElementRef>;

  // private updated = false;
  @ViewChildren('groupHeader') groupHeaders: QueryList<ElementRef>;
  @Input() selected: DepartmentLeader;
  @Output() addUser = new EventEmitter<any>();
  @Output() itemDropped = new EventEmitter<any>();
  @Output() onOrgUnitAllMemberDeleteBtnClickEvent = new EventEmitter<any>();
  @Output() deleteCardMemberEvent = new EventEmitter<any>();
  @Output() personCardMoveStartEvent = new EventEmitter<any>();
  @Output() personCardMoveEndEvent = new EventEmitter<any>();
  @Output() movementDetected = new EventEmitter<any>();
  @Output() shouldUpdateDepartmentLeader = new EventEmitter<any>();
  dragging = false;
  draggedId = null;
  selectedDepartmentId: number;
  // selectedDepartmentHeader: Element;
  @Input() selectedleader: Leadership;
  departmentLeaderHover: DepartmentLeader;
  @Output() newDepartmentCreated = new EventEmitter();
  @Output() openEmployeeSearchBox = new EventEmitter<any>();
  @Output() departmentLeaderSelected = new EventEmitter<DepartmentLeader>();
  open = {};
  openedDepartmendId: any;
  sortedDepartments = {};

  // sortedDepartments: {
  //   department: Department,
  //   departmentLeaders: DepartmentLeader[],
  //   collapse: boolean,
  // }[] = [];
  @Input() departments: Department[] = [];
  @Output() userUpdate = new EventEmitter<any>();
  private pDepartmentLeaders: DepartmentLeader[] = [];

  constructor(
    element: ElementRef,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal) {
    super(element, cd);
  }

  get departmentLeaders() {
    return this.pDepartmentLeaders;
  }

  @Input()
  set departmentLeaders(departmentLeaders: DepartmentLeader[]) {
    this.pDepartmentLeaders = departmentLeaders;
    this.updateSortedDepartments();
    // this.open = {};

    // const l = {};
    // departmentLeaders.forEach((departmentLeader) => {
    //   if (!(departmentLeader.department.id in l)) {
    //     l[departmentLeader.department.id] = {
    //       department: departmentLeader.department,
    //       departmentLeaders: [departmentLeader],
    //       collapse: true
    //     };
    //   } else {
    //     l[departmentLeader.department.id].departmentLeaders.push(departmentLeader);
    //   }
    //   // TODO: sort by department name.
    // });

    // this.sortedDepartments = [];

    // Object.entries(l).forEach((x: any) => {
    //   console.log(x[1]);
    //   this.sortedDepartments.push(x[1]);
    // });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.selectedDepartmentId = this.departments[0].id;
    //   this.open[this.selectedDepartmentId] = true;
    //   console.log('i am here');
    // }, 1000);
    this.cardElements.changes // throws "Cannot read property 'changes' of undefined"
      .subscribe(() => {
        this.cardElements.forEach(cardElement => {
          const cardId = cardElement.nativeElement.getAttribute('data-id');
          if (this.selected && cardId === this.selected.id.toString()) {
            this.updateSelectedUserCardElem(cardElement.nativeElement);
            this.updateCoordinate();
          }

        });
      });

    this.groupHeaders.changes // throws "Cannot read property 'changes' of undefined"
      .subscribe(() => {
        this.groupHeaders.forEach(groupHeader => {
          const groupHeaderId = groupHeader.nativeElement.getAttribute('data-id');
          if (this.selectedDepartmentId && groupHeaderId === this.selectedDepartmentId.toString()) {
            this.updateSelectedHeaderElem(groupHeader.nativeElement);
            this.updateCoordinate();
          }

        });
      });


    // this.userCardWrappers.changes.subscribe({
    //   next: () => {
    //     if (this.updated) {
    //       return false;
    //     }
    //     if (this.userCardWrappers.first) {
    //       this.updated = true;
    //       console.log(this.userCardWrappers.first.nativeElement);
    //       // this.userCardWrappers.first.nativeElement.click();
    //       // debugger;
    //     }
    //   }
    // });

    // (_ =>
    //   // this.processChildren() // subsequent calls to processChildren
    // );
  }

  ngOnChanges() {
    if (this.departments.length) {
      if (!this.openedDepartmendId) {
        this.selectedDepartmentId = this.departments[0].id;
        this.open[this.departments[0].id] = true;
      }
      this.openedDepartmendId = this.departments[0].id;
    }

    if (this.pDepartmentLeaders.length) {
      this.updateSortedDepartments();
    }
  }

  // ngAfterViewChecked() {
  //   if (this.departments.length) {
  //     this.selectedDepartmentId = this.departments[0].id;
  //     this.groupHeaders.changes.subscribe(
  //       () => {
  //         this.groupHeaders.forEach(groupHeader => {
  //           const groupHeaderId = groupHeader.nativeElement.getAttribute('data-id');
  //           if (this.selectedDepartmentId && groupHeaderId === this.selectedDepartmentId.toString()) {
  //             setTimeout(() => {

  //               this.updateSelectedHeaderElem(groupHeader.nativeElement);
  //               this.updateCoordinate();
  //             }, 2000);
  //           }
  //         });
  //       }
  //     );
  //   }
  // }

  updateSortedDepartments() {
    this.sortedDepartments = {};
    if (this.departments.length && this.departmentLeaders.length) {
      this.departments.forEach((department: Department) => {
        this.sortedDepartments[department.id] = [];
      });
      this.departmentLeaders.forEach(departmentLeader => {
        this.sortedDepartments[departmentLeader.department.id].push(departmentLeader);
      });
    }
  }


  showCardHoverOptions(departmentLeader) {
    this.departmentLeaderHover = departmentLeader;
  }

  hideCardHoverOptions() {
    this.departmentLeaderHover = undefined;
  }

  // createAssistantPlaceholder(leadership: Leadership) {
  //   leadership.assistants.push(new Assistant());
  // }

  onSelected(department: Department, departmentLeader?: DepartmentLeader, userCard?: Element, groupHeader?: HTMLElement) {
    this.updateSelectedUserCardElem(userCard);
    if (departmentLeader) {
      if (!departmentLeader.user.id) {
        this.userUpdate.emit(departmentLeader.id);
        this.openEmployeeSearchBox.emit();
        this.shouldUpdateDepartmentLeader.emit({update: true});
      } else {
        this.shouldUpdateDepartmentLeader.emit({update: false});
        this.userUpdate.emit(null);
      }
    }
    if (departmentLeader !== this.selected) {
      this.departmentLeaderSelected.emit(departmentLeader);
      this.updateCoordinate();
    }
    this.addUser.emit({
      department, departmentLeader, el: null
    });

    // console.log(userCard, userCard.getBoundingClientRect());
    // // setTimeout(() => {

    // //   console.log({
    // //     x: userCard ? userCard.getBoundingClientRect() as DOMRect : undefined,
    // //     y: groupHeader ? groupHeader.getBoundingClientRect() as DOMRect : undefined
    // //   });
    // this.departmentLeaderSelected.emit(departmentLeader);
    // this.onCoordinateUpdated(
    //   userCard ? userCard.getBoundingClientRect() as DOMRect : undefined,
    //   groupHeader ? groupHeader.getBoundingClientRect() as DOMRect : undefined
    // );
    // this.toggle(departmentLeader.department.id, true);
    // // }, 1000);
  }

  toggle(departmentId, groupHeader: Element, open?: boolean) {
    const next = open || !this.open[departmentId];

    Object.keys(this.open).forEach(key => {
      this.open[key] = false;
    });
    this.open[departmentId] = next;
    if (next) {
      if (departmentId !== this.selectedDepartmentId) {
        this.departmentLeaderSelected.emit(null);
      }
      this.selectedDepartmentId = departmentId;
      // this.selectedDepartmentHeader = groupHeader;
      this.updateSelectedHeaderElem(groupHeader);
      this.updateCoordinate();

    } else {
      this.departmentLeaderSelected.emit(null);
      this.selectedDepartmentId = null;
      // this.departmentLeaderSelected.emit(null);
      // this.selectedDepartmentHeader = undefined;

      this.updateSelectedHeaderElem(undefined);
      this.updateCoordinate();
    }

  }

  allowAddUser(department, el) {
    // const users = this.leadershipList.
    this.addUser.emit({
      department, el
    });
    this.userUpdate.emit(null);
    this.openEmployeeSearchBox.emit();
  }

  openDepartmentModal() {
    const modalRef = this.modalService.open(AddDepartmentComponent, {centered: true}).result.then((result) => {
      if (result === 'success') {
        console.log('here');
        this.newDepartmentCreated.emit();
      }
    });
  }

  dropped(department: Department, departmentLeader?: DepartmentLeader) {
    this.itemDropped.emit({
      department, departmentLeader, el: null, dropped: true
    });
  }

  allowDrop(event, departmentId) {
    event.preventDefault();
    this.movementDetected.emit({orgElement: 'department', hovered: true, entityId: departmentId});
  }

  dragLeft = (event, departmentId) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    this.movementDetected.emit({orgElement: 'department', hovered: false, entityId: departmentId});
  }

  OnOrgUnitDeleteBtnClick($event, id, groupHeader: Element) {
    $event.stopPropagation();
    this.onOrgUnitAllMemberDeleteBtnClickEvent.emit({id, type: 'department'});
    const department = this.departments[0];
    if (department) {
      this.selectedDepartmentId = department.id;
      this.updateSelectedHeaderElem(groupHeader);
      this.updateCoordinate();
    }

  }

  onCardMemberDeleteBtnClick(id) {
    this.deleteCardMemberEvent.emit({id, type: 'department'});
  }

  dragStartEvent(event, ev) {
    const node = event.target.cloneNode(true);
    node.style.width = '300px';
    const para = document.createElement('p');
    para.setAttribute('id', 'drag-drop-paragraph');
    document.body.appendChild(para);
    para.appendChild(node);
    event.dataTransfer.setDragImage(node, 0, 0);
    this.dragging = true;
    this.draggedId = ev.user.id;
    this.personCardMoveStartEvent.emit({from: 'department', employee: ev});
  }

  dragEndEvent(ev) {
    this.personCardMoveEndEvent.emit();
    this.dragging = false;
    const element = document.getElementById('drag-drop-paragraph');
    element.parentNode.removeChild(element);
    this.draggedId = null;
  }
}
