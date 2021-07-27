import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Post } from './post/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
posts : Post[]
  constructor(private authenticationService: AuthenticationService) {
    const now = new Date()
    now.setMonth(new Date().getMonth() - 10)

    this.posts = [{content: 'This is my first post', author: this.authenticationService.currentUserValue, created_at: now}]
   }
}
