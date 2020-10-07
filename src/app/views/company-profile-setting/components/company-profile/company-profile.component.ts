import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalDropdownService } from '../../../../shared/services/global-dropdown.service';
import { CompanyProfileService } from '../../services/company-profile.service';
import { CompanyModel, Company } from '../../../../shared/models/company.models';
import { StateModel } from '../../../../shared/models/state.model';
import { TimezoneModel } from '../../../../shared/models/timezone.model';
import { CompanyEmailExtensionModel } from '../../../../shared/models/company-email-extension.model';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileImageEditComponent } from '../profile-image-edit/profile-image-edit.component';
import { CommonService } from 'src/app/shared/services/common.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  companyProfileForm: FormGroup;
  companyProfile: CompanyModel;
  states: StateModel[];
  timezones: TimezoneModel[];
  deletedEmailExtension: FormArray;
  loading = false;
  logoURL: any;
  logoMarkURL: any;
  selected = false;
  logo: any;
  logoMark: any;
  logoName: any;
  hasLogo = false;
  logoMarkName: any;
  hasLogoMark = false;
  profileData: any;
  profileDataTemp: any;
  show = false;
  autohide = false;
  emailExtensionCross = false;
  showApplyBtn = false;
  colorValueChangeCancel = false;
  colorValueChangeOk = false;

  private privateColorPrimary = '#000000';
  private privateColorSecondary = '#444444';
  private privateNavColorPrimary = '#000000';
  private privateNavColorSecondary = '#444444';
  imgURL: any;

  get colorPrimary(): string {
    return this.privateColorPrimary;
  }

  set colorPrimary(c: string) {
    this.privateColorPrimary = c;
    this.companyProfileForm.get('profile').patchValue({
      colorPrimary: c
    });
  }

  colorPrimaryInput(e) {
    const value = e.srcElement.value;
    this.privateColorPrimary = value;
    this.companyProfileForm.get('profile').patchValue({
      colorPrimary: value
    });
    this.updateSaveColor();
  }

  colorSecondaryInput(e) {
    const value = e.srcElement.value;
    this.privateColorSecondary = value;
    this.companyProfileForm.get('profile').patchValue({
      colorSecondary: value
    });
    this.updateSaveColor();
  }

  get colorSecondary(): string {
    return this.privateColorSecondary;
  }

  set colorSecondary(c: string) {
    this.privateColorSecondary = c;
    this.companyProfileForm.get('profile').patchValue({
      colorSecondary: c
    });
  }

  get navColorPrimary(): string {
    return this.privateNavColorPrimary;
  }

  set navColorPrimary(c: string) {
    this.privateNavColorPrimary = c;
    this.companyProfileForm.get('profile').patchValue({
      navColorPrimary: c
    });
  }

  updateSaveColor() {
    const companyValues = this.companyProfileForm.value;
    this.companyProfileService.updateCompanyProfile(companyValues).subscribe((res: CompanyModel) => {
      this.companyProfileService.setData(res);
      this.toastrService.success('Color updated successfully.', 'Success!');
    }, error => {
      this.toastrService.error('Unable to update Color.', 'Error!');
      this.loading = false;
    });
    this.show = false;
    this.showApplyBtn = false;
    this.colorValueChangeOk = false;
    this.colorValueChangeCancel = false;
  }

  // gradientEditorToggled = (eventName) => document.getElementById('gradient-element-box')
  //   .style.height = eventName === 'opened' ? '586px' : '246px'

  gradientEditorToggled(eventName) {
    if (eventName === 'opened') {
      document.getElementById('gradient-element-box').style.height = '546px';
      this.showApplyBtn = false;
    } else if (eventName === 'closed') {
      if (this.show === true) {
        document.getElementById('gradient-element-box').style.height = '216px';
        if (this.colorValueChangeOk === false && this.colorValueChangeCancel === false) {
          this.showApplyBtn = false;
        } else if (this.colorValueChangeOk === false && this.colorValueChangeCancel === true) {
          this.showApplyBtn = false;
        } else if (this.colorValueChangeOk === true || this.colorValueChangeCancel === true) {
          this.showApplyBtn = true;
          document.getElementById('gradient-element-box').style.height = '246px';
        }else {
          this.showApplyBtn = false;
        }
      }
    } else {
      this.show = false;
    }
  }

  get navColorSecondary(): string {
    return this.privateNavColorSecondary;
  }

  set navColorSecondary(c: string) {
    this.privateNavColorSecondary = c;
    this.companyProfileForm.get('profile').patchValue({
      navColorSecondary: c
    });
  }
  // emailExtension: FormArray;

  // get emailExtension() {
  //   debugger;
  //   console.log(this.companyProfileForm.get('emailExtension').value);
  //   return this.companyProfileForm.get('emailExtension') as FormArray;
  // }

  imageUploadForm = new FormGroup({
    image: new FormControl(''),
    isNew: new FormControl(true) // true if image is uploaded by user and not received from backend.
  });



  constructor(
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private globalDropdownService: GlobalDropdownService,
    private toastrService: ToastrService,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.companyProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      profile: this.fb.group({
        id: ['', []],
        timezone: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        licenses: ['', [Validators.required]],
        address1: ['', [Validators.required]],
        address2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        colorPrimary: ['#000000', [Validators.required]],
        colorSecondary: ['#444444', [Validators.required]],
        navColorPrimary: ['#000000', [Validators.required]],
        navColorSecondary: ['#444444', [Validators.required]],

      }),
      emailExtension: this.fb.array([this.createEmailExtentions()]),
    });
    this.getStates();
    this.getTimezones();
    this.getCompanyProfile();
    this.deletedEmailExtension = this.fb.array([]);
    this.companyProfileService.data.subscribe(
      (res: any) => {
        if (res) {
          if (res.companyLogo) {
            this.hasLogo = true;
            this.logoName = res.companyLogo.split('/')[5];
          } else {
            this.logoName = 'Please upload Logo';
          }
          if (res.companyLogoMark) {
            this.hasLogoMark = true;
            this.logoMarkName = res.companyLogoMark.split('/')[5];
          } else {
            this.logoMarkName = 'Please upload Logo Mark';
          }

        }
      }
    );

    this.companyProfileService.data.subscribe(
      res => {
        if (res) {
          this.logoMarkURL = res.companyLogoMark;
          this.logoURL = res.companyLogo;
          // console.log(res);
        }
      }
    );
  }

  onPicChange($event) {
    this.profileData = $event;
    this.imageUploadForm.patchValue({
      isNew : true
    });
  }

  get emailExtensions() {
    return this.companyProfileForm.get('emailExtension') as FormArray;
  }

  createEmailExtentions(extension?: CompanyEmailExtensionModel): FormGroup {
    return this.fb.group({
      id: [extension ? extension.id : '', []],
      emailExtension: [extension ? extension.emailExtension : '', [Validators.email, Validators.required]]
    });
  }

  addEmailExtention(): void {
    const emailExtension = this.companyProfileForm.get('emailExtension') as FormArray;
    emailExtension.push(this.createEmailExtentions());
  }

  deleteEmailExtention(index) {
    const emailExtension = this.companyProfileForm.get('emailExtension') as FormArray;
    if (!emailExtension.value[index].id) {
      emailExtension.removeAt(index);
      return;
    }
    this.deletedEmailExtension.push(emailExtension.controls[index]);
    emailExtension.removeAt(index);
    emailExtension.markAsDirty();
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

  getCompanyProfile() {
    this.companyProfileService.getCompanyProfile().subscribe((res) => {
      this.companyProfile = res;
      this.patchCompanyProfile();
    });
  }

  patchCompanyProfile() {
    this.companyProfileForm.reset();
    this.companyProfileForm.patchValue({
      name: this.companyProfile.name ? this.companyProfile.name : '',
      profile: {
        id: this.companyProfile.profile ? this.companyProfile.profile.id : '',
        phoneNumber: this.companyProfile.profile ? this.companyProfile.profile.phoneNumber : '',
        timezone: this.companyProfile.profile ? this.companyProfile.profile.timezone.id : '',
        licenses: '1234',
        address1: this.companyProfile.profile ? this.companyProfile.profile.address1 : '',
        address2: this.companyProfile.profile ? this.companyProfile.profile.address2 : '',
        city: this.companyProfile.profile ? this.companyProfile.profile.city : '',
        state: this.companyProfile.profile ? this.companyProfile.profile.state.id : '',
        postalCode: this.companyProfile.profile ? this.companyProfile.profile.postalCode : '',
        colorPrimary: this.companyProfile.profile ? this.companyProfile.profile.colorPrimary : '#000000',
        colorSecondary: this.companyProfile.profile ? this.companyProfile.profile.colorSecondary : '#444444',
        navColorPrimary: this.companyProfile.profile ? this.companyProfile.profile.navColorPrimary : '#000000',
        navColorSecondary: this.companyProfile.profile ? this.companyProfile.profile.navColorSecondary : '#444444',
      },
    });

    if (this.companyProfile.profile) {
      this.colorPrimary = this.companyProfile.profile.colorPrimary || '#000000';
      this.colorSecondary = this.companyProfile.profile.colorSecondary || '#444444';
      this.navColorPrimary = this.companyProfile.profile.navColorPrimary || '#000000';
      this.navColorSecondary = this.companyProfile.profile.navColorSecondary || '#444444';
    }

    this.companyProfileForm.setControl(
      'emailExtension',
      this.fb.array(this.companyProfile.emailExtension.map((emailExtension: CompanyEmailExtensionModel) => {
        return this.createEmailExtentions(emailExtension);
      }))
    );
  }

  updateCompanyProfile() {
    const companyValues = this.companyProfileForm.value;
    this.deletedEmailExtension.value.forEach(emForm => {
      companyValues.emailExtension.push({
        ...emForm,
        isDeleted: true
      });
    });
    this.loading = true;
    this.companyProfileService.updateCompanyProfile(companyValues).subscribe((res: CompanyModel) => {
      this.companyProfileService.setData(res);
      this.loading = false;
      this.toastrService.success('Company profile updated successfully.', 'Success!');
    }, error => {
      this.toastrService.error('Unable to update company profile.', 'Error!');
      this.loading = false;
    });
  }

  selectedLogoImage(event) {
    this.selected = true;
    this.logo = (event.target as HTMLInputElement).files[0];
    if (this.logo) {
      this.logoName = this.logo.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.logo);
      reader.onload = (_event) => {
        this.logoURL = reader.result;
        this.logo.imageUrl = this.logoURL;
        this.openLogoCropModal(this.logo, 'logo');
      };
    }
  }

  selectedMarkImage(event) {
    this.selected = true;
    this.logoMark = (event.target as HTMLInputElement).files[0];
    if (this.logoMark) {
      const reader = new FileReader();
      reader.readAsDataURL(this.logoMark);
      reader.onload = (event) => {
      this.logoMark.imageUrl = reader.result;
      this.openLogoCropModal(this.logoMark, 'mark');
      };
    }
  }

  openLogoCropModal(logoFile, type) {
    this.profileDataTemp = {...logoFile};
    const modalRef = this.modalService.open(ProfileImageEditComponent, {size: 'xl', centered: true,
    windowClass: 'profile-image-metadata-modal'});
    const image = logoFile;
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
      // upload begins here
      if (type === 'mark') {
        this.uploadLogoMark(receivedImage);
      } else if(type === 'logo') {
        this.uploadLogo(receivedImage);
      }

    });
  }

  uploadLogoMark(image) {
    this.logoMarkURL = image;
    this.logoMark = this.commonService.dataURLtoFile(image, this.logoMark.name);
    const data = new FormData();
    data.append('logo', this.logoMark);
    this.companyProfileService.uploadCompanyImage(data).subscribe(
      (res: any) => {
        this.companyProfileService.setCompanyLogoMark(res.companyLogoMark);
        this.selected = false;
      },
      err => {
        this.selected = false;
      }
    );
  }

  uploadLogo(image) {
    this.logoURL = image;
    this.logo = this.commonService.dataURLtoFile(image, this.logo.name);
    const data = new FormData();
    data.append('logo', this.logo);
    this.companyProfileService.uploadCompanyLogo(data).subscribe(
      (res: any) => {
        this.companyProfileService.setCompanyLogo(res.companyLogo);
        this.selected = false;
        this.logoName = this.logoName;
      },
      err => {
        this.selected = false;
      }
    );
  }

  changeLogoImage() {
    this.hasLogo = false;
  }

  changeMarkImage() {
    this.hasLogoMark = false;
  }

  showEmailExtensionCross() {
    this.emailExtensionCross = true;
    // console.log(document.getElementById('emailExt').children[0].value);
    // if (document.getElementById('emailExt').children[0].value === '') {
    //   this.emailExtensionCross = true;
    // } else {
    //   this.emailExtensionCross = false;
    // }
  }

  hideEmailExtensionCross() {
    this.emailExtensionCross = false;
  }

  changesreset() {
    this.getCompanyProfile();
    this.show = false;
    this.showApplyBtn = false;
    this.colorValueChangeOk = false;
    this.colorValueChangeCancel = false;
  }

}
