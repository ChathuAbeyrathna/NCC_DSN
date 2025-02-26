import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async create(title: string, description: string, userType: string, institution: string, email: string, phone: string): Promise<Post> {
        const newPost = new this.postModel({ title, description, userType, institution, email, phone });
        return newPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }
}
