import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorhandlingService {
  private errorMessageSubject: BehaviorSubject<string>;
  public errorMessage: Observable<string>;

  constructor() {
    this.errorMessageSubject = new BehaviorSubject<string>('');
    this.errorMessage = this.errorMessageSubject.asObservable();
  }

  updateErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

      this.updateErrorMessage(error.error.message);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error.message);
  }
}
