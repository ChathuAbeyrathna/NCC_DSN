import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { Post, PostSchema } from './post.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
