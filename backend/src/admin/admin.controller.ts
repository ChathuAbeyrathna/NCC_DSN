import { Controller, Post, Get, Delete, Put, Body, Param, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    // Add a new member
    @Post('add')
    async addAdmin(@Body() { name, email }: { name: string; email: string }) {
        return this.adminService.addAdmin(name, email);
    }

    // Get all members
    @Get()
    async getAdmins() {
        return this.adminService.getAdmins();
    }

    // Remove an member by email
    @Delete('remove/:email')
    async removeAdmin(@Param('email') email: string) {
        return this.adminService.removeAdmin(email);
    }

    // Update member details
    @Put('update/:email')
    async updateAdmin(
        @Param('email') email: string,
        @Body() { name, newEmail }: { name: string; newEmail: string }
    ) {
        return this.adminService.updateAdmin(email, name, newEmail);
    }
}
