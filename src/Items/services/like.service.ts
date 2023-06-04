import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from '../schemas/like.schema';
import { PostDocument } from '../schemas/post.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel('Like') private readonly likeModel: Model<LikeDocument>,
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async likePost(postId: string, userId: string): Promise<Like> {
    const existingLike = await this.likeModel
      .findOne({ postId, userId })
      .exec();

    if (existingLike) {
      // User has already liked the post
      return existingLike;
    }

    const newLike = new this.likeModel({ postId, userId });
    await newLike.save();

    const post = await this.postModel.findById(postId).exec();
    if (post) {
      post.likes += 1;
      await post.save();
    }

    return newLike;
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    const deletedLike = await this.likeModel
      .findOneAndDelete({ postId, userId })
      .exec();

    if (deletedLike) {
      const post = await this.postModel.findById(postId).exec();
      if (post && post.likes > 0) {
        post.likes -= 1;
        await post.save();
      }
    }
  }
}
