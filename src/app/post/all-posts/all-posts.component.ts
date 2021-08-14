import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';
import { SocketIoService } from 'src/app/socket-io.service';
import { PostService } from '../post.service';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  subscriptions: Subscription[] = [];
  loading: boolean = false;

  constructor(
    private postService: PostService,
    private socketService: SocketIoService,
    private loadingService: LoadingService
  ) {
    this.postService.getAllPosts();
    this.posts = [];
    this.postService.posts$.subscribe((posts) => (this.posts = posts));

    this.subscriptions.push(this.loadingService.postsIsLoadingSubject.subscribe((loading) => (this.loading = loading)));
  }

  ngOnInit(): void {
    this.socketService.listen('post_create', () => {
      this.postService.getAllPosts();
    });

    this.socketService.listen('comment_create', () => {
      this.postService.getAllPosts();
    });

    this.socketService.listen('like_toggle', () => {
      this.postService.getAllPosts();
    });
  }
}
