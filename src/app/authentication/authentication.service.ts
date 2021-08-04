import { Injectable } from '@angular/core';
import { LoggedInResponse, User } from './interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { HttpClientService } from '../http-client.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn: Boolean = false;
  public redirectUrl: String = '';
  private errorMessageSubject: BehaviorSubject<string>;
  public errorMessage: Observable<string>;

  public currentUserSubject: BehaviorSubject<User>;

  constructor(private router: Router, private http: HttpClientService, private errorhandling: ErrorhandlingService) {
    const user = localStorage.getItem('auth');
    user && (this.isLoggedIn = true);
    this.currentUserSubject = new BehaviorSubject<User>(
      user ? JSON.parse(user) : { _id: '0', FirstName: '', LastName: '', Email: '' }
    );

    this.errorMessageSubject = new BehaviorSubject('');
    this.errorhandling.errorMessage.subscribe((message) => this.updateErrorMessage(message));
    this.errorMessage = this.errorMessageSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }

  private updateUser(user: User) {
    this.currentUserSubject.next(user);
  }

  login(user: Partial<User>): void {
    this.http
      .post<LoggedInResponse>(`${environment.api}/user/authenticate`, { Username: user.Email, Password: user.Password })
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((data: LoggedInResponse) => {
        localStorage.setItem('authorization', 'Bearer ' + data.AccessToken);
        this.http.get<User>(environment.api + '/user/' + data.Id).subscribe((data) => {
          this.updateUser(data);
          localStorage.setItem('auth', JSON.stringify(this.currentUserValue));
          this.errorhandling.updateErrorMessage('');
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
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((data: User) => {
        this.login(data);
      });
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.isLoggedIn = false;
    this.updateUser({ _id: '0', FirstName: '', LastName: '', Email: '' });
    this.router.navigate(['login']);
  }
}
