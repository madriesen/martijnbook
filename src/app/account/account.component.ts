import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/interfaces/user.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: Partial<User>;

  constructor(private authenticationService: AuthenticationService) {
    this.user = {};
  }

  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe((user) => (this.user = user as Partial<User>));
  }
}
