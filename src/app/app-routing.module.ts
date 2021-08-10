import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './authentication/user.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UserComponent } from './authentication/user/user.component';

const routes: Routes = [
  // access to all
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // UserGuard routes
  { path: '', canActivate: [UserGuard], component: HomeComponent },
  { path: 'user', canActivate: [UserGuard], component: UserComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
