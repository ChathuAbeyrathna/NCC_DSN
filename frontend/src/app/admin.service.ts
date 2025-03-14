import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:3000/admins';

    constructor(private http: HttpClient) { }

    // Get all members
    getAdmins() {
        return this.http.get<{ name: string; email: string }[]>(this.apiUrl);
    }

    // Add a new member
    addAdmin(name: string, email: string) {
        return this.http.post(`${this.apiUrl}/add`, { name, email });
    }

    updateAdmin(email: string, admin: { name: string; newEmail: string }) {
        return this.http.put(`${this.apiUrl}/update/${email}`, admin);
    }

    // Remove an member by email
    removeAdmin(email: string) {
        return this.http.delete(`${this.apiUrl}/remove/${email}`);
    }
}
