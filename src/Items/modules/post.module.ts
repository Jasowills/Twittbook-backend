import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from '../services/comment.service';
import { CommentModel, CommentSchema } from '../schemas/comment.schema'; // Import CommentModel
import { PostModel, PostSchema } from '../schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema }, // Include CommentModel in MongooseModule.forFeature
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, CommentService, CommentModel, PostModel], // Include CommentModel in providers
})
export class PostModule {}
