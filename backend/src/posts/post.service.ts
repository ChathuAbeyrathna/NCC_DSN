import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { Admin } from '../admin/admin.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
    ) {}

    async create(userType: string, institution: string, email: string, phone: string,title: string, description: string, imageUrl: string): Promise<Post> {
        const newPost = new this.postModel({ userType, institution, email, phone, title, description, imageUrl });
        const savedPost = await newPost.save();
        await this.sendEmailNotification(savedPost);
        return savedPost;
    }

    async findAll(startDate?: Date, endDate?: Date): Promise<Post[]> {
        const query: any = {};
        if (startDate && endDate) {
            query.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        }
        return this.postModel.find(query).exec();
    }

    private async sendEmailNotification(post: Post) {
        const admins = await this.adminModel.find().select('email -_id');
        const recipientEmails = admins.map(admin => admin.email);

        if (recipientEmails.length === 0) {
            console.log('No admin emails found, skipping email notification.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testsenderemail@gmail.com', // Replace with your email
                pass: 'password', // Replace with your email password or app password
            },
        });

        const mailOptions: any = {
            from: 'testsenderemail@gmail.com',
            to: recipientEmails,
            subject: `New Problem Reported: ${post.title}`,
            text: `A new issue has been submitted:\n\nTitle: ${post.title}\nDescription: ${post.description}\nUser Type: ${post.userType}\nInstitution: ${post.institution}\nEmail: ${post.email}\nPhone: ${post.phone}`,
        };

        if (post.imageUrl) {
            mailOptions.attachments = [
                {
                    filename: 'problem image.jpg', // Customize the filename
                    path: post.imageUrl, 
                },
            ];
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }
}