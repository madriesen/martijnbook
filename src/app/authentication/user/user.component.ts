import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: Partial<User>;
  updatedUser: Partial<User>;

  constructor(private authenticationService: AuthenticationService) {
    this.user = {};
    this.updatedUser = {};
  }

  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe((user) => (this.user = user as Partial<User>));
    this.updatedUser = JSON.parse(JSON.stringify(this.user));
  }

  get userModified() {
    return (
      this.user.FirstName != this.updatedUser.FirstName ||
      this.user.LastName != this.updatedUser.LastName ||
      this.user.Email != this.updatedUser.Email
    );
  }

  logout(): void {
    this.authenticationService.logout();
  }

  saveUser(): void {
    this.authenticationService.changeUser(this.updatedUser);
  }
}
