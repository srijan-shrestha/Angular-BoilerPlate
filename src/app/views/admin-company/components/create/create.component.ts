import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FieldErrorService } from 'src/app/shared/services/field-error.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  companyCreateForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private fieldErrorService: FieldErrorService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.companyCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      workspace: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  companyCreateFormSubmit() {
    this.loading = true;
    this.companyService.createCompany(this.companyCreateForm.value).subscribe(
      res => {
        this.toastrService.success('Company created successfully.', 'Success!');
        this.router.navigateByUrl('admin/companies');
        this.loading = false;
      },
      err => {
        this.toastrService.error('Unable to create company.', 'Error!');
        this.fieldErrorService.check(this.companyCreateForm, err);
        this.loading = false;
      }
    );
  }

  setDomainName(event) {
    const name = event.target.value.replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
    this.companyCreateForm.get('workspace').setValue(name);
  }

}
