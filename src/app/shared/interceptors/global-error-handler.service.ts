import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk .* failed/;

    if (chunkFailedMessage.test(error.message)) {
      console.log('Reloaded because of Loading chunk Issue.');
      window.location.reload();
    }
  }
}
