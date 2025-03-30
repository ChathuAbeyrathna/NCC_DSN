import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}

    // Add a new admin
    async addAdmin(name: string, email: string) {
        const existingAdmin = await this.adminRepository.findOne({ where: { email } });

        if (existingAdmin) {
            throw new NotFoundException('Admin email already exists');
        }

        const newAdmin = this.adminRepository.create({ name, email });
        await this.adminRepository.save(newAdmin);

        return { message: 'Admin added successfully', admin: newAdmin };
    }

    // Get all admins
    async getAdmins() {
        return this.adminRepository.find({ select: ['name', 'email'] });
    }

    // Remove an admin by email
    async removeAdmin(email: string) {
        const result = await this.adminRepository.delete({ email });

        if (result.affected === 0) {
            throw new NotFoundException('Admin not found');
        }

        return { message: 'Admin removed successfully' };
    }

    // Update admin details
    async updateAdmin(email: string, name: string, newEmail: string) {
        const admin = await this.adminRepository.findOne({ where: { email } });

        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

        admin.name = name;
        admin.email = newEmail;

        await this.adminRepository.save(admin);

        return { message: 'Admin updated successfully', admin };
    }
}
