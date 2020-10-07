import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  constructor(private http: HttpClient) {
  }

  getTwoFactorAuthenticationStatus() {
    return this.http.get('/profile/');
  }

  socialSignup(data) {
    return this.http.post('auth/social/register/', data);
  }
}
