import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Admin } from '../admin/admin.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) { }

    async create(userType: string, institution: string, email: string, phone: string, title: string, description: string, imageUrl: string): Promise<Post> {
        const newPost = this.postRepository.create({ userType, institution, email, phone, title, description, imageUrl });
        const savedPost = await this.postRepository.save(newPost);
        await this.sendEmailNotification(savedPost);
        return savedPost;
    }

    async findAll(startDate?: Date, endDate?: Date): Promise<Post[]> {
        let query = this.postRepository.createQueryBuilder('post');

        if (startDate && endDate) {
            query = query.where('post.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });
        }

        return query.getMany();
    }

    private async sendEmailNotification(post: Post) {
        const admins = await this.adminRepository.find({ select: ['email'] });
        const recipientEmails = admins.map(admin => admin.email);

        if (recipientEmails.length === 0) {
            console.log('No admin emails found, skipping email notification.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sender@gmail.com', // Replace with sender email
                pass: 'password', // Replace with sender email password or app password
            },
        });

        const mailOptions: any = {
            from: 'sender@gmail.com',
            to: recipientEmails,
            subject: `New Problem Reported: ${post.title}`,
            text: `A new issue has been submitted:\n\nTitle: ${post.title}\nDescription: ${post.description}\nUser Type: ${post.userType}\nInstitution: ${post.institution}\nEmail: ${post.email}\nPhone: ${post.phone}`,
        };

        if (post.imageUrl) {
            mailOptions.attachments = [{ filename: 'problem image.jpg', path: post.imageUrl }];
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }
}
