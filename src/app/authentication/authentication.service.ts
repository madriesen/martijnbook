import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn: Boolean = false;
  public redirectUrl: String = '';
  public errorMessage: String = '';

  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;


  constructor(private router: Router) {
    const user = localStorage.getItem('auth')
    this.currentUserSubject = new BehaviorSubject<User>((user ? JSON.parse(user) : {firstName: '', lastName: '', email: ''}))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  updateUser(user: User) {
    this.currentUserSubject.next(user);
  }

  login(user: Partial<User>): void {
    if (user.email !== 'admin@martijnbook.be') {
      this.errorMessage = 'Wrong email!';
      return;
    }

    if (user.password !== 'MartijnIsLeuk') {
      this.errorMessage = 'Wrong password!';
      return;
    }

    this.updateUser({
      firstName: 'Martijn',
      lastName: 'Driesen',
      email: 'admin@martijnbook.be',
    });

    localStorage.setItem('auth', JSON.stringify(this.currentUserValue))
    this.errorMessage = '';
    this.isLoggedIn = true;
    this.router.navigate([this.redirectUrl]);
  }

  logout():void {
    localStorage.removeItem('auth')
    this.isLoggedIn = false
    this.updateUser({firstName: '', lastName: '', email: ''})
    this.router.navigate(['login']);
  }
}
