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
      background-color: #0066CC;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    .download-btn:hover {
      background-color:rgb(1, 59, 121);
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
      background-color:rgba(0, 102, 204, 0.49);
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
  
    // Apply styles to headers
    const headerRange = XLSX.utils.decode_range(ws["!ref"]!);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellRef]) continue;
      ws[cellRef].s = { font: { bold: true }, fill: { fgColor: { rgb: "DCE6F1" } } };
    }
  
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