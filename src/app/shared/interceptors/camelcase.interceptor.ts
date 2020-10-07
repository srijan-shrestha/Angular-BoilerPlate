import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/internal/operators/map';
// import * as camelcaseKeys from 'camelcase-keys';
// import * as snakecaseKeys from 'snakecase-keys';
import * as convertKeys from 'convert-keys';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // convert to snake
    if (
      request.method === 'POST' ||
      request.method === 'PUT' ||
      request.method === 'PATCH'
    ) {
      // const url = 'file-upload/';
      // if (!request.url.toLowerCase().includes(url)) {
      if (!(request.body instanceof FormData)) {
        request = request.clone({
          // body: snakecaseKeys(request.body)
          body: convertKeys.toSnake(request.body)
        });
      }
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // if (request.method === 'GET' || request.method === 'POST') {
          if (event.body && typeof event.body === 'object') {
            let obj = null;
            obj = convertKeys.toCamel(event.body);
            // if (event.body.constructor === Array) {
            //   obj = camelcaseKeys([...event.body], { deep: true });
            // } else if (event.body.constructor === Object) {
            //   obj = camelcaseKeys({ ...event.body }, { deep: true });
            // }
            return event.clone({
              body: obj
            });
          }
          // }
        }
        return event;
      })
    );
  }
}
