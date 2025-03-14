import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {

    @Prop({ required: true })
    userType: string;

    @Prop({ required: true })
    institution: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    imageUrl: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);