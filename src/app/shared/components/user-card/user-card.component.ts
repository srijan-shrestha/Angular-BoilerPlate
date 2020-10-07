import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from '../../models/user.model';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;
  @Input() emptyUser: boolean;
  @Input() active: boolean;
  @Input() draggable = false;
  @Input() selected = false;
  @Input() shouldShowTrashButton = true;
  @Input() dragging = true;
  @Input() draggedId = null;
  @Input() hoveredCardId = null;

  @Output() removeUser = new EventEmitter<UserModel>();
  @Output() addUser = new EventEmitter<UserModel>();
  @Output() showModal = new EventEmitter<UserModel>();
  @Output() onCardMemberDeleteBtnClicked = new EventEmitter<UserModel>();
  // @Output clicked = new EventEmitter<string>();
  showAddContent = false;

  public id: string;

  constructor() {
    this.id = uuid();
  }

  ngOnInit() {
    // this.user = {
    //   fullName: 'hello',
    //   profilePic: 'https://blaast-staging.s3.amazonaws.com/media/profile-picture/god_YeNEStB.png',
    //   profile: {
    //     jobTitle: 'Designer'
    //   }
    // };
  }

  // click
  userAction(user: UserModel) {
    if (this.draggable && !this.selected) {
      this.addUser.emit(user);
    } else {
      this.removeUser.emit(user);
    }
  }

  openUserModal(member: UserModel) {
    this.showModal.emit(member);
  }

  showAddOption() {
    if (!this.user.id) {
      this.showAddContent = true;
    }
  }

  hideAddOption() {
    if (!this.user.id) {
      this.showAddContent = false;
    }
  }

  isStructurePage = (): boolean => window.location.href.includes('structure');

  trashClicked = () => this.onCardMemberDeleteBtnClicked.emit();
}
