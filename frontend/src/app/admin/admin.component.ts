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

        <div class="navbutton-container">
            <button class="nav-button" (click)="navigateToReports()">Reported Problem List</button>
        </div>

        <h2>Support Team</h2>
        <div class="button-container">
            <button class="addmem-btn" (click)="openModal(false)">Add Members</button>
        </div>

        <!-- Full-Screen Modal -->
        <div class="modal-page" *ngIf="showForm">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>{{ isEditing ? 'Edit Member' : 'Add Members' }}</h2>
                    <span class="close-btn" (click)="closeModal()">X</span>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" [(ngModel)]="newName">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" [(ngModel)]="newEmail">
                </div>
                <button class="add-btn" (click)="isEditing ? updateAdmin() : addAdmin()">
                    {{ isEditing ? 'Update' : 'Add' }}
                </button>
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
                        <button class="edit-btn" (click)="openModal(true, admin)">
                            <img src="edit.png" alt="Edit">
                        </button>
                        <button class="remove-btn" (click)="removeAdmin(admin.email)">
                            <img src="remove.png" alt="Remove">
                        </button>
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
    isEditing = false;
    editingEmail = '';

    constructor(private adminService: AdminService, private router: Router) {}

    ngOnInit() {
        this.loadAdmins();
    }

    loadAdmins() {
        this.adminService.getAdmins().subscribe(data => this.admins = data);
    }

    openModal(editing: boolean, admin: any = null) {
        this.isEditing = editing;
        this.showForm = true;

        if (editing && admin) {
            this.newName = admin.name;
            this.newEmail = admin.email;
            this.editingEmail = admin.email;
        } else {
            this.newName = '';
            this.newEmail = '';
            this.editingEmail = '';
        }
    }

    closeModal() {
        this.showForm = false;
        this.isEditing = false;
    }

    addAdmin() {
        if (!this.newName || !this.newEmail) return;
        this.adminService.addAdmin(this.newName, this.newEmail).subscribe(() => {
            this.loadAdmins();
            this.closeModal();
        });
    }

    updateAdmin() {
        if (!this.newName || !this.newEmail || !this.editingEmail) return;
        this.adminService.updateAdmin(this.editingEmail, this.newName, this.newEmail).subscribe(() => {
            this.loadAdmins();
            this.closeModal();
        });
    }

    removeAdmin(email: string) {
        this.adminService.removeAdmin(email).subscribe(() => this.loadAdmins());
    }

    navigateToReports() {
        this.router.navigate(['/reports']);
    }
}
