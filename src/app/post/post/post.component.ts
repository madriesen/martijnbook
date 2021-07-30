import { Component, Input, OnInit } from '@angular/core';
import { faUser, faGlobeAmericas, faEllipsisH, IconDefinition, faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PostService } from '../post.service';
import { Post } from './post.interface';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  userIcon: IconDefinition;
  worldIcon: IconDefinition;
  ellipsisIcon: IconDefinition;
  thumbsUpIcon: IconDefinition;
  commentDotsIcon: IconDefinition

  @Input() post: Post = {Id: 0, Content: '', Likes: [],  Author: {Id: 0, FirstName: '', LastName: '', Email: ''}, created_at: new Date()};

    constructor(private authenticationService: AuthenticationService, private postService: PostService) {
    this.userIcon = faUser;
    this.worldIcon=faGlobeAmericas
    this.ellipsisIcon=faEllipsisH
    this.thumbsUpIcon = faThumbsUp
    this.commentDotsIcon = faCommentDots
   }

  ngOnInit(): void {  }

  get timeDifference(): string {
    const postDate = this.post.created_at
    const now = new Date()

    const diffInSeconds = (now.getTime() - postDate.getTime())/1000

    if (diffInSeconds < 60) return diffInSeconds.toFixed(0) + ' s'

    const diffInMinutes = diffInSeconds / 60

    if (diffInMinutes < (60)) return (diffInMinutes).toFixed(0) + ' m'

    const diffInHours = diffInMinutes / 60

    if (diffInHours < 60) return (diffInHours).toFixed(0) + ' h'

    const diffInDays = diffInHours / 24

    if (diffInDays < 24)return (diffInDays).toFixed(0) + ' d'

    const diffInMonths = diffInDays / 30

    if (diffInMonths < 12) return (diffInMonths).toFixed(0) + ' months'

    const diffInYears = diffInMonths /12

    return (diffInYears).toFixed(0) + ' y'
  }

  get currentUserLikesPost(): boolean {
    return this.post.Likes.indexOf(this.authenticationService.currentUserValue) > -1
  }

  toggleLike(): void {
    this.postService.toggleLike({_id: 1, user_id: 1})
  }

  get amountOfLikes(): number {
    return this.post.Likes.length
  }
}
