import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <div class="container">
      <app-navbar></app-navbar> 

      <!-- Background Image with Text Overlay -->
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-text">
          National Climate Change Data Sharing <br> Network Sri Lanka - NCC DSN <br>
          <!-- Scroll Down Button -->
          <button class="scroll-down-button" (click)="scrollDown()">
            <span class="arrow-down"></span>
          </button>
        </div>
      </div>

      <!-- Boxes Section -->
      <div class="box-container">
        <div class="box">
          <h2 class="box-title">User Manuals</h2>
          <p class="box-description">Explore our user manuals. These guides help ensure a smooth experience <br> while managing climate change data.</p>
          <button class="box-button" (click)="navigateToManual()">View</button>
        </div>
        <div class="box">
          <h2 class="box-title">Report a Problem</h2>
          <p class="box-description">Facing a problem while using the website? Click below to report it, and our <br> team will review your concern to improve your experience!</p>
          <button class="box-button" (click)="navigateToPost()">Report</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* General Styles */
    .container {
      font-family: Arial, sans-serif;
      max-width: 100vw;
      overflow: hidden;
    }

    /* Hero Section */
    .hero-section {
      background-image: url('../assets/homeBg.png'); /* Path to your local image */
      background-position: center;
      background-size: cover;
      height: 650px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      width: 100%;
      padding: 1rem 2rem;
      position: fix /* Changed from absolute to fixed to keep the navbar at the top */
      width: 100%;
      
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    }

    .hero-text {
      font-size: 3rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      position: relative;
      z-index: 1; /* Ensure text is above the overlay */
      line-height: 2;
      margin-top: 70px;
    }

    /* Boxes Section */
    .box-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding: 2rem;
      justify-content: center; /* Centers the boxes horizontally */
      align-items: center;
      margin-top: 40px;
      margin-bottom: 40px
    }

    .box {
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      background-color: #F3F0F0; /* The light color for the boxes */
      width: 1100px; /* Adjusts the width of the boxes */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased shadow */
    }

    .box-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .box-description {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .box-button {
      background-color: #18202C;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 15px;
      cursor: pointer;
      font-size: 1rem;
      width: 150px;
      margin-left: auto;
    }

    .box-button:hover {
      background-color:rgb(44, 58, 80);
    }

    /* Scroll Down Button */
    .scroll-down-button {
      background: transparent;
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }

    .arrow-down {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 2px solid white;
      border-radius: 50%;
      position: relative;
      animation: bounce 2s infinite;
    }

    .arrow-down::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 8px;
      height: 8px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  `]
})
export class HomeComponent {
  navigateToPost() {
    window.location.href = '/post';
  }

  navigateToManual() {
    window.location.href = '/manual';
  }

  scrollDown() {
    window.scrollBy({
      top: window.innerHeight, // Scroll down by the height of the viewport
      behavior: 'smooth' // Smooth scroll
    });
  }
}