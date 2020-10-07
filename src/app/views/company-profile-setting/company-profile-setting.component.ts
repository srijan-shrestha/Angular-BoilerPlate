import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyProfileService } from './services/company-profile.service';

@Component({
  selector: 'app-company-profile-setting',
  templateUrl: './company-profile-setting.component.html',
  styleUrls: ['./company-profile-setting.component.scss']
})
export class CompanyProfileSettingComponent implements OnInit {
  sidebarSize = 'lg';
  sidebarCollapsed = false;
  companyImage: any;
  imageURL: string;
  companyName: string;

  companyLogoUploadForm = FormGroup;
  imageUploadForm = new FormGroup({
    image: new FormControl(''),
    isNew: new FormControl(true) // true if image is uploaded by user and not received from backend.
  });

  constructor(private fb: FormBuilder,
              private companyProfileService: CompanyProfileService) { }

  ngOnInit() {
    this.companyProfileService.data.subscribe(
      res => {
        if (res) {
          this.imageURL = res.companyLogoMark;
          this.companyName = res.name;
        }
      }
    );
  }

  toggled(e) {
    this.sidebarCollapsed = e;
  }
  companyPic($event) {
    this.companyImage = $event;
  }
  uploadImage() {
    const data = new FormData();
    data.append('logo', this.companyImage);
    this.companyProfileService.uploadCompanyImage(data).subscribe(
      (res: any) => {
        this.companyProfileService.setCompanyLogoMark(res.companyLogoMark);
        this.imageUploadForm.patchValue({
          isNew: false
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
