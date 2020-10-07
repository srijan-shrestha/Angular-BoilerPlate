import {Component, OnInit} from '@angular/core';
import {MembersService} from '../../services/members.service';
import {InviteMembersComponent} from '../invite-members/invite-members.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import orderBy from 'lodash/orderBy';
import {ToastrService} from 'ngx-toastr';
import {ResetPasswordService} from 'src/app/shared/services/reset-password.service';
import {EditMemberEmailComponent} from './edit-member-email/edit-member-email.component';
import {EditMemberRoleComponent} from './edit-member-role/edit-member-role.component';
import {UserRoleModel} from '../../../../shared/models/user-role.model';
import {RoleService} from '../../../../shared/services/roles.service';

@Component({
  selector: 'app-security-invites',
  templateUrl: './security-invites.component.html',
  styleUrls: ['./security-invites.component.scss']
})
export class SecurityInvitesComponent implements OnInit {
  invitedMembers: any[] = [];
  userNameEmailFilter = '';
  prevSearch = '';
  roles: UserRoleModel[] = [];

  invitedMembersColumns = [
    'name',
    'email',
    'inviteDate',
    'status',
    'role',
    'delete'
  ];

  constructor(
    private inviteMemberService: MembersService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private passwordReset: ResetPasswordService,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.getInvitedMembers();
    this.roleService.getRoles().subscribe((roles: UserRoleModel[]) => {
      this.roles = roles;
    });
  }

  openInviteMembersModal() {
    const modalRef = this.modalService.open(InviteMembersComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.roles = this.roles;
    modalRef.result.finally(() => {
      this.userNameEmailFilter = '';
      this.filter(true);
    });
  }

  openEditRoleModal(id, role, isUser) {
    const modalRef = this.modalService.open(EditMemberRoleComponent, {centered: true});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.roles = this.roles;
    modalRef.componentInstance.defaultSelected = role;
    modalRef.componentInstance.isUser = isUser;
    modalRef.result.finally(() => {
      this.filter(true);
    });
  }

  openEditEmailModal(id, isUser) {
    const modalRef = this.modalService.open(EditMemberEmailComponent, {centered: true});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isUser = isUser;
    modalRef.result.finally(() => {
      this.filter(true);
    });
  }

  deleteInvitedMember(id, isUser, isActive) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'}
    );
    if (isUser) {
      if (isActive) {
        modalRef.componentInstance.title = 'You are about to deactivate';
        modalRef.componentInstance.body = 'Are you sure you want to deactivate this user?';
        modalRef.componentInstance.type = 'danger';
        modalRef.componentInstance.acceptText = 'Deactivate';
        modalRef.componentInstance.declineText = 'Cancel';
        modalRef.result.then((result: 'accept' | 'decline') => {
          if (result === 'accept') {
            this.inviteMemberService.updateUser(id, {is_active: false}).subscribe(
              res => {
                this.filter(true);
                this.toastrService.success('Successfully deactivated the user.', 'Success');
              });
          }
        });
      } else {
        modalRef.componentInstance.message = 'Are you sure you want to activate this user?';
        modalRef.componentInstance.type = 'warn';
        modalRef.componentInstance.acceptText = 'Activate';
        modalRef.componentInstance.declineText = 'Cancel';
        modalRef.result.then((result: 'accept' | 'decline') => {
          if (result === 'accept') {
            this.inviteMemberService.updateUser(id, {is_active: true}).subscribe(
              res => {
                this.filter(true);
                this.toastrService.success('Successfully activated the user.', 'Success');
              });
          }
        });
      }
    } else {
      modalRef.componentInstance.message = 'Are you sure you want to remove the member?';
      modalRef.componentInstance.type = 'warn';
      modalRef.componentInstance.acceptText = 'Remove';
      modalRef.componentInstance.declineText = 'Cancel';
      modalRef.result.then((result: 'accept' | 'decline') => {
        if (result === 'accept') {
          this.inviteMemberService.deleteInvitedMembers(id).subscribe(
            res => {
              this.filter(true);
              this.toastrService.success('Successfully removed the member.', 'Success');
            });
        }
      });
    }
  }

  resetMemberPassword(email) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true}
    );
    modalRef.componentInstance.title = 'You are about to reset password';
    modalRef.componentInstance.body = 'Are you sure you want to reset the member password and send email?';
    modalRef.componentInstance.type = 'warning';
    modalRef.componentInstance.acceptText = 'Reset Password';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.passwordReset.forgotPassword(email).subscribe(
          res => {
            this.toastrService.success('Successfully sent a reset password email.', 'Success');
          }, err => {
            this.toastrService.success('Something went wrong while sending email.', 'Error');
          });
      }
    });
  }

  sort({orderKey, orderDir}) {
    this.invitedMembers = orderBy(this.invitedMembers, [orderKey], [orderDir]);
  }

  activateTwoFactor() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true}
    );
    modalRef.componentInstance.title = 'You are about to activate two-factor';
    modalRef.componentInstance.body = 'Are you sure you want to activate two-factor for the company?';
    modalRef.componentInstance.type = 'warning';
    modalRef.componentInstance.acceptText = 'Activate';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
      }
    });
  }

  forcePasswordReset() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true}
    );
    modalRef.componentInstance.title = 'You are about to force reset';
    modalRef.componentInstance.body = 'Are you sure you want force password reset on all members?';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Reset password';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
      }
    });
  }

  filter = (fetch = false): void => {
    if (!fetch && (this.prevSearch === this.userNameEmailFilter)) {
      return;
    }
    this.prevSearch = this.userNameEmailFilter;
    if (this.userNameEmailFilter) {
      this.getInvitedMembers({
        search: this.userNameEmailFilter
      });
    } else {
      this.getInvitedMembers();
    }
  }

  getInvitedMembers(filterParams = {}) {
    this.inviteMemberService.getInvitedMembers(filterParams).subscribe((res) => {
      this.invitedMembers = res;
      this.getUsers(filterParams);
    }, err => {
      console.log(err);
    });
  }

  getUsers(filterParams = {}) {
    this.inviteMemberService.getUsers(filterParams).subscribe((res) => {
      this.invitedMembers = this.invitedMembers.concat(res);
    }, err => {
      console.log(err);
    });
  }

}
