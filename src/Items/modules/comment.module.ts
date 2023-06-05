import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from '../schemas/comment.schema';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { PostSchema } from '../schemas/post.schema';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
