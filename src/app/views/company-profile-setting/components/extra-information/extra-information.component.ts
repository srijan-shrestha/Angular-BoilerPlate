import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyProfileService } from '../../services/company-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-extra-information',
  templateUrl: './extra-information.component.html',
  styleUrls: ['./extra-information.component.scss']
})
export class ExtraInformationComponent implements OnInit {

  companyExtraInfoForm: FormGroup;
  extraInfo: any;

  extraInfoId = null;
  extraInfoEdit = false;
  loading = false;
  date: any;

  companyDetail = {name: '', image: ''};

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyProfileService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.companyService.data.subscribe(
      res => {
        if (res) {
          this.companyDetail.name = res.name;
          this.companyDetail.image = res.companyLogo;
        }
      }
    );
    this.companyExtraInfoForm = this.fb.group({
      headquarter: ['', [Validators.required]],
      companySize: ['', [Validators.required]],
      annualRevenue: ['', [Validators.required]],
      established: ['', [Validators.required]],
      totalCustomer: ['', [Validators.required]],
      industry: ['', [Validators.required]]
    });
    this.getExtraInformation();
  }

  getExtraInformation() {
    this.companyService.getExtraInfo().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.extraInfo = res[0];
          this.extraInfoId = this.extraInfo.id;
          this.companyExtraInfoForm.setValue({
            headquarter: this.extraInfo.headquarter,
            companySize: this.extraInfo.companySize,
            annualRevenue: this.extraInfo.annualRevenue,
            established: '',
            totalCustomer: this.extraInfo.totalCustomer,
            industry: this.extraInfo.industry
          });
          if (this.extraInfo.established) {
            const established = new Date(this.extraInfo.established);
            this.companyExtraInfoForm.get('established').setValue({
              year: established.getFullYear(),
              month: established.getMonth() + 1,
              day: established.getDate()
            });
          }

        }
      }
    );
  }

  enableExtraInfoEdit() {
    this.extraInfoEdit = true;
  }

  disableExtraInfoEdit() {
    this.extraInfoEdit = false;
  }

  saveExtraInfo() {
    this.loading = true;
    const formValues = this.companyExtraInfoForm.value;
    const ngbDate = formValues['established'];
    formValues['established'] = ngbDate.year + '-' + ngbDate.month + '-' + ngbDate.day;

    if (this.extraInfoId) {
      this.companyService.updateExtraInfo(formValues, this.extraInfoId).subscribe(
        (res) => {
          this.toastrService.success('Company information updated successfully', 'Success!');
          this.loading = false;
          this.extraInfoEdit = false;
          this.extraInfo = res;
          this.extraInfoId = this.extraInfo.id;
        },
        (error) => {
          this.toastrService.error('Unable to update the company information', 'Error!');
          this.loading = false;
        }
      );
    } else {
      this.companyService.postExtraInfo(formValues).subscribe(
        (res) => {
          this.toastrService.success('Company information saved successfully', 'Success!');
          this.loading = false;
          this.extraInfoEdit = false;
          this.extraInfo = res;
          this.extraInfoId = this.extraInfo.id;
        },
        (error) => {
          this.toastrService.error('Unable to update the company information', 'Error!');
          this.loading = false;
        }
      );
    }
  }

}
