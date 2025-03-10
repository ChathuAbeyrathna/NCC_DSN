import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() body: {userType: string; institution: string; email: string; phone: string;  title: string; description: string; imageUrl: string }) {
        return this.postsService.create(body.userType, body.institution, body.email, body.phone, body.title, body.description, body.imageUrl);
    }

    @Get()
    async findAll() {
        return this.postsService.findAll();
    }
}
