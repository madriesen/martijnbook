import { Component, OnInit } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { User } from '../authentication/interfaces/user.interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: Partial<User> = {};
  userIcon: IconDefinition;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(
      (user) => (this.user = user)
    );
    this.userIcon = faUser;
  }

  get userName(): string {
    if (this.user.FirstName === '' || this.user.LastName === '') return 'Login';
    return `${this.user.FirstName} ${this.user.LastName}`;
  }

  logout(): void {
    this.authenticationService.logout()
  }

  ngOnInit(): void {
    // this.getUser();
  }
}
