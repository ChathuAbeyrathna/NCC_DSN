import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { Post } from './post.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post]), AdminModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
