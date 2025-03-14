import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async create(@Body() body: { userType: string; institution: string; email: string; phone: string; title: string; description: string; imageUrl: string }) {
        return this.postsService.create(body.userType, body.institution, body.email, body.phone, body.title, body.description, body.imageUrl);
    }

    @Get()
    async findAll(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.postsService.findAll(start, end);
    }
}