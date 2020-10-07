import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  rememberMe = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  adminLoginFormSubmit() {
    this.authService.requestAccessToken(this.adminLoginForm.value).subscribe((res: any) => {
      this.authService.setAccessToken(res.token, this.rememberMe.value);
      this.authService.setDeviceId(res.device_id);

      this.authService.setRefreshToken(res.refresh_token);
      this.router.navigateByUrl('/admin/companies');
    }, err => {
      console.log(err);
    });
  }

}
