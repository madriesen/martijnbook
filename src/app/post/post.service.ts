import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { Post } from './post/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[];
  errorMessage: String = '';
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private errorhandling: ErrorhandlingService
  ) {
    const now = new Date();
    now.setMonth(new Date().getMonth() - 10);

    this.posts = [];
  }

  getErrorMessage() {
    return this.errorhandling.errorMessageSubject.subscribe((message) => (this.errorMessage = message));
  }

  toggleLike(data: { _id: number; user_id: number }) {
    console.log('toggle Like');
    const userIndex = this.posts[0].Likes.indexOf(this.authenticationService.currentUserValue);
    if (userIndex > -1) {
      this.posts[0].Likes.splice(userIndex);
    } else this.posts[0].Likes.push(this.authenticationService.currentUserValue);
  }

  getAllPosts(): void {
    this.http
      .get(`${environment.api}/post`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)));
  }
}
