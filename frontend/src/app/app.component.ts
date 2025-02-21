import { Component, inject } from '@angular/core';
import { PostService } from './post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Submit a Post</h2>
    <input [(ngModel)]="title" placeholder="Title" />
    <textarea [(ngModel)]="description" placeholder="Description"></textarea>
    <button (click)="submitPost()">Submit</button>

    <h2>All Posts</h2>
    <ul>
      <li *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
      </li>
    </ul>
  `,
})
export class AppComponent {
  title = '';
  description = '';
  posts: any[] = [];

  postService = inject(PostService);

  constructor() {
    this.loadPosts();
  }

  submitPost() {
    if (!this.title) return;
    this.postService.submitPost({ title: this.title, description: this.description }).subscribe(() => {
      this.title = '';
      this.description = '';
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
  }
}
