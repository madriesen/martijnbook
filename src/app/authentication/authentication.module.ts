import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { ErrorhandlingModule } from '../errorhandling/errorhandling.module';
import { HttpClientService } from '../http-client.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, ErrorhandlingModule],
  providers: [AuthenticationService, ErrorhandlingService, HttpClientService],
})
export class AuthenticationModule {}
