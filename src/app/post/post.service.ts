import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { ErrorhandlingService } from '../errorhandling/errorhandling.service';
import { HttpClientService } from '../http-client.service';
import { Post } from './post/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[];
  errorMessage: String = '';
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClientService,
    private errorhandling: ErrorhandlingService
  ) {
    const now = new Date();
    now.setMonth(new Date().getMonth() - 10);

    this.posts = [];
  }

  getErrorMessage() {
    return this.errorhandling.errorMessage.subscribe((message) => (this.errorMessage = message));
  }

  toggleLike(data: { _id: number; user_id: number }) {
    const userIndex = this.posts[0].Likes.indexOf(this.authenticationService.currentUserValue);
    if (userIndex > -1) {
      this.posts[0].Likes.splice(userIndex);
    } else this.posts[0].Likes.push(this.authenticationService.currentUserValue);
  }

  getAllPosts(): void {
    this.http
      .get(`${environment.api}/post`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorhandling.handleError(error)))
      .subscribe((data) => {
        console.log('data', data);
      });
  }
}
