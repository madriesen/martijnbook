import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  postsIsLoadingSubject: BehaviorSubject<boolean>;
  postsIsLoading$: Observable<boolean>;

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.postsIsLoadingSubject = new BehaviorSubject<boolean>(false);
    this.postsIsLoading$ = this.postsIsLoadingSubject.asObservable();
  }

  setLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  setPostsLoading(isLoading: boolean) {
    this.postsIsLoadingSubject.next(isLoading);
  }
}
