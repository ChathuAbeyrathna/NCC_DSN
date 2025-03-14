import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) { }

    // Add a new admin
    async addAdmin(name: string, email: string) {
        const existingAdmin = await this.adminModel.findOne({ email });
        if (existingAdmin) {
            throw new NotFoundException('Member email already exists');
        }

        const newAdmin = await this.adminModel.create({ name, email });
        return { message: 'Member added successfully', admin: newAdmin };
    }

    // Get all admins
    async getAdmins() {
        return this.adminModel.find().select('name email -_id');
    }

    // Remove an admin by email
    async removeAdmin(email: string) {
        const result = await this.adminModel.deleteOne({ email });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Member not found');
        }
        return { message: 'Member removed successfully' };
    }

    // Update admin details
    async updateAdmin(email: string, name: string, newEmail: string) {
        const admin = await this.adminModel.findOne({ email });

        if (!admin) {
            throw new NotFoundException('Member not found');
        }

        admin.name = name;
        admin.email = newEmail;
        await admin.save();

        return { message: 'Member updated successfully', admin };
    }
}
