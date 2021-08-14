import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: Partial<User> = {};
  updatedUser: Partial<User> = {};

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe((user) => {
      this.user = user;

      this.updatedUser.FirstName = user.FirstName;
      this.updatedUser.LastName = user.LastName;
      this.updatedUser.Email = user.Email;
    });
  }

  ngOnInit(): void {}

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
