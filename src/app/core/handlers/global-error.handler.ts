import { ErrorHandler, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalError implements ErrorHandler {
  handleError(error: unknown): void {
    console.error('A global error occurred:', error);
  }
}
