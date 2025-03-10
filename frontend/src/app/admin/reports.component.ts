import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import * as XLSX from 'xlsx'; 
import { NavComponent } from './nav.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: `
    <div class="container">

      <app-nav></app-nav>

      <div class="header">
        <h2>Reported Issues</h2>
        <button (click)="downloadReport()" class="download-btn">
          Download Report
        </button>
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
      margin-top: 40px;
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
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    .download-btn:hover {
      background-color: #0056b3;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      background: white;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #007bff;
      color: white;
    }

    .image-link {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }

    .image-link:hover {
      text-decoration: underline;
    }

    /* Modal Styles */
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.9);
    }

    .modal-content {
      margin: 5% auto;
      padding: 20px;
      width: 80%;
      max-width: 700px;
      background: white;
      border-radius: 10px;
      position: relative;
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
  `]
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  postService = inject(PostService);
  isModalOpen = false;
  selectedImageUrl: string | null = null;

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.postService.getReports().subscribe((data: any[]) => {
      // Reverse the array to show the newest reports at the top
      this.reports = data.reverse();
    });
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
    // Use xlsx library to create a properly formatted Excel file
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reports);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reported Issues');
    XLSX.writeFile(wb, 'Reported_Issues.xlsx');
  }
}