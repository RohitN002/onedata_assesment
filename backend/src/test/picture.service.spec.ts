import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PictureService } from '../picture/picture.sevice';
import { Picture, PictureDocument } from '../picture/schemas/picture.schema';
import { CreatePictureDto } from '../picture/dto/picture.dto';

describe('PictureService', () => {
  let service: PictureService;
  let model: Model<PictureDocument>;

  const mockPicture = {
    _id: '1',
    imageUrl: 'http://example.com/image.jpg',
    tags: ['nature', 'sunset'],
    likes: 0,
    followers: [],
  };

  const createPictureDto: CreatePictureDto = {
    imageUrl: 'http://example.com/image.jpg',
    tags: ['nature', 'sunset'],
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        {
          provide: getModelToken('Picture'),
          useValue: {
            create: jest.fn().mockImplementation((dto) => {
              return { ...dto, _id: '1', followers: [], likes: 0 }; // Simulate creation
            }),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockPicture]),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockPicture),
            }),
            // Note: save might not be necessary if you're using create
            save: jest.fn().mockResolvedValue(mockPicture),
          },
        },
      ],
    }).compile();
  
    service = module.get<PictureService>(PictureService);
    model = module.get<Model<PictureDocument>>(getModelToken('Picture'));
  });
  

  describe('create', () => {
    it('should create a picture', async () => {
      const result = await service.create(createPictureDto);
      expect(result).toEqual(mockPicture);
      expect(model.create).toHaveBeenCalledWith(createPictureDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of pictures', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockPicture]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('likePicture', () => {
    it('should increment likes for a picture', async () => {
      const result = await service.likePicture('1');
      expect(result).toEqual(mockPicture);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $inc: { likes: 1 } },
        { new: true }
      );
    });
  });

  describe('followPicture', () => {
    it('should add a user to the followers of a picture', async () => {
      const result = await service.followPicture('1', 'userId');
      expect(result).toEqual(mockPicture);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $addToSet: { followers: 'userId' } },
        { new: true }
      );
    });
  });

  describe('unfollowPicture', () => {
    it('should remove a user from the followers of a picture', async () => {
      const result = await service.unfollowPicture('1', 'userId');
      expect(result).toEqual(mockPicture);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $pull: { followers: 'userId' } },
        { new: true }
      );
    });
  });
});
