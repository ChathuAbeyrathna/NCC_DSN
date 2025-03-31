import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/post.module';
import { AdminModule } from './admin/admin.module';
import { ProjectsModule } from './pipelineDev/project.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost', 
            port: 3306, 
            username: 'root', 
            password: 'Chathu9775*', // change password
            database: 'ncc-dsn', // change database name
            entities: [__dirname + '/**/*.entity.{ts,js}'], 
            synchronize: true, 
        }),
        PostsModule,
        AdminModule,
        ProjectsModule
    ],
})
export class AppModule {}
