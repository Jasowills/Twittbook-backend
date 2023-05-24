import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from '../schemas/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService, PostModel],
})
export class PostModule {}
