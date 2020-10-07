import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,
              private toasterService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      // console.log(err);

      switch (err.status) {
        case 400:
          if (err.error !== undefined) {
            // This will be handled by another section
            console.log(err.error);
          } else {
            for (const key in err) {
              if (err.hasOwnProperty(key)) {
                this.toasterService.error(err[key]);
              }
            }
          }
          break;

        case 401:
          this.toasterService.error('Your session is invalid, please login again!', 'User Unauthorized!');
          break;

        case 404:
          this.toasterService.error('404: URL Not Found..', 'Not Found!');
          break;

        case 405:
          this.toasterService.error('Requested method not allowed..', 'Not Allowed!');
          break;

        case 413:
          this.toasterService.error('File size too large..', 'File too large!');
          break;

        case 500:
          this.toasterService.error('Please contact the system Administrator or try again later..', 'Internal Server Error!');
          break;
      }

      // Handling err.error
      const allErrors = Object.assign(
        {},
        ...(function _flatten(o, n) {
          return [].concat(
            ...Object.keys(o).map(k =>
              typeof o[k] === 'object' ? _flatten(o[k], k) :
                  {[n + ' ' + (k.match(/\d+/g) === null ? k : '')]: o[k]}
            )
          );
        })(err.error)
      );

      let msg = '';
      for (const [key, value] of Object.entries(allErrors)) {
        // msg += key + ': ' + value + '\n';
        msg += value + '\n';
      }

      if (msg !== '') {
        this.toasterService.error(msg.replace(/<[^>]*>?/gm, ''), 'Error', {
          // positionClass: 'toast-bottom-center'
        });
      } else {
        this.toasterService.error('An error occurred', '', {
          // positionClass: 'toast-bottom-center'
        });
      }
      return throwError(err);
    }));
  }
}
