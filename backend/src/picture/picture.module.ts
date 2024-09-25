import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureService } from './picture.sevice';
import { PictureController } from './picture.controller';
import { Picture, PictureSchema } from './schemas/picture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
