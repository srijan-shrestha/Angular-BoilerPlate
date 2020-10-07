import {Component, Input, OnInit} from '@angular/core';
import {UserRoleModel} from '../../../../../shared/models/user-role.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MembersService} from '../../../services/members.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from '../../../../../shared/services/profile.service';

@Component({
  selector: 'app-edit-member-role',
  templateUrl: './edit-member-role.component.html',
  styleUrls: ['./edit-member-role.component.scss']
})
export class EditMemberRoleComponent implements OnInit {
  memberDetailForm: FormGroup;
  @Input() id: string;
  @Input() roles: UserRoleModel;
  @Input() defaultSelected: string;
  @Input() isUser: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private inviteMemberService: MembersService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal,
    private userProfileService: ProfileService
  ) {
  }

  ngOnInit() {
    this.memberDetailForm = this.fb.group({
      role: [this.defaultSelected, [Validators.required]]
    });
  }

  updateRole() {
    this.loading = true;
    if (this.isUser) {
      this.inviteMemberService.updateUser(this.id, this.memberDetailForm.value).subscribe((res) => {
        this.toastrService.success('User role updated successfully.', 'Success!');
        this.activeModal.dismiss('close');
      }, error => {
        this.toastrService.error('Unable to update role', 'Error!');
        this.loading = false;
      });

    } else {
      this.inviteMemberService.memberUpdate(this.id, this.memberDetailForm.value).subscribe((res) => {
        this.toastrService.success('Member role updated successfully.', 'Success!');
        this.activeModal.dismiss('close');
      }, error => {
        this.toastrService.error('Unable to update role', 'Error!');
        this.loading = false;
      });

    }
  }

}
