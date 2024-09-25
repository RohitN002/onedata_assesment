import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePictureDto } from './dto/picture.dto';
import { Picture, PictureDocument } from './schemas/picture.schema';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
  ) {}



  async create(createPictureDto: CreatePictureDto): Promise<Picture> {
    const createdPicture = await this.pictureModel.create(createPictureDto); // Ensure you're calling create correctly
    return createdPicture;
  }
  
  async findAll(): Promise<Picture[]> {
    return this.pictureModel.find().exec();
  }

  async likePicture(id: string): Promise<Picture> {
    return this.pictureModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).exec();
  }

  async followPicture(id: string, userId: string): Promise<Picture> {
    return this.pictureModel.findByIdAndUpdate(
      id,
      { $addToSet: { followers: userId } },
      { new: true },
    ).exec();
  }

  async unfollowPicture(id: string, userId: string): Promise<Picture> {
    return this.pictureModel.findByIdAndUpdate(
      id,
      { $pull: { followers: userId } },
      { new: true },
    ).exec();
  }
}
