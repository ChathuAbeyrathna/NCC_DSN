import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="logo">NCC - DSN</div>
      <div class="nav-icons">
        <a href="/admin" class="icon"><img src="/home.png" alt="Home"></a>
        <a class="icon"><img src="/profile.png" alt="Profile"></a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 4rem;
      background-color: #1A202C;
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

    .nav-icons {
      display: flex;
      gap: 1.5rem;
    }

    .icon img {
      width: 30px;
      height: 30px;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .navbar {
        padding: 1rem 2rem; 
      }

      .logo {
        font-size: 1.2rem; 
      }

      .nav-icons {
        gap: 1rem; 
      }

      .icon img {
        width: 25px; 
        height: 25px;
      }
    }

    @media (max-width: 480px) {
      .navbar {
        padding: 1rem; 
      }

      .logo {
        font-size: 1rem; 
      }

      .nav-icons {
        gap: 0.75rem; 
      }

      .icon img {
        width: 20px; 
        height: 20px;
      }
    }
  `]
})
export class NavComponent { }