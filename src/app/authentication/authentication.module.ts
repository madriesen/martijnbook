import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { ErrorhandlingModule } from '../errorhandling/errorhandling.module';
import { HttpClientService } from '../http-client.service';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { CreateComponent } from './company/create/create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, UserComponent, CompanyComponent, CreateComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ErrorhandlingModule,
    FontAwesomeModule,
  ],
  providers: [AuthenticationService, ErrorhandlingService, HttpClientService],
  exports: [UserComponent, CompanyComponent],
})
export class AuthenticationModule {}
