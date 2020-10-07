import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfilePicService } from './services/profile-pic.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { CompanyProfileService } from '../company-profile-setting/services/company-profile.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  sidebarSize = 'lg';
  sidebarCollapsed = false;
  profileData: any;
  imgURL: any;
  companyName: string;
  userName: string;

  imageUploadForm = new FormGroup({
    image: new FormControl(''),
    isNew: new FormControl(true) // true if image is uploaded by user and not received from backend.
  });


  constructor(private profilePic: ProfilePicService,
              private profileService: ProfileService,
              private companyService: CompanyProfileService) { }

  ngOnInit() {
    this.profileService.data.subscribe(
      res => {
        if (res) {
          this.imgURL = res.profilePic;
          this.userName = res.fullName;
        }
      }
    );
    this.companyService.data.subscribe(
      res => {
        if (res) {
          this.companyName = res.name;
        }
      }
    );
  }

  toggled(e) {
    this.sidebarCollapsed = e;
  }
  onPicChange($event) {
    this.profileData = $event;
    this.imageUploadForm.patchValue({
      isNew : true
    });
  }

  uploadImage() {
    const data = new FormData();
    data.append('profile_pic', this.profileData);
    this.profilePic.uploadPicture(data).subscribe(
      (res: any) => {
        this.profileService.setProfileImage(res.profilePic);
        this.imageUploadForm.patchValue({
          isNew : false
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
