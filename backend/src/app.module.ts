import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/post.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://chathuabeyrathne2001:8xEE4IF1LilyqZmu@cluster0.ab99p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Replace with your DB 
        PostsModule,
        AdminModule, // Add Admin Module here
    ],
})
export class AppModule {}
