import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
    title = '';
    description = '';
    posts: any[] = [];

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.loadPosts();
    }

    submitPost() {
        if (!this.title) return;
        this.postService.submitPost({ title: this.title, description: this.description }).subscribe(() => {
            this.title = '';
            this.description = '';
            this.loadPosts();
        });
    }

    loadPosts() {
        this.postService.getPosts().subscribe((data) => (this.posts = data));
    }
}
