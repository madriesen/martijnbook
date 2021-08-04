import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post/post.interface';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  constructor(private postService: PostService) {
    postService.getAllPosts();
    this.posts = postService.posts;
  }

  ngOnInit(): void {}
}
