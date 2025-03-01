import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo">NCC - DSN</div>
      <!-- Hamburger Menu for Mobile -->
      <div class="hamburger" (click)="toggleMenu()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <!-- Navigation Links -->
      <div class="nav-links" [class.active]="isMenuOpen">
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
      padding: 1.5rem 2rem;
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
      gap: 1.5rem;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .nav-links a:hover {
      color: #0066CC; 
    }

    /* Hamburger Menu */
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .hamburger .line {
      width: 25px;
      height: 3px;
      background-color: white;
      margin: 4px 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    /* Media Queries for Responsiveness */
    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: rgba(24, 32, 44, 0.92);
        flex-direction: column;
        align-items: center;
        gap: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .nav-links.active {
        max-height: 300px; /* Adjust based on content */
      }

      .nav-links a {
        padding: 1rem;
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}