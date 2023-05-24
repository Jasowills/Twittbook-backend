import { Injectable } from '@nestjs/common';
import { Comment } from '../interface/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostModel, PostDocument } from '../schemas/post.schema';
import { Follow } from '../interface/follow.interface';

@Injectable()
export class CommentService {
  followModel: any;
  userModel: any;
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    const newComment = new this.commentModel(comment);
    const savedComment = await newComment.save();

    // Retrieve the related post and update the comment count
    const post = await this.postModel.findById(comment.postId).exec();

    if (post) {
      post.comments = post.comments ? post.comments + 1 : 1;
      await post.save();
    }

    return savedComment;
  }

  async delete(id: string): Promise<Follow> {
    const deletedFollow = await this.followModel.findByIdAndRemove(id).exec();

    // Retrieve the related user and update the followers count
    if (deletedFollow) {
      const user = await this.userModel
        .findById(deletedFollow.followingId)
        .exec();

      if (user && user.followers) {
        user.followers -= 1;
        await user.save();
      }
    }

    return deletedFollow;
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  // Other methods...
}
