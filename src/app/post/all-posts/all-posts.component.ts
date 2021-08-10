import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/socket-io.service';
import { PostService } from '../post.service';
import { Post } from '../post/post.interface';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  constructor(private postService: PostService, private socketService: SocketIoService) {
    this.postService.getAllPosts();
    this.posts = [];
    this.postService.posts$.subscribe((posts) => (this.posts = posts));
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
