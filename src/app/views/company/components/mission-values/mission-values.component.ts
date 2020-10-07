import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormsModule } from '@angular/forms';
import { CompanyProfileService } from 'src/app/views/company-profile-setting/services/company-profile.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyModel } from 'src/app/shared/models/company.models';

@Component({
  selector: 'app-mission-values',
  templateUrl: './mission-values.component.html',
  styleUrls: ['./mission-values.component.scss']
})
export class MissionValuesComponent implements OnInit {

  companyValuesForm: FormGroup;
  loading = false;
  mission: any;
  values: any;
  missionEdit = false;
  valueEdit = false;
  aboutUsEdit = false;
  aboutUs: any;
  companyData: CompanyModel;
  extraCompanyInfo: any;
  extraCompanyInfoEdit = false;
  updateInfo = false;
  extraCompanyInfoId: number;
  createExtraInformation = false;
  valueCreate = false;

  missionForm = new FormGroup({
    mission: new FormControl('', [Validators.required])
  });

  aboutUsForm = new FormGroup({
    content : new FormControl('', [Validators.required])
  });

  extraInformationForm = new FormGroup({
    companySize : new FormControl('', [Validators.required]),
    headquarter : new FormControl('', [Validators.required]),
    established : new FormControl('', [Validators.required]),
    industry : new FormControl('', [Validators.required]),
    annualRevenue : new FormControl('', [Validators.required]),
    totalCustomer : new FormControl('', [Validators.required])

  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyProfileService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.companyValuesForm = this.fb.group({
      values: this.fb.array([this.createValue(''), this.createValue(''), this.createValue('')])
    });
    // this.getMissionValues();
    this.getMission();
    this.getValues();
    this.getAboutUs();
    this.getCompanyData();
    this.getCompanyExtraInfo();
  }

  get companyValues() {
    return this.companyValuesForm.get('values') as FormArray;
  }

  createValue(value: string): FormControl {
    return this.fb.control(value);
  }

  getCompanyData() {
    this.companyService.data.subscribe(
      (res) => {
        this.companyData = res;
      }
    );
  }
  getCompanyExtraInfo() {
    this.companyService.getExtraInfo().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.extraCompanyInfo = res[0];
          this.extraCompanyInfoId = this.extraCompanyInfo.id;
        } else {
          this.createExtraInformation = true;

        }
      }
    );
  }

  getMission() {
    this.companyService.getMission().subscribe(
      (res: any) => {
        this.mission = res.mission;
      }
    );
  }

  getValues() {
    this.companyService.getValues().subscribe(
      (res: any) => {
        this.values = res;
        if (!res.values.length) {
          this.valueCreate = true;
        }
      }
    );
  }

  getAboutUs() {
    this.companyService.getAboutUs().subscribe(
      (res: any) => {
        this.aboutUs = res.content;
      }
    );
  }

  editMission() {
    this.missionEdit = true;
    this.missionForm.patchValue({
      mission: this.mission
    });
  }

  editValue() {
    this.valueEdit = true;
    if (!this.valueCreate) {
      this.patchValues();
    }
  }
  editAboutUs() {
    this.aboutUsEdit = true;
    this.aboutUsForm.patchValue({
      content: this.aboutUs
    });
  }

  editExtraInfo() {
    this.extraCompanyInfoEdit = true;
    this.updateInfo = true;
    this.extraInformationForm.patchValue({
      companySize : this.extraCompanyInfo.companySize,
      annualRevenue : this.extraCompanyInfo.annualRevenue,
      established : this.extraCompanyInfo.established,
      industry : this.extraCompanyInfo.industry,
      headquarter : this.extraCompanyInfo.headquarter,
      totalCustomer : this.extraCompanyInfo.totalCustomer
    });
  }

  patchValues() {
    this.companyValuesForm.setControl(
      'values',
      this.fb.array(
        this.values.values.map((value: string) => {
          return this.createValue(value);
        })
      )
    );
  }

  addCompanyValue() {
    this.companyValues.push(this.createValue(''));
  }

  removeCompanyValue(i: number) {
    this.companyValues.removeAt(i);
  }

  postMission() {
    this.loading = true;
    const data = this.missionForm.value;
    this.companyService.postMission(data).subscribe(
      (res) => {
        this.toastrService.success('Mission add successfully.', 'Success!');
        this.loading = false;
        this.missionEdit = false;
        this.mission = data.mission;
      }, (error) => {
        this.toastrService.error('Unable to update company mission.', 'Error!');
        this.loading = false;
      }
    );
  }

  postValues() {
    this.loading = true;
    const data = this.companyValuesForm.value;
    this.companyService.postValues(data).subscribe(
      (res) => {
        this.toastrService.success('Company mission and values updated successfully.', 'Success!');
        this.loading = false;
        this.valueEdit = false;
        this.values = data;

      }, (error) => {
        this.toastrService.error('Unable to update company mission and values.', 'Error!');
        this.loading = false;
      }
    );
  }

  postAboutUs() {
    this.loading = true;
    const data = this.aboutUsForm.value;
    this.companyService.postAboutUs(this.aboutUsForm.value).subscribe(
      (res) => {
        this.toastrService.success('Company about us updated successfully.', 'Success!');
        this.loading = false;
        this.aboutUsEdit = false;
        this.aboutUs = data.content;
      }, (error) => {
        this.toastrService.error('Unable to update company about us.', 'Error!');
        this.loading = false;
      }
    );
  }

  postExtraInfo() {
    this.loading = true;
    const data = this.extraInformationForm.value;
    if (this.createExtraInformation) {
      this.companyService.postExtraInfo(data).subscribe(
        (res) => {
          this.toastrService.success('Company information updated successfully', 'Success!');
          this.loading = false;
          this.extraCompanyInfoEdit = false;
          this.extraCompanyInfo = data;
          this.getCompanyExtraInfo();
          this.createExtraInformation = false;
        },
        (error) => {
          this.toastrService.error('Unable to update the company information', 'Error!');
          this.loading = false;
        }
      );
    } else {
      this.companyService.updateExtraInfo(data, this.extraCompanyInfoId).subscribe(
        (res) => {
          this.toastrService.success('Company information updated successfully', 'Success!');
          this.loading = false;
          this.extraCompanyInfoEdit = false;
          this.extraCompanyInfo = data;
        },
        (error) => {
          this.toastrService.error('Unable to update the company information', 'Error!');
          this.loading = false;
        }
      );
    }
  }
}
