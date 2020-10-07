import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MembersService} from '../../../services/members.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-member-email',
  templateUrl: './edit-member-email.component.html',
  styleUrls: ['./edit-member-email.component.scss']
})
export class EditMemberEmailComponent implements OnInit {

  memberDetailForm: FormGroup;
  @Input() id: string;
  @Input() isUser: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private inviteMemberService: MembersService,
    private toastrService: ToastrService,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.memberDetailForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  updateEmail() {
    this.loading = true;
    if (this.isUser) {
      this.inviteMemberService.updateUser(this.id, this.memberDetailForm.value).subscribe((res) => {
        this.toastrService.success('User email updated successfully.', 'Success!');
        this.activeModal.dismiss('close');
      }, error => {
        this.toastrService.error('Unable to update email', 'Error!');
        this.loading = false;
      });

    } else {
      this.inviteMemberService.memberUpdate(this.id, this.memberDetailForm.value).subscribe((res) => {
        this.toastrService.success('Member email updated successfully.', 'Success!');
        this.activeModal.dismiss('close');
      }, error => {
        this.toastrService.error('Unable to update email', 'Error!');
        this.loading = false;
      });
    }
  }

}
