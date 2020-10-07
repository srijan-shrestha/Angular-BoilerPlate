import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { StructureColumnComponent } from '../structure-column/structure-column.component';
import { TeamLeader } from 'src/app/shared/models/teamLeader.model';
import { Team } from 'src/app/shared/models/team.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentLeader } from 'src/app/shared/models/departmentLeader.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-structure-column-team',
  templateUrl: './structure-column-team.component.html',
  styleUrls: ['./structure-column-team.component.scss']
})
export class StructureColumnTeamComponent extends StructureColumnComponent implements OnInit, AfterViewInit, OnChanges {
  private pTeamAndTeamLeaders: { team: Team, teamLeaders: TeamLeader[] }[] = [];
  @Input() selected: TeamLeader;

  @Output() teamLeaderSelected = new EventEmitter<TeamLeader>();
  @Output() reload = new EventEmitter();
  @Output() addUser = new EventEmitter<any>();
  @Output() employeeDropped = new EventEmitter();
  @Output() updateUser = new EventEmitter<any>();
  @Output() openEmployeeSearchBox = new EventEmitter<any>();
  @Output() onOrgUnitAllMemberDeleteBtnClickEvent = new EventEmitter<any>();
  @Output() deleteCardMemberEvent = new EventEmitter<any>();
  @Output() personCardMoveStartEvent = new EventEmitter<any>();
  @Output() personCardMoveEndEvent = new EventEmitter<any>();
  @Output() movementDetected = new EventEmitter<any>();
  @Output() shouldUpdateTeamLeader = new EventEmitter<any>();
  openedTeamId: any;
  updated = false;
  userSelected = false;
  previousSelected: any;
  dragging = false;
  draggedId = null;

  selectedTeamId: number;

  open = {};

  sortedTeams = {};

  get teamAndTeamLeaders() {
    return this.pTeamAndTeamLeaders;
  }

  @Input()
  set teamAndTeamLeaders(teamAndTeamLeaders: { team: Team, teamLeaders: TeamLeader[] }[]) {
    this.pTeamAndTeamLeaders = teamAndTeamLeaders;
    this.userSelected = false;
    const selectedTeam = teamAndTeamLeaders ? teamAndTeamLeaders.find((t) => {
      return t.team.id === this.selectedTeamId;
    }) : null;
    if (!selectedTeam) {
      // TODO: find better way to implement this.
      this.open = {};
      // setTimeout(() => {
      // this.open = {};
      // this.currentHeaderY = null;
      // this.selectedTeamId = null;
      // });
    }

    // console.log(teamAndTeamLeaders, this.selectedTeamId)
  }

  teams: Team[];
  @Input() departmentLeader: DepartmentLeader;
  @ViewChild('addTeam', { static: false }) enableModal: TemplateRef<any>;
  @ViewChildren('userCard') cardElements: QueryList<ElementRef>;
  @ViewChildren('groupHeader') groupHeaders: QueryList<ElementRef>;

  teamForm = new FormGroup({
    departmentLeader: new FormControl(''),
    teamName: new FormControl(''),
  });

