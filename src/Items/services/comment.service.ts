import { Injectable } from '@nestjs/common';
import { Comment } from '../interface/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostModel, PostDocument } from '../schemas/post.schema';

@Injectable()
export class CommentService {
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

  async delete(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndRemove(id).exec();

    // Retrieve the related post and update the comment count
    if (deletedComment) {
      const post = await this.postModel.findById(deletedComment.postId).exec();

      if (post && post.comments) {
        post.comments -= 1;
        await post.save();
      }
    }

    return deletedComment;
  }
  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  // Other methods...
}
