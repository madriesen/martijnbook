import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  createAuthorizationHeader() {
    const token = localStorage.getItem('authorization');
    if (token) this.headers = this.headers.set('Authorization', token);
  }

  get<T>(url: string): Observable<T> {
    this.createAuthorizationHeader();
    return this.http.get<T>(environment.api + url, { headers: this.headers });
  }

  post<T>(url: string, data: Record<string, any>): Observable<T> {
    this.createAuthorizationHeader();
    return this.http.post<T>(environment.api + url, data, { headers: this.headers });
  }

  put<T>(url: string, data: Record<string, any>): Observable<T> {
    this.createAuthorizationHeader();
    return this.http.put<T>(environment.api + url, data, { headers: this.headers });
  }
}
