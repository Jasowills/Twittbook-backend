import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from '../services/comment.service';
import { CommentModel, CommentSchema } from '../schemas/comment.schema';
import { PostModel, PostSchema } from '../schemas/post.schema';
import { UserModel, UserSchema } from '../schemas/user.schema'; // Import UserModel

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema }, // Include UserModel in MongooseModule.forFeature
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, CommentService, CommentModel, PostModel, UserModel], // Include UserModel in providers
})
export class PostModule {}
