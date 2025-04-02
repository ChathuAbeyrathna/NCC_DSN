import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Projects</h2>
      
      <div class="select-container">
        <div class="custom-select" [class.open]="isDropdownOpen" (clickOutside)="closeDropdown()">
          <div class="select-header" (click)="toggleDropdown()">
            {{ selectedProject ? selectedProject.projectTitle : 'Choose a project...' }}
            <span class="custom-arrow">{{ isDropdownOpen ? '▲' : '▼' }}</span>
          </div>
          <div class="dropdown-options" *ngIf="isDropdownOpen">
            <div 
              *ngFor="let project of projects" 
              class="option" 
              (click)="selectProject(project)"
              [class.selected]="selectedProject === project"
            >
              {{ project.projectTitle }}
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="selectedProject" class="project-details">
        <table class="project-table">
          <tr>
            <th>Project Title</th>
            <td>{{ selectedProject.projectTitle }}</td>
          </tr>
          <tr>
            <th>Project Description</th>
            <td>{{ selectedProject.projectDescription }}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{{ selectedProject.projectLocation }}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{{ selectedProject.projectDuration }}</td>
          </tr>
          <tr>
            <th>Accredited Entity</th>
            <td>{{ selectedProject.accreditedEntity }}</td>
          </tr>
          <tr>
            <th>Implementing Agencies</th>
            <td>{{ selectedProject.implementingAgencies }}</td>
          </tr>
          <tr>
            <th>Sector</th>
            <td>{{ selectedProject.sector }}</td>
          </tr>
          <tr>
            <th>Focus</th>
            <td>{{ selectedProject.focus }}</td>
          </tr>
          <tr>
            <th>GCF Result Areas</th>
            <td>{{ selectedProject.gcfResultAreas }}</td>
          </tr>
          <tr>
            <th>Indicative GCF Financing</th>
            <td>{{ selectedProject.gcfFinancing }}</td>
          </tr>
          <tr>
            <th>Indicative Co-Financing</th>
            <td>{{ selectedProject.coFinancing }}</td>
          </tr>
          <tr>
            <th>Indicative Overall Financing</th>
            <td>{{ selectedProject.overallFinancing }}</td>
          </tr>
          <tr>
            <th>Financing Instruments</th>
            <td>{{ selectedProject.financingInstruments }}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{{ selectedProject.status }}</td>
          </tr>
          <tr>
            <th>Contact Information</th>
            <td>{{ selectedProject.contactInfo }}</td>
          </tr>
          <tr>
            <th>Stage 1 Score</th>
            <td>{{ selectedProject.stage1Score }}</td>
          </tr>
          <tr>
            <th>Stage 2 Score</th>
            <td>{{ selectedProject.stage2Score }}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  
  styles: [`
    .container {
      width: 80%;
      margin: 2rem auto;
      font-family: Arial, sans-serif;
    }
    h2 {
      color: #333;
      font-size: 35px;
      margin-top: 40px;
      margin-bottom: 30px;
    }
    .select-container {
      margin-bottom: 2rem;
    }    
    .custom-select {
      position: relative;
      width: 100%;
      max-width: 600px;
    } 
    .select-header {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #4E50BE;
      border-radius: 6px;
      background-color: #fff;
      color: #333;
      font-size: 16px;
      cursor: pointer;
      overflow: hidden;    
    }
    .custom-arrow {
      position: absolute;
      top: 50%;
      right: 16px;
      color: #4E50BE;
      font-size: 12px;
      transform: translateY(-50%);
    }
    .dropdown-options {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
      border-radius: 0 0 6px 6px;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      margin-top: 4px;
    }
    .option {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }    
    .option:hover {
      background-color: #f5f5f5;
    }
     .option.selected {
      background-color: #e0e0e0;
    }
    .project-details {
      margin-top: 40px;
      overflow-x: auto;
    }   
    .project-table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    }   
    .project-table th, .project-table td {
      border: 1px solid #e0e0e0;
      padding: 12px;
      font-size: 15px;
    }   
    .project-table th {
      background-color: rgba(0, 102, 204, 0.49);
      color: white;
      text-align: left;
      width: 30%;
    }   
    /* Scrollable dropdown for many options */
    select {
      max-height: 200px;
      overflow-y: auto;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        width: 90%;
      }     
      h2 {
        font-size: 24px;
      }   
      .select-header {
        padding: 10px 14px;
        font-size: 14px; 
        width: 100%;
      }
      .option {
        white-space: normal;
        word-wrap: break-word;
      }
      .project-table th,
      .project-table td {
        font-size: 14px;
        padding: 10px;
      }   
      .project-table th {
        width: 35%;
      }
    }
    
    @media (max-width: 480px) {
      .container {
        width: 95%;
      }      
      h2 {
        font-size: 20px;
      }     
      .select-header {
        padding: 8px 12px;
        font-size: 14px;
        width: 90%;
      }
      .option {
        white-space: normal;
        word-wrap: break-word;
      }
      .project-table th,
      .project-table td {
        font-size: 12px;
        padding: 8px;
      }     
      .project-table th {
        width: 40%;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;
  isDropdownOpen: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/projects').subscribe((data: any) => {
      this.projects = data;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectProject(project: any) {
    this.selectedProject = project;
    this.isDropdownOpen = false;
  }
}