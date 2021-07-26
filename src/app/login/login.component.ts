import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Partial<User>;
  errorMessage: String;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
    this.user = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.authenticationService.login(this.user);
    this.getErrorMessage();
  }

  getErrorMessage(): void {
    this.errorMessage = this.authenticationService.errorMessage;
  }
}
