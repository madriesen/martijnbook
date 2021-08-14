import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NoUserGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): true | UrlTree {
    if (!this.authService.isLoggedIn) {
      return true;
    }

    // Redirect to the home page
    return this.router.parseUrl('/');
  }
}
