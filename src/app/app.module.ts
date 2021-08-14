import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './home/home.component';
import { PostModule } from './post/post.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { ErrorhandlingModule } from './errorhandling/errorhandling.module';
import { ErrorhandlingService } from './errorhandling/errorhandling.service';
import { HttpClientService } from './http-client.service';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, AccountComponent],
  imports: [AppRoutingModule, FontAwesomeModule, AuthenticationModule, PostModule, CommonModule, ErrorhandlingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    ErrorhandlingService,
    HttpClientService,
  ],
  bootstrap: [AppComponent],
  exports: [FontAwesomeModule],
})
export class AppModule {}
