import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admins') // Base route for this controller
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    // Add a new admin
    @Post('add') // POST /admins/add
    async addAdmin(@Body() { name, email }: { name: string; email: string }) {
        return this.adminService.addAdmin(name, email);
    }

    // Get all admins
    @Get() // GET /admins
    async getAdmins() {
        return this.adminService.getAdmins();
    }

    // Remove an admin by email
    @Delete('remove/:email') // DELETE /admins/remove/:email
    async removeAdmin(@Param('email') email: string) {
        return this.adminService.removeAdmin(email);
    }
}
