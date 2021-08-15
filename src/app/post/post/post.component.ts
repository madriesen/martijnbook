import { Component, Input, OnInit } from '@angular/core';
import {
  faUser,
  faGlobeAmericas,
  faEllipsisH,
  IconDefinition,
  faThumbsUp,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/authentication/interfaces/user.interface';
import { PostService } from '../post.service';
import { emoticonize } from './emoticon.helper';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  userIcon: IconDefinition;
  worldIcon: IconDefinition;
  ellipsisIcon: IconDefinition;
  thumbsUpIcon: IconDefinition;
  commentDotsIcon: IconDefinition;
  openComment: boolean;
  newComment: string;

  @Input() post!: Post;

  constructor(private authenticationService: AuthenticationService, private postService: PostService) {
    this.userIcon = faUser;
    this.worldIcon = faGlobeAmericas;
    this.ellipsisIcon = faEllipsisH;
    this.thumbsUpIcon = faThumbsUp;
    this.commentDotsIcon = faCommentDots;
    this.openComment = false;
    this.newComment = '';
  }

  ngOnInit(): void {
    if (this.post.Comments.length > 0) this.toggleOpenComment();
  }

  get timeDifference(): string {
    return this.getTimeDifference(new Date(this.post.createdAt));
  }

  get currentUserLikesPost(): boolean {
    return this.post.Likes.findIndex((user) => user._id === this.authenticationService.currentUserValue._id) > -1;
  }

  get currentUser(): User {
    return this.authenticationService.currentUserValue;
  }

  toggleLike(): void {
    this.postService.toggleLike(this.post._id);
  }

  toggleOpenComment(): void {
    if (this.openComment) return;
    this.openComment = true;

    // set timeout to wait for textarea to open so id can be found
    setTimeout(() => this.setWriteCommentInputHeight(), 5);
  }

  postComment($event: Event): void {
    $event.preventDefault();

    if (this.newComment.indexOf('\n') <= 1) {
      this.newComment = '';
      return;
    }

    this.postService.addComment({ _id: this.post._id, comment: this.newComment.trim() });
    this.newComment = '';

    return;
  }

  getCommentTimeDifference(commentTime: string): string {
    return this.getTimeDifference(new Date(commentTime));
  }

  get amountOfLikes(): number {
    return this.post.Likes.length;
  }

  setWriteCommentInputHeight() {
    const writeCommentInput = document.getElementById('writeComment' + this.post._id);

    if (!writeCommentInput) return;

    writeCommentInput.setAttribute(
      'style',
      'height:' + (writeCommentInput.scrollHeight - 25) + 'px;overflow-y:hidden; resize: none;'
    );
    writeCommentInput.addEventListener(
      'input',
      () => {
        writeCommentInput.style.height = 'auto';
        writeCommentInput.style.height = writeCommentInput.scrollHeight - 20 + 'px';
      },
      false
    );
  }

  private getTimeDifference(date: Date): string {
    const now = new Date();

    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) return diffInSeconds.toFixed(0) + ' s';

    const diffInMinutes = diffInSeconds / 60;

    if (diffInMinutes < 60) return diffInMinutes.toFixed(0) + ' m';

    const diffInHours = diffInMinutes / 60;

    if (diffInHours < 24) return diffInHours.toFixed(0) + ' h';

    const diffInDays = diffInHours / 24;

    if (diffInDays < 30) return diffInDays.toFixed(0) + ' d';

    const diffInMonths = diffInDays / 30;

    if (diffInMonths < 12) return diffInMonths.toFixed(0) + ' months';

    const diffInYears = diffInMonths / 12;

    return diffInYears.toFixed(0) + ' y';
  }

  onInputChange(): void {
    this.newComment = emoticonize(this.newComment, true);
  }
}
