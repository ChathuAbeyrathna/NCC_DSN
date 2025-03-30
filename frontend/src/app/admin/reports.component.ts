import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import * as XLSX from 'xlsx';
import { NavComponent } from './nav.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NavComponent, FormsModule], // Add FormsModule
  template: `
    <div class="container">
      <app-nav></app-nav>

      <div class="header">
        <h2>Reported Issues</h2>
          <div class="filter-container">
            <label class="filter-label">From:</label>
            <input type="date" [(ngModel)]="startDate" class="filter-input" />

            <label class="filter-label">To:</label>
            <input type="date" [(ngModel)]="endDate" class="filter-input" />

            <button (click)="applyFilter()" class="filter-btn">Apply</button>
            <button (click)="removeFilter()" class="clear-btn">Clear</button>
          </div>

          <div>
            <button (click)="downloadReport()" class="download-btn">
              Download Report
            </button>
          </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>User Type</th>
            <th>Institution</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let report of reports">
            <td>{{ report.userType }}</td>
            <td>{{ report.institution }}</td>
            <td>{{ report.email }}</td>
            <td>{{ report.phone }}</td>
            <td>{{ report.title }}</td>
            <td>{{ report.description }}</td>
            <td>
              <a *ngIf="report.imageUrl" (click)="openImageModal(report.imageUrl)" class="image-link">
                View Image
              </a>
              <span *ngIf="!report.imageUrl">No Image</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Image Modal -->
    <div *ngIf="isModalOpen" class="modal" (click)="closeImageModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <span class="close" (click)="closeImageModal()">&times;</span>
        <img [src]="selectedImageUrl" alt="Reported Issue Image" />
      </div>
    </div>
  `,
  styles: [`
    .container {
      margin-top: 60px;
      padding: 50px;
      font-family: Arial, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    h2 {
      font-size: 24px;
      margin: 0;
    }

    .download-btn {
      background-color: #0066CC;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }

    .download-btn:hover {
      background-color: rgb(1, 59, 121);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 40px;
      background: white;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: rgba(0, 102, 204, 0.49);
      color: white;
      padding: 20px 10px;
      text-align: center;
    }

    .image-link {
      color: #0066CC;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }

    .image-link:hover {
      text-decoration: underline;
    }

    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
    }

    .modal-content {
      padding: 20px;
      max-width: 60%; 
      max-height: 60vh; 
      overflow: auto; /* Enables scrolling if content overflows */
      background: white;
      border-radius: 10px;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }

    .close:hover {
      color: black;
    }

    img {
      width: auto;
      height: auto;
    }

    .filter-container {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .filter-label {
      font-size: 14px;
      color: #555;
      font-weight: bold;
    }

    .filter-input {
      padding: 8px;
      font-size: 14px;
      color: gray;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 150px;
    }

    .filter-btn, .clear-btn {
      padding: 8px 12px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .filter-btn {
      background-color: #0066CC;
      color: white;
    }

    .clear-btn {
      background-color: #ff5555;
      color: white;
    }

    .filter-btn:hover {
      background-color: rgb(1, 59, 121);
    }

    .clear-btn:hover {
      background-color: rgb(121, 0, 0);
    }

    /* Responsive Styles */
  @media (max-width: 768px) {
    .container {
        padding: 30px; 
    }

    .header {
        flex-direction: column; 
        align-items: flex-start;
        gap: 10px; 
    }

    h2 {
        font-size: 20px; 
    }

    .download-btn {
        margin-left: 0; 
    }

    table {
        font-size: 14px; 
        overflow-x: auto;
        display: block; 
    }

    th, td {
        padding: 6px; 
    }

    .filter-container {
        flex-direction: column; 
        align-items: flex-start;
        gap: 10px;
    }

    .modal-content {
        width: 90%; 
    }
}

@media (max-width: 480px) {
    .container {
        padding: 20px; 
    }

    h2 {
        font-size: 18px; 
    }

    .download-btn {
        font-size: 12px; 
        padding: 8px 12px; 
    }

    table {
        font-size: 12px; 
        overflow-x: auto;
        display: block; 
    }

    th, td {
        padding: 4px; 
    }

    .modal-content {
        width: 95%; 
        padding: 15px; 
    }
}

  `]
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  postService = inject(PostService);
  isModalOpen = false;
  selectedImageUrl: string | null = null;
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.postService.getReports(this.startDate, this.endDate).subscribe((data: any[]) => {
      this.reports = data.reverse();
      console.log('Reports loaded:', this.reports);
    });
  }

  applyFilter() {
    console.log('Applying filter with startDate:', this.startDate);
    console.log('Applying filter with endDate:', this.endDate);
    this.loadReports();
  }

  removeFilter() {
    this.startDate = '';
    this.endDate = '';
    this.loadReports();
    console.log('Filter removed. Loading all reports.');
  }

  openImageModal(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    this.isModalOpen = true;
  }

  closeImageModal() {
    this.isModalOpen = false;
    this.selectedImageUrl = null;
  }

  downloadReport() {
    const formattedReports = this.reports.map(report => ({
      "User Type": report.userType,
      "Institution": report.institution,
      "Email": report.email,
      "Phone": report.phone,
      "Title": report.title,
      "Description": report.description,
      "Image": report.imageUrl ? "Available" : "No Image"
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedReports);

    // Auto-adjust column width
    ws["!cols"] = [
      { wch: 15 }, // User Type
      { wch: 20 }, // Institution
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Title
      { wch: 40 }, // Description
      { wch: 12 }  // Image
    ];

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reported Issues');
    XLSX.writeFile(wb, 'Reported_Issues.xlsx');
  }
}