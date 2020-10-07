import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models/user.model';
import { UserRoleModel } from '../../models/user-role.model';
import { RoleService } from '../../services/roles.service';
import { MembersService } from '../../../views/company-profile-setting/services/members.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {
  public selectedMember: any;
  data: any;

  get member() {
    return this.selectedMember;
  }

  @Input()
  set member(val) {
    this.selectedMember = val;
    this.patchUserValue(this.selectedMember);
  }

  roles: UserRoleModel[];

  profileForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RoleService,
    private memberService: MembersService
  ) {
    this.profileForm = new FormGroup({
      fullName: new FormControl('', {}),
      createdAt: new FormControl('', {}),
      department: new FormControl('', {}),
      jobTitle: new FormControl('', {}),
      email: new FormControl('', {}),
      role: new FormControl('', {}),
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe(
      (response) => {
        this.roles = response;
      }
    );
  }

  patchUserValue(user: UserModel) {
    this.profileForm.patchValue({
      fullName: user.fullName ? user.fullName : '',
      createdAt: user.createdAt ? new Date(user.createdAt).toDateString().substring(4) : '',
      department: '',
      jobTitle: user.profile ? user.profile.jobTitle : '',
      email: user.email ? user.email : '',
      role: user.role ? user.role.id : null
    });
  }


  saveProfile() {
    if (this.selectedMember.profile) {
      this.data = {
        ...this.selectedMember,
        role: this.profileForm.value.role,
        profile: {
          ...this.selectedMember.profile,
          state: this.selectedMember.profile.state ? this.selectedMember.profile.state.id : '',
          timezone: this.selectedMember.profile.timezone ? this.selectedMember.profile.timezone.id : '',
          jobTitle: this.profileForm.value.jobTitle
        }
      };
    } else {
      this.data = {
        ...this.selectedMember,
        role: this.profileForm.value.role,
        profile: {
          state: '',
          timezone: '',
          jobTitle: this.profileForm.value.jobTitle
        }
      };
    }

    this.memberService.memberUpdate(this.selectedMember.id, this.data).subscribe(
      (resp) => {
        this.activeModal.close(resp);
      }
    );
  }

}
