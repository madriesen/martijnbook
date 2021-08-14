import { Component } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: Partial<User> = {};
  userIcon: IconDefinition;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe((user) => (this.user = user));
    this.userIcon = faUser;
  }

  get userName(): string {
    if (this.user.FirstName === '' || this.user.LastName === '') return 'Login';
    return `${this.user.FirstName} ${this.user.LastName}`;
  }
}
