import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async create(title: string, description: string, userType: string, institution: string, email: string, phone: string, imageUrl: string): Promise<Post> {
        const newPost = new this.postModel({ title, description, userType, institution, email, phone, imageUrl });
        const savedPost = await newPost.save();
        await this.sendEmailNotification(savedPost);
        return savedPost;
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    private async sendEmailNotification(post: Post) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chathurya.abeyrathna@aiesec.net', // Replace with your email
                pass: 'zjwj rocr sbpo hthr', // Replace with your email password or app password
            },
        });

        const mailOptions = {
            from: 'chathurya.abeyrathna@aiesec.net',
            to: ['umalikaabeyrathne@gmail.com', 'mrcdabey@gmail.com', 'abeyrathnamrcd.21@uom.lk'], // Replace with the three recipient emails
            subject: `New Problem Reported: ${post.title}`,
            text: `A new issue has been submitted:\n\nTitle: ${post.title}\nDescription: ${post.description}\nUser Type: ${post.userType}\nInstitution: ${post.institution}\nEmail: ${post.email}\nPhone: ${post.phone}`,
            attachments: [
                {
                    filename: 'problem image.jpg', // Customize the filename
                    path: post.imageUrl, 
                },
            ],
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }
}
