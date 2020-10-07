import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerifyEmailService} from '../../../../shared/services/verify-email.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  private userId: any;
  private token: any;

  constructor(
    private route: ActivatedRoute,
    private verifyEmailService: VerifyEmailService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.token = this.route.snapshot.paramMap.get('token');

    this.verifyEmailService.verifyEmail({userId: this.userId, token: this.token}).subscribe(null, null, () => {
      this.router.navigate(['/']);
    });
  }

}
