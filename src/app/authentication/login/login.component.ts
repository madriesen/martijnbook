import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  user: Partial<User>;
  errorMessage: String;
  loading: Boolean;

  subscriptions: Subscription[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.user = {};
    this.errorMessage = '';
    this.loading = false;
    this.subscriptions = [];
    this.subscriptions.push(this.loadingService.isLoadingSubject.subscribe((loading) => (this.loading = loading)));
    this.subscriptions.push(
      this.authenticationService.errorMessage$.subscribe((message) => (this.errorMessage = message))
    );
  }

  onLogin(): void {
    this.errorMessage = '';
    this.authenticationService.login(this.user);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  get canSignIn(): boolean {
    return this.checkIsValid(this.user.Email) && this.checkIsValid(this.user.Password);
  }

  checkIsValid(prop: any) {
    return prop != undefined && prop.length > 0;
  }
}
