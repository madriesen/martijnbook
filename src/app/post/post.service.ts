import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Post } from './interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject: BehaviorSubject<Post[]>;
  public posts$: Observable<Post[]>;

  constructor(private http: HttpClientService) {
    this.postsSubject = new BehaviorSubject([] as Post[]);
    this.posts$ = this.postsSubject.asObservable();
  }

  get postsValue() {
    return this.postsSubject.value;
  }

  toggleLike(post_id: string) {
    this.http.get<Post>(`/post/${post_id}/like`).subscribe((returnPost: Post) => {
      const index = this.postsValue.findIndex((post) => post._id == returnPost._id);
      this.postsValue[index] = returnPost;
      this.postsSubject.next(this.postsValue);
    });
  }

  getAllPosts(): void {
    this.http.get<Post[]>(`/post`).subscribe((data: Post[]) => {
      this.postsSubject.next(data);
    });
  }

  getOnePost(post_id: string): void {
    this.http.get<Post>(`/post/${post_id}`).subscribe((returnPost: Post) => {
      const index = this.postsValue.findIndex((post) => post._id == returnPost._id);
      if (index == -1) this.postsValue.unshift(returnPost);
      else this.postsValue[index] = returnPost;
      this.postsSubject.next(this.postsValue);
    });
  }

  createPost(content: string) {
    this.http.post<Post>(`/post`, { Content: content }).subscribe();
  }

  addComment(data: { _id: string; comment: string }) {
    this.http.post<Post>(`/post/${data._id}/comment`, { Content: data.comment }).subscribe((returnPost: Post) => {
      const index = this.postsValue.findIndex((post) => post._id == returnPost._id);
      this.postsValue[index] = returnPost;

      this.postsSubject.next(this.postsValue);
    });
  }
}
