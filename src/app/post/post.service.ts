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

    this.posts = [{_id: 1, Content: 'This is my first post', Author: this.authenticationService.currentUserValue, Likes: [this.authenticationService.currentUserValue], created_at: now}]
   }

   toggleLike(data:{_id: number, user_id: number}) {
     console.log('toggle Like')
     const userIndex = this.posts[0].Likes.indexOf(this.authenticationService.currentUserValue)
     if (userIndex > -1){
       this.posts[0].Likes.splice(userIndex)
     }
     else this.posts[0].Likes.push(this.authenticationService.currentUserValue)
   }
}
