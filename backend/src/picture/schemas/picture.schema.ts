import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PictureDocument = Picture & Document;

@Schema()
export class Picture {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [String], default: [] })
  followers: string[];
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
