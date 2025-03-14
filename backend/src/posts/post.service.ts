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
    ) { }

    async create(userType: string, institution: string, email: string, phone: string, title: string, description: string, imageUrl: string): Promise<Post> {
        const newPost = new this.postModel({ userType, institution, email, phone, title, description, imageUrl });
        const savedPost = await newPost.save();
        await this.sendEmailNotification(savedPost);
        return savedPost;
    }

    async findAll(startDate?: Date, endDate?: Date): Promise<Post[]> {
        const query: any = {};
        if (startDate && endDate) {
            if (startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {

                query.createdAt = {
                    $gte: startDate,
                    $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
                };
            } else {

                query.$or = [
                    {
                        createdAt: {
                            $gte: startDate,
                            $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000), // Start date
                        },
                    },
                    {
                        createdAt: {
                            $gte: endDate,
                            $lt: new Date(endDate.getTime() + 24 * 60 * 60 * 1000), // End date
                        },
                    },
                ];
            }
        }
        return this.postModel.find(query).exec();
    }

    private async sendEmailNotification(post: Post) {
        const admins = await this.adminModel.find().select('email -_id');
        const recipientEmails = admins.map(admin => admin.email);

        if (recipientEmails.length === 0) {
            console.log('No member emails found, skipping email notification.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testsender@gmail.com', // Replace with sender email
                pass: 'Password', // Replace with sender email password or app password
            },
        });

        const mailOptions: any = {
            from: 'testsender@gmail.com', // Replace with sender email
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