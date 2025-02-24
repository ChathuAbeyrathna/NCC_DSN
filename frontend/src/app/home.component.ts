import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Welcome to Home Page</h1>
    <button (click)="navigateToPost()">Go to Post Page</button>
  `,
})
export class HomeComponent {
  navigateToPost() {
    window.location.href = '/post';
  }
}
