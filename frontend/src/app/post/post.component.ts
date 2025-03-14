import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { NavbarComponent } from '../navbar.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { environment } from '../../environment';

initializeApp(environment.firebase);

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
            <option value="User Type 1">User Type 1</option>
            <option value="User Type 2">User Type 2</option>
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
        <div class="file-upload-container">
          <!-- File Input with Custom Placeholder -->
          <label for="file-upload" class="file-upload-label">
            <!-- Image Icon -->
            <div class="image-icon">
              <img src="upload.png" alt="Upload Icon" />
            </div>
            <span class="placeholder-text">
              {{ imageFile ? imageFile.name : 'Upload Screenshot for Visual Evidence (Optional)' }}
            </span>
            <input type="file" id="file-upload" class="file-upload-input" (change)="handleFileInput($event)" />
          </label>
        </div>
        <div class="button-group">
          <button (click)="submitPost()" [disabled]="loading" class="form-button">
            {{ loading ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
        <div *ngIf="successMessage" class="success-message">
          <div class="success-icon">
            <img src="checkmark.png" alt="Success Icon" />
          </div>
          <div class="success-text">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  userType = '';
  institution = '';
  email = '';
  phone = '';
  title = '';
  description = '';
  imageFile: File | null = null;
  loading = false;
  successMessage = '';
  postService = inject(PostService);

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (file.size > maxSize) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return;
      }

      this.imageFile = file;
    }
  }


  async submitPost() {
    if (!this.title || !this.email || !this.phone || !this.description || !this.userType || !this.institution) {
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

    this.loading = true;

    let imageUrl = '';
    if (this.imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `ncc-dsn/${this.imageFile.name}`); //change firebase store folder name
      const snapshot = await uploadBytes(storageRef, this.imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const post = {
      userType: this.userType,
      institution: this.institution,
      email: this.email,
      phone: this.phone,
      title: this.title,
      description: this.description,
      imageUrl: imageUrl
    };
    this.postService.submitPost(post).subscribe(() => {
      this.userType = '';
      this.institution = '';
      this.email = '';
      this.phone = '';
      this.title = '';
      this.description = '';
      this.imageFile = null;
      this.loading = false;
      this.successMessage = 'Thank you! Your issue has been reported successfully. Our team will review it soon.';
    });
  }

  goHome() {
    window.location.href = '/';
  }
}