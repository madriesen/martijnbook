import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { HttpClientService } from '../http-client.service';
import { Company } from './company/interfaces/company.interface';
import { LoggedInResponse, User } from './interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn: Boolean = false;
  public redirectUrl: String = '';
  private errorMessageSubject: BehaviorSubject<string>;
  public errorMessage$: Observable<string>;

  public currentUserSubject: BehaviorSubject<User>;
  public currentCompanySubject: BehaviorSubject<Company>;

  constructor(private router: Router, private http: HttpClientService, private errorhandling: ErrorhandlingService) {
    const user = localStorage.getItem('auth');
    this.currentUserSubject = new BehaviorSubject<User>({
      _id: '0',
      FirstName: '',
      LastName: '',
      Email: '',
      RoleID: { _id: '', Name: '' },
    });
    this.currentCompanySubject = new BehaviorSubject<Company>({ _id: '0', Name: '', Address: '', Description: '' });

    user && (this.isLoggedIn = true);

    if (user && JSON.parse(user)._id != 0) {
      this._getUser(JSON.parse(user)._id).subscribe((user) => {
        this.updateUser(user);
        this.errorhandling.updateErrorMessage('');
        this.isLoggedIn = true;
        this.currentUserSubject.next(user);
      });
      this._getCompany(JSON.parse(user).Company._id).subscribe((company) => {
        this.updateCompany(company);
      });
    }

    this.errorMessageSubject = new BehaviorSubject('');
    this.errorhandling.errorMessage$.subscribe((message) => this.updateErrorMessage(message));
    this.errorMessage$ = this.errorMessageSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }

  private updateUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('auth', JSON.stringify(this.currentUserValue));
  }

  login(user: Partial<User>): void {
    this.http
      .post<LoggedInResponse>(`/user/authenticate`, { Username: user.Email, Password: user.Password })
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((data: LoggedInResponse) => {
        localStorage.setItem('authorization', 'Bearer ' + data.AccessToken);
        this._getUser(data._id).subscribe((data) => {
          this.updateUser(data);
          this.errorhandling.updateErrorMessage('');
          this.isLoggedIn = true;
          this.router.navigate([this.redirectUrl]);
        });
      });
  }

  private _getUser(user_id: string): Observable<User> {
    return this.http
      .get<User>(`/user/${user_id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)));
  }

  register(user: Partial<User>): void {
    this.http
      .post<User>(`/user/`, {
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
    localStorage.removeItem('authorization');
    this.isLoggedIn = false;
    this.updateUser({ _id: '0', FirstName: '', LastName: '', Email: '', RoleID: { _id: '', Name: '' } });
    this.router.navigate(['login']);
  }

  changeUser(user: Partial<User>): void {
    this.http
      .put<User>(`/user/${user._id}`, { ...user })
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((data: User) => {
        this._getUser(data._id).subscribe((user) => {
          this.updateUser(user);
        });
      });
  }

  createCompany(company: Company): void {
    this.http
      .post<Company>(`/company`, { ...company })
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((company) => {
        this._getCompany(company._id).subscribe((company) => {
          this.updateCompany(company);
        });
        this._getUser(this.currentUserValue._id).subscribe((user) => {
          this.updateUser({ ...user, Company: company });
        });
      });
  }

  private _getCompany(company_id: string): Observable<Company> {
    return this.http
      .get<Company>(`/company/${company_id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)));
  }

  private updateCompany(company: Company) {
    this.currentCompanySubject.next(company);
  }
}