  constructor(
    element: ElementRef,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private teamService: TeamService
  ) {
    super(element, cd);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.teamAndTeamLeaders) { // draws the line and toggle the team according to the condition
      if (this.teamAndTeamLeaders.length) {
        this.previousSelected = this.selectedTeamId;
        this.selectedTeamId = this.teamAndTeamLeaders[0].team.id;
        this.open[this.teamAndTeamLeaders[0].team.id] = true;
        if (this.updated) {
          this.open[this.openedTeamId] = false;
        }
        if (this.userSelected) {

          if (this.previousSelected) {
            Object.keys(this.open).forEach(key => {
              this.open[key] = false;
            });
          }
          this.selectedTeamId = this.previousSelected;
          this.open[this.selectedTeamId] = true;
        }
        this.openedTeamId = this.teamAndTeamLeaders[0].team.id;
      }
    }
  }

  ngAfterViewInit() {
    this.cardElements.changes // throws "Cannot read property 'changes' of undefined"
      .subscribe(() => {
        this.cardElements.forEach(cardElement => {
          const cardId = cardElement.nativeElement.getAttribute('data-id');
          if (this.selected && cardId === this.selected.id.toString()) {
            this.updateSelectedUserCardElem(cardElement.nativeElement);
          }
        });

        // TODO: Find a better way of implementing this.
        setTimeout(() => {
          this.updateCoordinate();
        });
      });

    this.groupHeaders.changes // throws "Cannot read property 'changes' of undefined"
      .subscribe(() => {
        this.groupHeaders.forEach(groupHeader => {
          const groupHeaderId = groupHeader.nativeElement.getAttribute('data-id');
          if (this.selectedTeamId && groupHeaderId === this.selectedTeamId.toString()) {
            this.updateSelectedHeaderElem(groupHeader.nativeElement);
          }
        });

        if (this.groupHeaders.length === 0) {
          this.updateSelectedHeaderElem(undefined);
        }
        // TODO: Find a better way of implementing this.
        setTimeout(() => {
          this.updateCoordinate();
        });

      });
  }

  // updateSortedTeams() {
  //   this.sortedTeams = {};
  //   this.teams = [];
  //   if (this.teamLeaders) {
  //     this.teamLeaders.forEach(teamLeader => {
  //       if (!(teamLeader.team.id in this.sortedTeams)) {
  //         this.sortedTeams[teamLeader.team.id] = [teamLeader];
  //         this.teams.push(teamLeader.team);
  //       } else {
  //         this.sortedTeams[teamLeader.team.id].push(teamLeader);
  //       }
  //     });
  //   }
  // }


  onSelected(team: Team, teamLeaders: TeamLeader[], teamLeader?: TeamLeader, userCard?: Element, groupHeader?: HTMLElement) {
    this.updateSelectedUserCardElem(userCard);
    if (teamLeader) {
      if (!teamLeader.user.id) {
        this.shouldUpdateTeamLeader.emit({update: true});
        this.updateUser.emit(teamLeader.id);
        this.openEmployeeSearchBox.emit();
      } else {
        this.shouldUpdateTeamLeader.emit({update: false});
        this.updateUser.emit(null);
      }
    }
    if (teamLeader !== this.selected) {
      this.teamLeaderSelected.emit(teamLeader);
      this.userSelected = true;
      this.updateCoordinate();
    }
    this.addUser.emit({
      team, teamLeaders, el: null
    });
    // this.teamLeaderSelected.emit(teamLeader);
    // this.onCoordinateUpdated(
    //   event ? event.currentTarget.getBoundingClientRect() : undefined,
    //   groupHeader ? groupHeader.getBoundingClientRect() as DOMRect : undefined
    // );
  }

  toggle(teamId, groupHeader: Element, open?: boolean) {
    // this.updated = true;
    // this.userSelected = false;

    const next = open || !this.open[teamId];
    Object.keys(this.open).forEach(key => {
      this.open[key] = false;
    });
    this.open[teamId] = next;
    if (next) {
      if (teamId !== this.selectedTeamId) {
        this.teamLeaderSelected.emit(null);
      }
      this.selectedTeamId = teamId;
      this.updateSelectedHeaderElem(groupHeader);
      this.updateCoordinate();

    } else {
      this.teamLeaderSelected.emit(null);
      this.selectedTeamId = null;

      this.updateSelectedHeaderElem(undefined);
      this.updateCoordinate();

    }

    // this.onSelected();
  }

  openModal() {
    this.modalService.open(this.enableModal, { windowClass: 'custom-modal', centered: true, size: 'sm' }).result
      .then(() => {
      }, () => {
        // this.getDismission();
      });
  }

  onSubmit() {
    // console.log(this.departmentLeader);
    // return;
    // this.teamForm.value['departmentLeader'] = this.departmentLeader.id;
    this.teamForm.patchValue({
      departmentLeader: this.departmentLeader.id
    });
    this.teamService.addTeam(this.teamForm.value).subscribe(
      res => {
        this.reload.emit();
        this.teamForm.reset();
        this.modalService.dismissAll();
      },
      err => {
        console.log(err);
      }
    );
  }

  allowAddUser(team, teamLeaders, el) {
    // const users = this.leadershipList.
    this.addUser.emit({
      team, teamLeaders, el
    });
    this.updateUser.emit(null);
    this.openEmployeeSearchBox.emit();
  }

  dropped = (team, teamLeaders, el) => this.employeeDropped.emit({team, teamLeaders, el, dropped: true});

  allowDrop = (dragEvent, teamId) => {
    dragEvent.preventDefault();
    this.movementDetected.emit({orgElement: 'team', hovered: true, entityId: teamId});
  }

  dragLeft = (event, teamId) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    this.movementDetected.emit({orgElement: 'team', hovered: false, entityId: teamId});
  }

  OnOrgUnitDeleteBtnClick($event, id) {
    $event.stopPropagation();
    this.onOrgUnitAllMemberDeleteBtnClickEvent.emit({id, type: 'team-leader'});
  }

  onCardMemberDeleteBtnClick(id) {
    this.deleteCardMemberEvent.emit({id, type: 'team-leader'});
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
    this.personCardMoveStartEvent.emit({from: 'team-leader', employee: ev});
  }
  dragEndEvent(ev) {
    this.dragging = false;
    const element = document.getElementById('drag-drop-paragraph');
    element.parentNode.removeChild(element);
    this.personCardMoveEndEvent.emit();
  }
}
