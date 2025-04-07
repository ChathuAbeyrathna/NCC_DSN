import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
    <div class="sidebar">
      <div class="logo">NCC-DSN</div>
      <ul>
        <li>Home</li>
        <li>Institutions</li>
        <li>Users</li>
        <li>Parameters</li>
        <li>Projects</li>
        <li>Policies</li>
        <li>Accept and publish data and information</li>
        <li>View published data and information</li>
        <li>Audit</li>
        <li>Master Data</li>

        <!-- Dropdown Group -->
        <li class="active-group">
          <span (click)="toggleDropdown()" class="dropdown-title">
            Pipeline Dev 
            <span [ngClass]="{'rotate': dropdownOpen}">▾</span>
          </span>
          <ul *ngIf="dropdownOpen">
            <li 
              routerLink="/pipeline"
              routerLinkActive="active-bg"
              class="active-link"
            >
              Pipeline Dev Plan
            </li>
            <li 
              routerLink="/projects"
              routerLinkActive="active-bg"
              class="active-link"
            >
              Pipeline Dev Projects
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
    styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 200px;
      height: 100vh;
      background-color: #0c1c34;
      color: white;
      padding: 20px;
      font-family: sans-serif;
      overflow-y: auto;
    }
    .logo {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    ul {
      list-style: none;
      padding-left: 0;
      margin-bottom: 20px;
    }
    li {
      margin: 12px 0;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .active-group > ul {
      margin-left: 15px;
    }
    .dropdown-title {
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }
    .rotate {
      display: inline-block;
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    }
    .active-link {
      color: white;
      padding: 6px;
    }
    .active-bg {
      background-color: #1a2d4d;
      border-radius: 4px;
    }
    .logout {
      position: absolute;
      bottom: 20px;
      left: 20px;
      cursor: pointer;
      color: lightgray;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        text-align: center;
        position: relative;
        height: auto;
      }
    }
  `]
})
export class SidebarComponent {
    dropdownOpen = true; // keep it open by default if you like

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }
}
