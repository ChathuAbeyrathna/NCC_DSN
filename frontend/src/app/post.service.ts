import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  title: string;
  description: string;
  userType: string;
  institution: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  submitPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
