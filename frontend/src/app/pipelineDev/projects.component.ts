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
      <h2>Submitted Projects</h2>
      
      <label>Select Project:</label>
      <select [(ngModel)]="selectedProject" (change)="onProjectSelect()">
        <option *ngFor="let project of projects" [ngValue]="project">{{ project.projectTitle }}</option>
      </select>

      <table *ngIf="selectedProject" class="project-table">
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
    .project-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    }
    .project-table th, .project-table td {
      border: 1px solid #e0e0e0;
      padding: 10px;
      font-size: 15px;
    }
    .project-table th {
      background-color:rgba(0, 102, 204, 0.49);
      color: white;
      text-align: left;
      width: 30%;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/projects').subscribe((data: any) => {
      this.projects = data;
    });
  }

  onProjectSelect() {
    // The selectedProject is already updated via [(ngModel)]
  }
}
