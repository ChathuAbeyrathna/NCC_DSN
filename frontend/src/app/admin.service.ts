import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:3000/admins'; // Backend API URL

    constructor(private http: HttpClient) {}

    // Get all admins
    getAdmins() {
        return this.http.get<{ name: string; email: string }[]>(this.apiUrl);
    }

    // Add a new admin
    addAdmin(name: string, email: string) {
        return this.http.post(`${this.apiUrl}/add`, { name, email });  // Corrected URL
    }

    updateAdmin(email: string, admin: { name: string; newEmail: string }) {
        return this.http.put(`${this.apiUrl}/update/${email}`, admin);
    }       

    // Remove an admin by email
    removeAdmin(email: string) {
        return this.http.delete(`${this.apiUrl}/remove/${email}`);  // Corrected URL with email in the route
    }
}
