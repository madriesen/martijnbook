import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: Partial<User>;
  updatedUser: Partial<User>;

  constructor(private authenticationService: AuthenticationService) {
    this.user = {};
    this.updatedUser = {};
  }

  ngOnInit(): void {
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
