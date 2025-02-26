import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from './navbar.component'; 

@Component({
  selector: 'app-manual-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent], 
  template: `
    <app-navbar></app-navbar> 

    <div class="manual-container">
      <h1 class="main-title">User Manuals</h1>
      <p class="description">Download the user manuals for guidelines on using the system.</p>

      <div class="box-container">
        <div class="manual-box">
          <h2 class="box-heading">User Manual for Management Institutions</h2>
          <p class="box-subheading">Climate Change Secretariat, <br> Ministry of Environment</p>
          <button class="view-button" (click)="viewPDF('manual1.pdf')">Download</button>
        </div>

        <div class="manual-box">
          <h2 class="box-heading">User Manual for Data Providers</h2>
          <p class="box-subheading">Stakeholders</p>
          <button class="view-button" (click)="viewPDF('manual2.pdf')">Download</button>
        </div>
      </div>
    </div>
  `,

  styles: [`
    * {
    font-family: 'Arial', sans-serif; /* Change to your preferred font */
    }  

    .manual-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
    }

    .main-title {
      font-size: 30px;
      color: #333;
      margin-bottom: 50px;
      margin-top: 60px;
    }

    .description {
      font-size: 23px;
      color: #666;
    }

    .box-container {
      display: flex;
      justify-content: space-between;
      gap: 60px; /* Space between the two boxes */
      margin-top: 60px;
    }

    .manual-box {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased shadow */
      text-align: center;
      flex: 1; /* Makes both boxes equal width */
      background-color: #F3F0F0;
      display: flex;
      flex-direction: column;
    }

    .box-heading {
      font-size: 20px;
      color: #333;
      margin-bottom: 10px;
      margin-top: 20px;
    }

    .box-subheading {
      font-size: 18px;
      color: #666;
      margin-bottom: 50px;
      line-height: 1.5;
    }

    .view-button {
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #0066CC;
      border: none;
      border-radius: 18px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 150px;
      align-self: center; /* Aligns button to the left */
      margin-top: auto; /* Pushes button to the bottom */
      margin-bottom: 20px;
    }

    .view-button:hover {
      background-color:rgb(5, 51, 96);
    }

  `]
})
export class ManualPageComponent {
  viewPDF(pdfPath: string) {
    window.open(pdfPath, '_blank'); // Opens PDF in a new tab
  }
}