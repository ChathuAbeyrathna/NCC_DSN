import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    userType: string;

    @Prop({ required: true })
    institution: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
