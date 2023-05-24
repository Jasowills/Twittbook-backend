import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema, LikeModel } from '../schemas/like.schema';
import { PostSchema, PostModel } from '../schemas/post.schema';
import { LikeService } from '../services/like.service';
import { LikeController } from '../controllers/like.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Like', schema: LikeSchema },
      { name: 'Post', schema: PostSchema },
    ]),
  ],
  providers: [LikeService, PostModel],
  controllers: [LikeController],
})
export class LikeModule {}
