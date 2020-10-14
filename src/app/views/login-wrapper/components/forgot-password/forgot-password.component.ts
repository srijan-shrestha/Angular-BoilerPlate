import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  workspace: any;
  companyLogo = 'app/assets/images/blaastlogo.svg';
  findWorkspaceLink = '';
  submitting = false;

  workspaceName: string;
  resetMailSent = false;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {

  }

}
