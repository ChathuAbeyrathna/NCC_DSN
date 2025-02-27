import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() body: { title: string; description: string; userType: string; institution: string; email: string; phone: string; imageUrl: string }) {
        return this.postsService.create(body.title, body.description, body.userType, body.institution, body.email, body.phone, body.imageUrl);
    }

    @Get()
    async findAll() {
        return this.postsService.findAll();
    }
}
