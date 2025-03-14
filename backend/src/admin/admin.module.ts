import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller'; 
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
    ],
    controllers: [AdminController], // Add AdminController to the controllers array
    providers: [AdminService], // Add AdminService to the providers array
    exports: [MongooseModule], // Export MongooseModule so other modules can use AdminModel
})
export class AdminModule { }
