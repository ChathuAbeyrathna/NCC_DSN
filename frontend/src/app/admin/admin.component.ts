import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { NavComponent } from './nav.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, NavComponent],
    template: `
    <div class="admin-container">
        <app-nav></app-nav>
        
        <h2>Reported Problems</h2>

        <div class="button-container">
        <button class="nav-button" (click)="navigateToReports()">Reported Problem List</button>
        </div>

        <h2>Support Team</h2>
        <button (click)="toggleForm()">Add Members</button>

        <!-- Full-Screen Modal -->
        <div class="modal-page" *ngIf="showForm">
            <div class="modal-container">
                <h2>Add New Admin</h2>
                <input type="text" [(ngModel)]="newName" placeholder="Admin Name">
                <input type="email" [(ngModel)]="newEmail" placeholder="Admin Email">
                <div class="btn-group">
                    <button (click)="addAdmin()">Submit</button>
                    <button class="close-btn" (click)="toggleForm()">Close</button>
                </div>
            </div>
        </div>

        <div class="support">
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let admin of admins">
                    <td>{{ admin.name }}</td>
                    <td>{{ admin.email }}</td>
                    <td>
                        <button (click)="removeAdmin(admin.email)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>

        </div>

    </div>
    `,
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    admins: { name: string; email: string }[] = [];
    newName = '';
    newEmail = '';
    showForm = false;

    constructor(private adminService: AdminService, private router: Router) {}

    ngOnInit() {
        this.loadAdmins();
    }

    loadAdmins() {
        this.adminService.getAdmins().subscribe(data => this.admins = data);
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    addAdmin() {
        if (!this.newName || !this.newEmail) return;
        this.adminService.addAdmin(this.newName, this.newEmail).subscribe(() => {
            this.loadAdmins();
            this.newName = '';
            this.newEmail = '';
            this.showForm = false;
        });
    }

    removeAdmin(email: string) {
        this.adminService.removeAdmin(email).subscribe(() => this.loadAdmins());
    }

    navigateToReports() {
        this.router.navigate(['/reports']);
    }
}