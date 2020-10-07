import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CompanyProfileService } from '../../services/company-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-mission-values',
  templateUrl: './company-mission-values.component.html',
  styleUrls: ['./company-mission-values.component.scss']
})
export class CompanyMissionValuesComponent implements OnInit {

  aboutForm: FormGroup;
  missionForm: FormGroup;
  valuesForm: FormGroup;

  companyDetails = {about: null, values: null, mission: null};
  loading = {about: false, values: false, mission: false};
  editing = {about: false, values: false, mission: false};

  quillOptions = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyProfileService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.aboutForm = this.fb.group({
      content: ['', [Validators.required]],
    });
    this.missionForm = this.fb.group({
      mission: ['', [Validators.required]],
    });
    this.valuesForm = this.fb.group({
      values: ['', [Validators.required]]
    });

    this.getMissionValues();
  }

  getMissionValues(): void {
    this.companyService.getMissionValues().subscribe(
      (res: any) => {
        this.companyDetails = res;
        if (res['about']) {
          this.aboutForm.setValue({content: res['about'].content});
        }
        if (res['values']) {
          this.valuesForm.setValue({values: res['values'].values});
        }
        if (res['mission']) {
          this.missionForm.setValue({mission: res['mission'].mission});
        }

      }
    );
  }

  stopEdit(type: string): void {
    this.editing[type] = false;
  }

  onEdit(type: string): void {
    this.editing[type] = true;
  }

  saveAbout(): void {
    this.loading.about = true;
    this.companyService.postAboutUs(this.aboutForm.value).subscribe(
      (res: any) => {
        this.companyDetails.about = res;
        this.stopEdit('about');
        this.loading.about = false;
        this.toastrService.success('About Us saved successfully.', 'Success!');
      }, (err) => {
        this.toastrService.error('About Us could not be saved.', 'Error!');
      }
    );
  }

  saveValues(): void {
    this.loading.values = true;
    this.companyService.postValues(this.valuesForm.value).subscribe(
      (res: any) => {
        this.companyDetails.values = res;
        this.stopEdit('values');
        this.loading.values = false;
        this.toastrService.success('Company Values saved successfully.', 'Success!');
      }, (err) => {
        this.toastrService.error('Company Values could not be saved.', 'Error!');
      }
    );
  }

  saveMission(): void {
    this.loading.mission = true;
    this.companyService.postMission(this.missionForm.value).subscribe(
      (res: any) => {
        this.companyDetails.mission = res;
        this.stopEdit('mission');
        this.loading.mission = false;
        this.toastrService.success('Company Mission saved successfully.', 'Success!');
      }, (err) => {
        this.toastrService.error('Company Mission could not be saved.', 'Error!');
      }
    );
  }

  setFocus(editor) {
    editor.focus();
  }

}
