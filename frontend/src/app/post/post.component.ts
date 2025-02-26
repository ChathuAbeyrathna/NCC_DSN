import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { NavbarComponent } from '../navbar.component'; 

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar> 

    <div class="post-container">

      <h2>Report a Problem</h2>

      <div class="form-container">
        <div class="form-group">
          <select [(ngModel)]="userType" class="form-select" [ngClass]="{'selected': userType}">
            <option value="" disabled selected>User Type</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <div class="form-group">
          <select [(ngModel)]="institution" class="form-select" [ngClass]="{'selected': institution}">
            <option value="" disabled selected>Institution</option>
            <option value="institution1">Institution 1</option>
            <option value="institution2">Institution 2</option>
          </select>
        </div>
        <div class="form-group">
          <input [(ngModel)]="email" placeholder="Email" type="email" class="form-input" />
        </div>
        <div class="form-group">
          <input [(ngModel)]="phone" placeholder="Telephone" type="tel" class="form-input" />
        </div>
        <div class="form-group">
          <input [(ngModel)]="title" placeholder="Problem Title" class="form-input" />
        </div>
        <div class="form-group">
          <textarea [(ngModel)]="description" placeholder="Describe the Problem" class="form-textarea"></textarea>
        </div>
        <div class="button-group">
          <button (click)="submitPost()" class="form-button">Submit</button>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  title = '';
  description = '';
  userType = '';
  institution = '';
  email = '';
  phone = '';
  postService = inject(PostService);

  submitPost() {
    if (!this.title || !this.email || !this.phone) {
      alert('Please fill in all required fields');
      return;
    }
  
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    // Phone validation (basic pattern for phone number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
  
    const post = {
      title: this.title,
      description: this.description,
      userType: this.userType,
      institution: this.institution,
      email: this.email,
      phone: this.phone,
    };
    this.postService.submitPost(post).subscribe(() => {
      this.title = '';
      this.description = '';
      this.userType = '';
      this.institution = '';
      this.email = '';
      this.phone = '';
    });
  }

  goHome() {
    window.location.href = '/';
  }
}