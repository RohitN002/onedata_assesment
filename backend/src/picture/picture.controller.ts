import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PictureService } from './picture.sevice';
import { CreatePictureDto } from './dto/picture.dto';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.create(createPictureDto);
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.pictureService.likePicture(id);
  }

  @Post(':id/follow')
  follow(@Param('id') id: string, @Body('userId') userId: string) {
    return this.pictureService.followPicture(id, userId);
  }

  @Post(':id/unfollow')
  unfollow(@Param('id') id: string, @Body('userId') userId: string) {
    return this.pictureService.unfollowPicture(id, userId);
  }
}
