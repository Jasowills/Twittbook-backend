import { Injectable } from '@nestjs/common';
import { Comment } from '../interface/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostModel, PostDocument } from '../schemas/post.schema';
import { UserDocument, UserModel } from '../schemas/user.schema'; // Import the UserModel

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>, // Inject the UserModel
  ) {}

  async create(comment: Comment, userId: string): Promise<Comment> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const newComment = new this.commentModel(comment);
    newComment.userId = user._id; // Set the userId property
    newComment.user.username = user.username; // Set the userName property
    newComment.user.profilePicture = user.profilePicture; // Set the userProfilePicture property

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
    const comments = await this.commentModel.find({ postId }).exec();
    return comments.map((comment) => ({
      ...comment.toObject(),
      username: comment.user.username,
      userProfilePicture: comment.user.profilePicture,
    }));
  }

  // Other methods...
}
