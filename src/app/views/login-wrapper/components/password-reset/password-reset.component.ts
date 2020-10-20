import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchPassword} from 'src/app/shared/validators/password-match.validator';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from 'src/environments/environment';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup;
  private userId: any;
  private token: any;
  registerUser = false;
  submitting = false;

  get password() {
    return this.passwordResetForm.get('new_password').value;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router) {
    if (this.router.url.includes('register')) {
      this.registerUser = true;
    }
  }

  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('userId');
    // this.token = this.route.snapshot.paramMap.get('token');

    this.passwordResetForm = this.fb.group({
      // uid: [this.userId, [Validators.required]],
      // token: [this.token, [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required, matchPassword('new_password')]],
    });
  }

  passwordResetFormSubmit() {

  }

}
