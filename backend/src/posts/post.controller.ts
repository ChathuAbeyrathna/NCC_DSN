import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() body: { title: string; description: string }) {
        return this.postsService.create(body.title, body.description);
    }

    @Get()
    async findAll() {
        return this.postsService.findAll();
    }
}
