import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { AdminModule } from '../admin/admin.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), AdminModule,],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
