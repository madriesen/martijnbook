import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, HomeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    AuthenticationModule,
    PostModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FontAwesomeModule],
})
export class AppModule {}
