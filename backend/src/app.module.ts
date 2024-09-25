import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rohitrandy002:eFf7oq0UqGfWGGdb@cluster0.61bmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
    }),
    PictureModule, // Registering the Picture module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
