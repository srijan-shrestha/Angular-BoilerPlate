import { Component, OnInit, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { StructureColumnComponent } from '../structure-column/structure-column.component';
import { TeamMember } from 'src/app/shared/models/teamMember.model';

@Component({
  selector: 'app-structure-column-member',
  templateUrl: './structure-column-member.component.html',
  styleUrls: ['./structure-column-member.component.scss']
})
export class StructureColumnMemberComponent extends StructureColumnComponent implements OnInit, AfterViewInit {
  // @Input() selected: TeamLeader;

  private pTeamMembers: TeamMember[] = [];
  @Output() addUser = new EventEmitter<any>();
  @Output() employeeDropped = new EventEmitter<any>();
  @Output() openEmployeeSearchBox = new EventEmitter<any>();
  @Output() onOrgUnitAllMemberDeleteBtnClickEvent = new EventEmitter<any>();
  @Output() deleteCardMemberEvent = new EventEmitter<any>();

  @Output() personCardMoveStartEvent = new EventEmitter<any>();
  @Output() personCardMoveEndEvent = new EventEmitter<any>();
  dragging = false;
  draggedId = null;
  hoveredCardId = null;

  get teamMembers() {
    return this.pTeamMembers;
  }

  @Input()
  set teamMembers(teamMembers: TeamMember[]) {
    this.pTeamMembers = teamMembers;
    if (this.groupHeader) {
      this.updateSelectedHeaderElem(this.groupHeader.nativeElement);
    } else {
      this.updateSelectedHeaderElem(undefined);
    }
    setTimeout(() => {
      this.updateCoordinate();
    });

  }

  @ViewChild('groupHeader', {static: false}) groupHeader: ElementRef;
  @ViewChildren('groupHeader') groupHeaders: QueryList<ElementRef>;

  constructor(
    element: ElementRef,
    cd: ChangeDetectorRef,
  ) {
    super(element, cd);
  }

  ngAfterViewInit() {
    this.groupHeaders.changes
      .subscribe(() => {
        this.groupHeaders.forEach(groupHeader => {
          this.updateSelectedHeaderElem(groupHeader.nativeElement);
        });
      });
    // this.groupHeader.nativeElement.getBoundingClientRect();
    // debugger;

    // this.onCoordinateUpdated(undefined, this.groupHeader.nativeElement.getBoundingClientRect());
    // this.currentHeaderY = 120;

    // this.groupHeaders.changes // throws "Cannot read property 'changes' of undefined"
    // .subscribe(() => {
    //   console.log("WASSSSSUPPP");
    //   this.groupHeaders.forEach(groupHeader => {
    //     this.updateSelectedHeaderElem(groupHeader.nativeElement);
    //   });

    //   if (this.groupHeaders.length === 0) {
    //     this.updateSelectedHeaderElem(undefined);
    //   }
    //   // TODO: Find a better way of implementing this.
    //   setTimeout(() => {
    //     this.updateCoordinate();
    //   });

    // });
  }

  ngOnInit() {
  }


  allowAddUser(el) {
    // const users = this.leadershipList.
    this.addUser.emit(el);
    this.openEmployeeSearchBox.emit();
  }

  dropped = () => this.employeeDropped.emit({el: null, dropped: true});

  allowDrop = (event) => event.preventDefault();

  onOrgUnitDeleteBtnClick($event) {
    $event.stopPropagation();
    this.onOrgUnitAllMemberDeleteBtnClickEvent.emit({ type: 'team-member'});
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
    this.personCardMoveStartEvent.emit({from: 'team-member', employee: ev});
  }

  dragEndEvent(ev) {
    this.personCardMoveEndEvent.emit();
    this.dragging = false;
    const element = document.getElementById('drag-drop-paragraph');
    element.parentNode.removeChild(element);
    this.personCardMoveEndEvent.emit();
  }

  onCardMemberDeleteBtnClick(id) {
    this.deleteCardMemberEvent.emit({id, type: 'team-member'});
  }
}
