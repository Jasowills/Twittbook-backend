import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from '../schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, PostModel],
  exports: [PostService],
})
export class PostModule {}
