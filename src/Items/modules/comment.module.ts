import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, CommentModel } from '../schemas/comment.schema';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { PostSchema, PostModel } from '../schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'Post', schema: PostSchema },
    ]),
  ],
  providers: [CommentService, PostModel], // Include PostModel as a provider
  controllers: [CommentController],
})
export class CommentModule {}
