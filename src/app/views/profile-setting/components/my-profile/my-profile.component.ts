import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfileSettingService } from '../../services/profile-setting.service';
import { UserModel } from '../../../../shared/models/user.model';
import { GlobalDropdownService } from '../../../../shared/services/global-dropdown.service';
import { StateModel } from '../../../../shared/models/state.model';
import { TimezoneModel } from '../../../../shared/models/timezone.model';
import { DesignationModel } from '../../../../shared/models/designation.models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../../shared/services/profile.service';
import { ProfilePicService } from '../../services/profile-pic.service';
import { CompanyProfileService } from 'src/app/views/company-profile-setting/services/company-profile.service';
import { CompanyService } from 'src/app/views/company/services/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileImageEditComponent } from '../profile-image-edit/profile-image-edit.component';
import { CommonService } from '../../../../shared/services/common.service';
import {AuthService} from '../../../../shared/services/auth.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userPersonalDetailForm: FormGroup;
  userGeneralDetailForm: FormGroup;
  userProfile: UserModel;
  loading = false;
  profileData: any;
  profileDataTemp: any;
  imgURL: any;
  companyName: string;
  userName: string;
  userEmail: string;
  birthDate: string;
  hireDate: string;
  department: string;
  role: string;
  roleSwitch: boolean;
  disableTest = true;
  imgLabel = '';
  bioText: any;
  editing = {bio: false};
  quillOptions = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  imageUploadForm = new FormGroup({
    image: new FormControl(''),
    isNew: new FormControl(true) // true if image is uploaded by user and not received from backend.
  });


  constructor(private fb: FormBuilder,
              private profileSettingService: ProfileSettingService,
              private profileService: ProfileService,
              private globalDropdownService: GlobalDropdownService,
              private toastrService: ToastrService,
              private profilePic: ProfilePicService,
              private companyService: CompanyProfileService,
              private companyDataService: CompanyService,
              private modalService: NgbModal,
              private commonService: CommonService,
              private authService: AuthService
              ) { }
  states: StateModel[];
  timezones: TimezoneModel[];
  // departments: DepartmentModel[];
  jobTitles: DesignationModel[];

  ngOnInit() {
    this.userPersonalDetailForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      profile: this.fb.group({
        bio: [''],
        birthDate: ['', [Validators.required]],
        hiringDate: ['', [Validators.required]],
      }),
    });

    this.userGeneralDetailForm = this.fb.group({
      profile: this.fb.group({
        jobTitle: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: [1, [Validators.required]],
        timezone: ['', [Validators.required]],
      }),
    });
    this.getProfile();

    this.authService.getUserRole().subscribe((role: any) => {
      if (!role) {
        return;
      }
      this.role = role.user_role;
      if (this.role === 'company_admin') {
        this.roleSwitch = true;
      } else {
        this.roleSwitch = false;
      }
    });
  }

  onPicChange($event) {
    this.profileData = $event;
    this.imageUploadForm.patchValue({
      isNew: true
    });

    const reader = new FileReader();
    reader.readAsDataURL(this.profileData);
    reader.onload = (event) => {
      this.profileData.imageUrl = reader.result;
      this.openCropModal();
    };

  }

  openCropModal() {
    this.profileDataTemp = {...this.profileData};
    const modalRef = this.modalService.open(ProfileImageEditComponent, {size: 'xl', centered: true,
      windowClass: 'profile-image-metadata-modal'});
    const image = this.profileData;
    modalRef.componentInstance.images = {
      image,
      fileName: image.name,
      fileType: image.type,
      fileSize: this.commonService.bytesToSize(image.size),
      publishDate: new Date(),
      imageUrl: image.imageUrl,
    };
    modalRef.componentInstance.duplicateImage = this.profileDataTemp;
    modalRef.componentInstance.editedImage.subscribe((receivedImage) => {
      this.imgURL = receivedImage;
      this.profileData = this.commonService.dataURLtoFile(receivedImage, image.name);
    });
  }

  uploadImage() {
    const data = new FormData();
    data.append('profile_pic', this.profileData);
    this.profilePic.uploadPicture(data).subscribe(
      (res: any) => {
        this.profileService.setProfileImage(res.profilePic);
        this.imageUploadForm.patchValue({
          isNew: false
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  // getDepartments() {
  //   this.profileSettingService.getDepartments().subscribe((res) => {
  //     this.departments = res;
  //   });
  // }

  getJobTitles() {
    this.profileSettingService.getJobTitles().subscribe((res) => {
      this.jobTitles = res;
    });
  }

  getStates() {
    this.globalDropdownService.getStates().subscribe((res) => {
      this.states = res;
    });
  }

  getTimezones() {
    this.globalDropdownService.getTimezones().subscribe((res) => {
      this.timezones = res;
    });
  }

  getProfile() {
    this.profileService.getProfile().subscribe((res) => {
      this.userProfile = res;
      this.filter();
      this.imgURL = res.profilePic;
      this.patchUserProfile();
      // this.getDepartments();
      this.getJobTitles();
      this.getStates();
      this.getTimezones();
    });
  }

  patchUserProfile() {
    this.bioText = this.userProfile.profile.bio;
    this.userPersonalDetailForm.patchValue({
      fullName: this.userProfile.fullName ? this.userProfile.fullName : '',
      email: this.userProfile.email ? this.userProfile.email : '',
      profile: {
        bio: this.userProfile.profile ? this.userProfile.profile.bio : '',
        birthDate: this.userProfile.profile ? this.userProfile.profile.birthDate : '',
        hiringDate: this.userProfile.profile ? this.userProfile.profile.hiringDate : '',
      },
      role: this.userProfile.role
    });

    this.userGeneralDetailForm.patchValue({
      profile: {
        jobTitle: this.userProfile.profile ? this.userProfile.profile.jobTitle : '',
        city: this.userProfile.profile ? this.userProfile.profile.city : '',
        state: this.userProfile.profile ? (this.userProfile.profile.state ? this.userProfile.profile.state.id : '') : '',
        country: 1,
        timezone: this.userProfile.profile ? (this.userProfile.profile.timezone ? this.userProfile.profile.timezone.id : '') : '',
      },
      role: this.userProfile.role
    });
  }

  updateMyProfilePersonal() {
    this.loading = true;
    this.profileSettingService.updateProfile(this.userPersonalDetailForm.value).subscribe(() => {
      this.loading = false;
      this.bioText = this.userPersonalDetailForm.value.profile.bio;
      this.toastrService.success('User personal profile updated successfully.', 'Success!');
    }, error => {
      this.loading = false;
      this.toastrService.error('Unable to update user profile', 'Error!');
    });
  }

  updateMyProfilePersonalGeneral() {
    this.loading = true;
    this.profileSettingService.updateProfile(this.userGeneralDetailForm.value).subscribe(() => {
      this.loading = false;
      this.toastrService.success('User general profile updated successfully.', 'Success!');
    }, error => {
      this.loading = false;
      this.toastrService.error('Unable to update user profile', 'Error!');
    });
  }


  textAreaAdjust() {
    const txtArea = document.getElementById('exampleFormControlTextarea1');
    txtArea.style.height = '40px';
    txtArea.style.height = (txtArea.scrollHeight) + 'px';
  }

  editInput() {
    this.disableTest = false;
    this.imgLabel = 'Change Photo';
    this.onEdit('bio');
  }

  saveInput() {
    this.disableTest = true;
    this.imgLabel = '';
    this.updateMyProfilePersonal();
    this.stopEdit('bio');
    if (this.imageUploadForm.get('isNew').value && this.imageUploadForm.get('image').value) {
      this.uploadImage();
    }
  }

  stopEdit(type: string): void {
    this.editing[type] = false;
  }

  onEdit(type: string): void {
    this.editing[type] = true;
  }

  getMembers(filterParams) {
    this.companyDataService.getEmployeeDirectory(filterParams).subscribe(
      res => {
        if (res[0]) {
          // @ts-ignore
          this.department = res[0].departmentName;
        }
      }
    );
  }

  filter = (): void => {
    const filterParams = {
      search: this.userProfile.fullName
    };
    this.getMembers(filterParams);
  }


}
