import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/post.module';

@Module({
    imports: [
    MongooseModule.forRoot('mongodb+srv://chathuabeyrathne2001:8xEE4IF1LilyqZmu@cluster0.ab99p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Replace 'mydatabase' with your DB name
    PostsModule,
  ],
})
export class AppModule {}
