import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true, // Ensure standalone is set
  template: `
    <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="logo">NCC - DSN</div>
        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
        </div>
      </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      background-color: rgba(24, 32, 44, 0.92);
      color: white;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
    }

    .nav-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class NavbarComponent { }
