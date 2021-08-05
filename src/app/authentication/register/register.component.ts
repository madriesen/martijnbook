import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: Partial<User>;
  errorMessage: String;
  loading: Boolean;
  confirmPassword: String;

  subscriptions: Subscription[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    if (this.authenticationService.currentUserValue._id !== '0') {
      this.router.navigate(['/']);
    }
    this.user = {};
    this.confirmPassword = '';
    this.errorMessage = '';
    this.loading = false;
    this.subscriptions = [];
    this.subscriptions.push(this.loadingService.isLoadingSubject.subscribe((loading) => (this.loading = loading)));
    this.subscriptions.push(
      this.authenticationService.errorMessage$.subscribe((message) => (this.errorMessage = message))
    );
  }

  ngOnInit(): void {}

  onRegister(): void {
    this.errorMessage = '';

    if (this.user.Password !== this.confirmPassword) {
      this.errorMessage = 'Passwords does not match!';
      return;
    }

    this.authenticationService.register(this.user);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
