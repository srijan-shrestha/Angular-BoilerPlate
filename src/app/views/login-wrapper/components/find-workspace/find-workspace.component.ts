import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FindWorkspaceService } from 'src/app/shared/services/find-workspace.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-workspace',
  templateUrl: './find-workspace.component.html',
  styleUrls: ['./find-workspace.component.scss']
})
export class FindWorkspaceComponent implements OnInit {
  findWorkspaceForm: FormGroup;
  private type: 'forgot-email' | 'find-workspace';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private findWorkspaceService: FindWorkspaceService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (route.snapshot.data.type === 'forgot-email') {
      this.type = 'forgot-email';
    } else {
      this.type = 'find-workspace';
    }
  }

  ngOnInit() {
    this.findWorkspaceForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  findWorkspaceFormSubmit() {
    if (this.type === 'find-workspace') {
      this.findWorkspaceByEmail();
    } else {
      this.forgotEmail();
    }
  }

  findWorkspaceByEmail() {
    this.submitting = true;
    this.findWorkspaceService.findWorkspaceByEmail(this.findWorkspaceForm.value.email).subscribe((res: string) => {
      this.toastrService.success(res, 'Success');
      this.submitting = false;
      this.router.navigate(['/']);
    }, (err: any) => {
      this.toastrService.error(err.error.error, 'Error');
      this.submitting = false;
    });
  }

  forgotEmail() {
    this.submitting = true;
    this.findWorkspaceService.forgotEmail(this.findWorkspaceForm.value.email).subscribe((res: string) => {
      this.toastrService.success(res, 'Success');
      this.submitting = false;
      this.router.navigate(['/']);
    }, (err: any) => {
      this.toastrService.error(err.error.error, 'Error');
      this.submitting = false;
    });
  }

}
