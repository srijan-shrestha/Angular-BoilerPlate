import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import {StructureColumnComponent} from '../structure-column/structure-column.component';
import {Leadership} from 'src/app/shared/models/leadership.models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-structure-column-leadership',
  templateUrl: './structure-column-leadership.component.html',
  styleUrls: ['./structure-column-leadership.component.scss']
})
export class StructureColumnLeadershipComponent extends StructureColumnComponent implements OnInit, AfterViewInit {
  // private pLeadershipList: Leadership[];
  // get leadershipList() {
  //   return this.pLeadershipList;
  // }

  // @Input()
  // set leadershipList(l: Leadership[]) {
  //   this.pLeadershipList = l;
  //   // this.findAndUpdateSelected();
  // }

  @Input() leadershipList: Leadership[];

  // private pSelected: Leadership;

  @ViewChildren('cardElem') cardElements: QueryList<ElementRef>;

  // get selected() {
  //   return this.pSelected;
  // }

  // @Input()
  // set selected(l: Leadership) {
  //   this.pSelected = l;
  //   // console.log(this.cardElements);
  //   // this.findAndUpdateSelected();
  // }

  @Input() selected: Leadership;

  leadershipHover: Leadership;
  addAssistantPlaceholder = {};
  dragging = false;
  draggedId = null;

  @Output() leadershipSelected = new EventEmitter<Leadership>();
  @Output() addUser = new EventEmitter<any>();
  @Output() employeeDropped = new EventEmitter<any>();
  @Output() addAssistant = new EventEmitter<any>();
  @Output() updateUser = new EventEmitter<any>(); // leadership id to update
  @Output() openEmployeeSearchBox = new EventEmitter<any>();
  @Output() deleteCardMemberEvent = new EventEmitter<any>();
  @Output() personCardMoveStartEvent = new EventEmitter<any>();
  @Output() personCardMoveEndEvent = new EventEmitter<any>();
  // // When new user is to be added.
  // // Emits existing users which needs to be excluded when adding new user.
  // @Output() addUser = new EventEmitter<UserModel[]>();

  constructor(
    element: ElementRef,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal) {
    super(element, cd);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cardElements.changes // throws "Cannot read property 'changes' of undefined"
      .subscribe(() => {
        this.cardElements.forEach(cardElement => {
          // console.log(cardElement);

          const cardId = cardElement.nativeElement.getAttribute('data-id');
          if (this.selected && cardId === this.selected.id.toString()) {
            this.updateSelectedUserCardElem(cardElement.nativeElement);
            this.updateCoordinate();
          }

        });
      });
  }


  showCardHoverOptions(leadership) {
    this.leadershipHover = leadership;
  }

  hideCardHoverOptions() {
    this.leadershipHover = undefined;
  }

  createAssistantPlaceholder(leadership: Leadership) {
    // leadership.assistants.push(new Assistant());
    if (leadership.id in this.addAssistantPlaceholder) {
      this.addAssistantPlaceholder[leadership.id] = !this.addAssistantPlaceholder[leadership.id];
    } else {
      this.addAssistantPlaceholder[leadership.id] = true;
    }

  }

  onLeadershipSelected(leadership: Leadership, cardElem: HTMLElement) {
    this.updateSelectedUserCardElem(cardElem);
    if (leadership) {
      if (!leadership.leader.id) {
        this.updateUser.emit(leadership.id); // if leadership has no user emmitted the id for update
        this.openEmployeeSearchBox.emit();
      } else {
        this.updateUser.emit(null);
      }
    }
    if (leadership !== this.selected) {
      this.leadershipSelected.emit(leadership);
      // this.onCoordinateUpdated(cardElem.getBoundingClientRect() as DOMRect);
      this.updateCoordinate();
    }
    this.addUser.emit({el: null, leadership});
  }

  allowAddUser(el) {
    this.addUser.emit({el, leadership: null});
    this.updateUser.emit(null); // emits null when adding a new user.
    this.openEmployeeSearchBox.emit();
  }

  allowAddAssistant(el, leadership) {
    this.addAssistant.emit({el, leadership});
  }


  dropped = () => this.employeeDropped.emit({el: null, leadership: null, dropped: true});

  allowDrop = dragEvent => dragEvent.preventDefault();

  onCardMemberDeleteBtnClick(id) {
    this.deleteCardMemberEvent.emit({id, type: 'leadership'});
  }

  dragStartEvent(event, employee) {
    const node = event.target.cloneNode(true);
    node.style.width = '300px';
    node.style.opacity = 0.1;
    const para = document.createElement('p');
    para.setAttribute('id', 'drag-drop-paragraph');
    document.body.appendChild(para);
    para.appendChild(node);
    node.style.opacity = 1;
    event.dataTransfer.setDragImage(node, 0, 0);
    this.personCardMoveStartEvent.emit({from: 'leadership', employee});
    this.dragging = true;
    this.draggedId = employee.leader.id;
  }

  dragEndEvent(ev) {
    this.personCardMoveEndEvent.emit();
    this.dragging = false;
    const element = document.getElementById('drag-drop-paragraph');
    element.parentNode.removeChild(element);
    this.draggedId = null;
  }
}
