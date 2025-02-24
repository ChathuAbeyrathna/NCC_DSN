import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Submit a Post</h2>
    <input [(ngModel)]="title" placeholder="Title" />
    <textarea [(ngModel)]="description" placeholder="Description"></textarea>
    <button (click)="submitPost()">Submit</button>
    <br />
    <button (click)="goHome()">Go to Home</button>
  `,
})
export class PostComponent {
  title = '';
  description = '';
  postService = inject(PostService);

  submitPost() {
    if (!this.title) return;
    this.postService.submitPost({ title: this.title, description: this.description }).subscribe(() => {
      this.title = '';
      this.description = '';
    });
  }

  goHome() {
    window.location.href = '/';
  }
}
