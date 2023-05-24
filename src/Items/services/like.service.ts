import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument, LikeModel } from '../schemas/like.schema';
import { PostModel, PostDocument } from '../schemas/post.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel('Like') private readonly likeModel: Model<LikeDocument>,
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async create(like: Like): Promise<Like> {
    const newLike = new this.likeModel(like);
    await newLike.save();

    // Retrieve the related post and update the likes count
    const post = await this.postModel.findById(like.postId).exec();

    if (post) {
      post.likes = post.likes ? post.likes + 1 : 1;
      await post.save();
    }

    return newLike;
  }

  async delete(id: string): Promise<Like> {
    const deletedLike = await LikeModel.findByIdAndRemove(id).exec();

    // Retrieve the related post and update the likes count
    if (deletedLike) {
      const post = await this.postModel.findById(deletedLike.postId).exec();

      if (post && post.likes > 0) {
        post.likes -= 1;
        await post.save();
      }
    }

    return deletedLike;
  }

  // Other methods...
}
