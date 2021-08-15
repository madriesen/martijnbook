import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;

    if (request.url === `${environment.api}/post` && request.method === 'GET') this.setPostLoading();
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
          this.loadingService.setPostsLoading(false);
        }
      })
    );
  }

  setPostLoading() {
    this.loadingService.setPostsLoading(true);
  }
}
