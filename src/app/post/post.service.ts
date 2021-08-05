import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../http-client.service';
import { Post } from './post/post.interface';

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
    this.http.get<Post>(`${environment.api}/post/${post_id}/like`).subscribe((returnPost: Post) => {
      const index = this.postsValue.findIndex((post) => post._id == returnPost._id);
      this.postsValue[index] = returnPost;
      this.postsSubject.next(this.postsValue);
    });
  }

  getAllPosts(): void {
    this.http.get<Post[]>(`${environment.api}/post`).subscribe((data: Post[]) => {
      this.postsSubject.next(data);
    });
  }

  createPost(content: string) {
    this.http.post<Post>(`${environment.api}/post`, { content }).subscribe((data: Post) => {
      this.postsSubject.next([...this.postsValue, data]);
    });
  }
}
