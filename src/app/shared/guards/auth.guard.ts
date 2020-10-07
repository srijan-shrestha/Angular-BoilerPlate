import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.includes('404') || state.url.includes('403')) {
      if (sessionStorage.getItem('accessToken')) {
        return true;
      } else {
        this.router.navigate(['/workspace-login']);
        return false;
      }
    }

    if (sessionStorage.getItem('accessToken')) {
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
    }
    return false;
  }
}
