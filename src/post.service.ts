import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument, PostModel } from '../schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(post: Post): Promise<Post> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async getPostById(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async updatePostById(id: string, post: Post): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async deletePostById(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }
}
