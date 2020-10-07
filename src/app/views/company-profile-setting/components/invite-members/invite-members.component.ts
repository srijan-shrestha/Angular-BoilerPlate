import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MembersService} from '../../services/members.service';
import {Company} from 'src/app/shared/models/company.models';
import {CompanyService} from 'src/app/shared/services/company.service';
import {ToastrService} from 'ngx-toastr';
import {UserRoleModel} from '../../../../shared/models/user-role.model';


@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.scss']
})
export class InviteMembersComponent implements OnInit {
  inviteForm: FormGroup;
  multipleMemberForm: FormGroup;
  showCloseIcon = false;
  @ViewChild('addMultipleMember', {static: false}) enableModal: TemplateRef<any>;
  @ViewChild('multipleMember', {static: true}) multipleMember: ElementRef;
  company: Company;
  loading = false;
  roles: UserRoleModel;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private inviteSerivce: MembersService,
    private modalService: NgbModal,
    private companyService: CompanyService,
    private toastrService: ToastrService,
  ) {
  }

  get memberList(): FormArray {
    return this.inviteForm.get('memberList') as FormArray;
  }

  ngOnInit() {
    this.companyService.data.subscribe((company: Company) => {
      this.company = company;
    });
    this.inviteForm = this.formBuilder.group({
      memberList: this.formBuilder.array([this.createMember()])
    });
    this.multipleMemberForm = new FormGroup({
      multipleInvites: new FormControl('')
    });
  }

  createMember(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      role: ['', Validators.required],
      fullName: ''
    });
  }

  addMember() {
    const memberList = this.inviteForm.get('memberList') as FormArray;
    memberList.push(this.createMember());
    if (memberList.length > 0) {
      this.showCloseIcon = true;
    }
  }

  deleteMemberArray(i) {
    this.memberList.removeAt(i);
    if (this.memberList.length === 1) {
      this.showCloseIcon = false;
    }
  }

  onSubmit() {
    this.loading = true;
    const data = this.inviteForm.get('memberList').value;
    this.inviteSerivce.inviteMember(data).subscribe(
      res => {
        this.loading = false;
        this.activeModal.close();
        this.toastrService.success('Invited member successfully', 'Success');
      },
      err => {
        this.loading = false;
      }
    );
  }

  close() {
    this.activeModal.close();
  }

  openAddMultipleMember() {
    this.modalService.dismissAll();
    this.modalService.open(this.enableModal, {windowClass: 'custom-modal', centered: true, size: 'lg'}).result
      .then(() => {
      }, () => {
      });
  }

  onMultipleMemberSubmit() {
    const data = String(this.multipleMemberForm.get('multipleInvites').value);
    const regexp = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const array = data.split(',');
    for (let i = 0; i < array.length; i++) {
      if (!regexp.test(array[i].trim())) {
        // const invalidElements = this.multipleMember.nativeElement.querySelectorAll('.ng-invalid');
        // if ( invalidElements.length > 0) {
        //   invalidElements[0].firstElementChild.focus();
        // }
        // return;
      }
    }
    const memberData = array.map(email => {
      return {email: email.trim()};
    });
    this.loading = true;
    this.inviteSerivce.inviteMember(memberData).subscribe(
      res => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toastrService.success('Invited members successfully', 'Success');
      },
      err => {
        this.loading = false;
      }
    );
  }
}
