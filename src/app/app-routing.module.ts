import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './authentication/user.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AccountComponent } from './account/account.component';
import { NoUserGuard } from './authentication/no-user.guard';

const routes: Routes = [
  // access to all
  { path: 'login', canActivate: [NoUserGuard], component: LoginComponent },
  { path: 'register', canActivate: [NoUserGuard], component: RegisterComponent },

  // UserGuard routes
  { path: '', canActivate: [UserGuard], component: HomeComponent },
  { path: 'user', canActivate: [UserGuard], component: AccountComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
