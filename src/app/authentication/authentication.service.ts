import { Injectable } from '@angular/core';
import { LoggedInResponse, User } from './interfaces/user.interface';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn: Boolean = false;
  public redirectUrl: String = '';
  public errorMessageSubject: BehaviorSubject<string>;
  private errorMessage: Observable<string>;

  private currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  constructor(private router: Router, private http: HttpClient) {
    const user = localStorage.getItem('auth');
    user && (this.isLoggedIn = true);
    this.currentUserSubject = new BehaviorSubject<User>(
      user ? JSON.parse(user) : { _id: 0, FirstName: '', LastName: '', Email: '' }
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.errorMessageSubject = new BehaviorSubject<string>('');
    this.errorMessage = this.errorMessageSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get errorMessageValue(): String {
    return this.errorMessageSubject.value;
  }

  private updateUser(user: User) {
    this.currentUserSubject.next(user);
  }

  updateErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }

  login(user: Partial<User>): void {
    this.http
      .post<LoggedInResponse>(`${environment.api}/user/authenticate`, { Username: user.Email, Password: user.Password })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe((data: LoggedInResponse) => {
        localStorage.setItem('authorization', 'Bearer ' + data.AccessToken);
        this.http
          .get<User>(environment.api + '/user/' + data.Id, {
            headers: { authorization: localStorage.getItem('authorization')! },
          })
          .subscribe((data) => {
            this.updateUser(data);
            localStorage.setItem('auth', JSON.stringify(this.currentUserValue));
            this.updateErrorMessage('');
            this.isLoggedIn = true;
            this.router.navigate([this.redirectUrl]);
          });
      });
  }

  register(user: Partial<User>): void {
    this.http
      .post<User>(`${environment.api}/user/`, {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Username: user.Email,
        Password: user.Password,
      })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe((data: User) => {
        this.login(data);
      });
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.isLoggedIn = false;
    this.updateUser({ _id: 0, FirstName: '', LastName: '', Email: '' });
    this.router.navigate(['login']);
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
    return throwError('Something bad happened; please try again later.');
  }
}
