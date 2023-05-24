import { Injectable } from '@nestjs/common';
import { Post } from '../interface/post.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from '../schemas/comment.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return await newPost.save();
  }

  async delete(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, post: Post): Promise<Post> {
    return await this.postModel
      .findByIdAndUpdate(id, post, { new: true })
      .exec();
  }
}
